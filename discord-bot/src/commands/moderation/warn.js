const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('../../db');

module.exports = {
  name: 'warn',
  description: 'Issues a formal disciplinary warning to a member',
  requiredPermissions: [PermissionFlagsBits.ModerateMembers],
  slashData: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Issues a formal warning to a member')
    .addUserOption(opt => opt.setName('user').setDescription('Target member').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for warning').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async executePrefix(message, args, client) {
    const targetUser = message.mentions.users.first();
    const reason = args.slice(1).join(' ');

    if (!targetUser || !reason) {
      return message.reply('❌ Usage: `!warn @user <reason>`');
    }

    await executeWarn(message.guild, message.member, targetUser, reason, async (embed) => {
      await message.reply({ embeds: [embed] });
    });
  },

  async executeSlash(interaction, client) {
    const targetUser = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    await executeWarn(interaction.guild, interaction.member, targetUser, reason, async (embed) => {
      await interaction.reply({ embeds: [embed] });
    });
  },
};

async function executeWarn(guild, moderator, targetUser, reason, respond) {
  const infId = `INF-${Math.floor(1000 + Math.random() * 9000)}`;
  db.addInfraction(infId, targetUser.id, moderator.id, 'Warning', reason);

  try {
    const member = await guild.members.fetch(targetUser.id).catch(() => null);
    if (member) {
      const dmEmbed = new EmbedBuilder()
        .setColor('#faa61a')
        .setTitle(`⚠️ You have received a warning in ${guild.name}`)
        .addFields(
          { name: 'Infraction ID', value: `\`${infId}\``, inline: true },
          { name: 'Reason', value: reason, inline: false },
          { name: 'Moderator', value: moderator.user.tag, inline: true }
        )
        .setFooter({ text: 'Los Angeles Roleplay Staff Operations' })
        .setTimestamp();
      await member.send({ embeds: [dmEmbed] });
    }
  } catch (e) {}

  const embed = new EmbedBuilder()
    .setColor('#faa61a')
    .setTitle('⚠️ Disciplinary Warning Issued')
    .addFields(
      { name: 'Target', value: `<@${targetUser.id}>`, inline: true },
      { name: 'Moderator', value: `<@${moderator.id}>`, inline: true },
      { name: 'Infraction ID', value: `\`${infId}\``, inline: true },
      { name: 'Reason', value: reason, inline: false }
    )
    .setFooter({ text: 'New York & Los Angeles Automation' })
    .setTimestamp();

  return respond(embed);
}
