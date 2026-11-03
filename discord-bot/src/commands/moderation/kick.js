const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('../../db');

module.exports = {
  name: 'kick',
  description: 'Kicks a member from the server with DM notification',
  requiredPermissions: [PermissionFlagsBits.KickMembers],
  slashData: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks a member from the server')
    .addUserOption(opt => opt.setName('user').setDescription('Target member').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for kick').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async executePrefix(message, args, client) {
    const targetUser = message.mentions.users.first();
    if (!targetUser) {
      return message.reply('❌ Please specify a user to kick: `!kick @user [reason]`');
    }
    const reason = args.slice(1).join(' ') || 'No reason provided';
    await executeKick(message.guild, message.member, targetUser, reason, async (embed) => {
      await message.reply({ embeds: [embed] });
    });
  },

  async executeSlash(interaction, client) {
    const targetUser = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    await executeKick(interaction.guild, interaction.member, targetUser, reason, async (embed) => {
      await interaction.reply({ embeds: [embed] });
    });
  },
};

async function executeKick(guild, moderator, targetUser, reason, respond) {
  const member = await guild.members.fetch(targetUser.id).catch(() => null);

  if (!member) {
    return respond(new EmbedBuilder().setColor('#ef4444').setTitle('❌ Member Not Found').setDescription('Target user is not in this server.'));
  }

  if (!member.kickable) {
    return respond(new EmbedBuilder().setColor('#ef4444').setTitle('❌ Cannot Kick Member').setDescription('Role hierarchy prevents kicking this user.'));
  }

  try {
    const dmEmbed = new EmbedBuilder()
      .setColor('#faa61a')
      .setTitle(`👢 You have been kicked from ${guild.name}`)
      .addFields(
        { name: 'Reason', value: reason },
        { name: 'Moderator', value: moderator.user.tag }
      )
      .setTimestamp();
    await member.send({ embeds: [dmEmbed] });
  } catch (e) {}

  await member.kick(`${reason} | By: ${moderator.user.tag}`);

  const infId = `INF-${Math.floor(1000 + Math.random() * 9000)}`;
  db.addInfraction(infId, targetUser.id, moderator.id, 'Kick', reason);

  const embed = new EmbedBuilder()
    .setColor('#2051d9')
    .setTitle('👢 Member Kicked')
    .addFields(
      { name: 'Target', value: `<@${targetUser.id}> (\`${targetUser.id}\`)`, inline: true },
      { name: 'Moderator', value: `<@${moderator.id}>`, inline: true },
      { name: 'Reason', value: reason, inline: false },
      { name: 'Infraction ID', value: `\`${infId}\``, inline: true }
    )
    .setFooter({ text: 'New York & Los Angeles Automation' })
    .setTimestamp();

  return respond(embed);
}
