const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('../../db');
const config = require('../../config');

module.exports = {
  name: 'infraction',
  description: 'Issues a formal staff strike or demotion with appeal action button',
  requiredRoles: ['MANAGEMENT', 'INTERNAL_AFFAIRS', 'DIRECTIVE', 'FOUNDER'],
  slashData: new SlashCommandBuilder()
    .setName('issue-infraction')
    .setDescription('Issues a staff infraction')
    .addUserOption(opt => opt.setName('staff').setDescription('Target staff member').setRequired(true))
    .addStringOption(opt =>
      opt.setName('type').setDescription('Infraction type').setRequired(true)
        .addChoices(
          { name: 'Official Strike', value: 'Official Strike' },
          { name: 'Staff Warning', value: 'Warning' },
          { name: 'Suspension', value: 'Suspension' },
          { name: 'Demotion', value: 'Demotion' }
        )
    )
    .addStringOption(opt => opt.setName('reason').setDescription('Grounds for infraction').setRequired(true)),

  async executePrefix(message, args, client) {
    const targetUser = message.mentions.users.first();
    const type = args[1] || 'Warning';
    const reason = args.slice(2).join(' ') || 'Policy violation';

    if (!targetUser) {
      return message.reply('❌ Usage: `!infraction @staff <Type> <Reason>`');
    }

    await executeIssue(message.guild, message.author, targetUser, type, reason, async (payload) => {
      await message.reply(payload);
    });
  },

  async executeSlash(interaction, client) {
    const targetUser = interaction.options.getUser('staff');
    const type = interaction.options.getString('type');
    const reason = interaction.options.getString('reason');

    await executeIssue(interaction.guild, interaction.user, targetUser, type, reason, async (payload) => {
      await interaction.reply(payload);
    });
  },
};

async function executeIssue(guild, moderator, targetUser, type, reason, respond) {
  const infId = `INF-${Math.floor(1000 + Math.random() * 9000)}`;
  db.addInfraction(infId, targetUser.id, moderator.id, type, reason);

  const embed = new EmbedBuilder()
    .setColor('#f04747')
    .setTitle('⚠️ Staff Infraction Issued')
    .setImage(config.BANNERS.INFRACTIONS_TOP)
    .addFields(
      { name: 'Staff Member', value: `<@${targetUser.id}>`, inline: true },
      { name: 'Type', value: `\`${type}\``, inline: true },
      { name: 'Infraction ID', value: `\`${infId}\``, inline: true },
      { name: 'Moderator', value: `<@${moderator.id}>`, inline: true },
      { name: 'Reason', value: reason, inline: false }
    )
    .setFooter({ text: 'Los Angeles Roleplay Staff Accountability' })
    .setTimestamp();

  // Appeal button restricted by buttonHandler to recipient only
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`appeal_infraction_${infId}`)
      .setLabel('Submit Appeal')
      .setStyle(ButtonStyle.Secondary)
      .setEmoji('⚖️')
  );

  return respond({ embeds: [embed], components: [row] });
}
