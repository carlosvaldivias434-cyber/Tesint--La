const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('../../db');

module.exports = {
  name: 'ban',
  description: 'Bans a member from the server with DM notice and audit log',
  requiredPermissions: [PermissionFlagsBits.BanMembers],
  slashData: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a member from the server')
    .addUserOption(opt => opt.setName('user').setDescription('Target member').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for ban').setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async executePrefix(message, args, client) {
    const targetUser = message.mentions.users.first();
    if (!targetUser) {
      return message.reply('❌ Please specify a user to ban: `!ban @user [reason]`');
    }
    const reason = args.slice(1).join(' ') || 'No reason provided';
    await executeBan(message.guild, message.member, targetUser, reason, async (embed) => {
      await message.reply({ embeds: [embed] });
    });
  },

  async executeSlash(interaction, client) {
    const targetUser = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    await executeBan(interaction.guild, interaction.member, targetUser, reason, async (embed) => {
      await interaction.reply({ embeds: [embed] });
    });
  },
};

async function executeBan(guild, moderator, targetUser, reason, respond) {
  const member = await guild.members.fetch(targetUser.id).catch(() => null);

  if (member) {
    if (!member.bannable) {
      const errEmbed = new EmbedBuilder()
        .setColor('#ef4444')
        .setTitle('❌ Cannot Ban Member')
        .setDescription('This member cannot be banned. Ensure the bot role is higher than the target user role.');
      return respond(errEmbed);
    }

    // Attempt DM before ban
    try {
      const dmEmbed = new EmbedBuilder()
        .setColor('#ef4444')
        .setTitle(`🔨 You have been banned from ${guild.name}`)
        .addFields(
          { name: 'Reason', value: reason },
          { name: 'Moderator', value: moderator.user.tag }
        )
        .setTimestamp();
      await member.send({ embeds: [dmEmbed] });
    } catch (e) {}

    await member.ban({ reason: `${reason} | By: ${moderator.user.tag}` });
  } else {
    // Ban by ID even if not in guild
    await guild.bans.create(targetUser.id, { reason: `${reason} | By: ${moderator.user.tag}` });
  }

  // Record infraction in SQLite
  const infId = `INF-${Math.floor(1000 + Math.random() * 9000)}`;
  db.addInfraction(infId, targetUser.id, moderator.id, 'Ban', reason);

  const embed = new EmbedBuilder()
    .setColor('#2051d9')
    .setTitle('🔨 Member Banned')
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
