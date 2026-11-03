const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('../../db');

module.exports = {
  name: 'mute',
  description: 'Times out a member for a specified duration',
  aliases: ['timeout'],
  requiredPermissions: [PermissionFlagsBits.ModerateMembers],
  slashData: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Times out a member')
    .addUserOption(opt => opt.setName('user').setDescription('Target member').setRequired(true))
    .addIntegerOption(opt => opt.setName('minutes').setDescription('Timeout duration in minutes').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for timeout').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async executePrefix(message, args, client) {
    const targetUser = message.mentions.users.first();
    const minutes = parseInt(args[1], 10) || 60;
    const reason = args.slice(2).join(' ') || 'No reason specified';

    if (!targetUser) {
      return message.reply('❌ Usage: `!mute @user <minutes> [reason]`');
    }

    await executeMute(message.guild, message.member, targetUser, minutes, reason, async (embed) => {
      await message.reply({ embeds: [embed] });
    });
  },

  async executeSlash(interaction, client) {
    const targetUser = interaction.options.getUser('user');
    const minutes = interaction.options.getInteger('minutes');
    const reason = interaction.options.getString('reason') || 'No reason specified';

    await executeMute(interaction.guild, interaction.member, targetUser, minutes, reason, async (embed) => {
      await interaction.reply({ embeds: [embed] });
    });
  },
};

async function executeMute(guild, moderator, targetUser, minutes, reason, respond) {
  const member = await guild.members.fetch(targetUser.id).catch(() => null);

  if (!member) {
    return respond(new EmbedBuilder().setColor('#ef4444').setTitle('❌ Member Not Found').setDescription('User not in this server.'));
  }

  if (!member.moderatable) {
    return respond(new EmbedBuilder().setColor('#ef4444').setTitle('❌ Cannot Mute Member').setDescription('Role hierarchy prevents timing out this user.'));
  }

  const durationMs = minutes * 60 * 1000;
  await member.timeout(durationMs, `${reason} | By: ${moderator.user.tag}`);

  try {
    const dmEmbed = new EmbedBuilder()
      .setColor('#f04747')
      .setTitle(`🔇 You have been muted in ${guild.name}`)
      .addFields(
        { name: 'Duration', value: `${minutes} minutes`, inline: true },
        { name: 'Reason', value: reason, inline: true },
        { name: 'Moderator', value: moderator.user.tag, inline: false }
      )
      .setTimestamp();
    await member.send({ embeds: [dmEmbed] });
  } catch (e) {}

  const infId = `INF-${Math.floor(1000 + Math.random() * 9000)}`;
  db.addInfraction(infId, targetUser.id, moderator.id, `Timeout (${minutes}m)`, reason);

  const embed = new EmbedBuilder()
    .setColor('#2051d9')
    .setTitle('🔇 Member Muted')
    .addFields(
      { name: 'Target', value: `<@${targetUser.id}>`, inline: true },
      { name: 'Duration', value: `${minutes} minutes`, inline: true },
      { name: 'Reason', value: reason, inline: false },
      { name: 'Infraction ID', value: `\`${infId}\``, inline: true }
    )
    .setFooter({ text: 'New York & Los Angeles Automation' })
    .setTimestamp();

  return respond(embed);
}
