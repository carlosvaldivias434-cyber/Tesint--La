const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'promote',
  description: 'Promotes a staff member with tracked sequence and sub-thread discussion',
  requiredRoles: ['MANAGEMENT', 'DIRECTIVE', 'FOUNDER'],
  slashData: new SlashCommandBuilder()
    .setName('promote')
    .setDescription('Promotes a staff member')
    .addUserOption(opt => opt.setName('staff').setDescription('Target staff member').setRequired(true))
    .addStringOption(opt => opt.setName('old_rank').setDescription('Previous rank').setRequired(true))
    .addStringOption(opt => opt.setName('new_rank').setDescription('Promoted rank').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('Merit / Grounds for promotion').setRequired(false)),

  async executePrefix(message, args, client) {
    const targetUser = message.mentions.users.first();
    const oldRank = args[1] || 'Staff Member';
    const newRank = args[2] || 'Senior Staff';
    const reason = args.slice(3).join(' ') || 'Exceptional dedication and shift activity';

    if (!targetUser) {
      return message.reply('❌ Usage: `!promote @staff <OldRank> <NewRank> [Reason]`');
    }

    await executePromotion(message.channel, message.author, targetUser, oldRank, newRank, reason, async (payload) => {
      const msg = await message.channel.send(payload);
      await createPromotionThread(msg, targetUser);
    });
  },

  async executeSlash(interaction, client) {
    const targetUser = interaction.options.getUser('staff');
    const oldRank = interaction.options.getString('old_rank');
    const newRank = interaction.options.getString('new_rank');
    const reason = interaction.options.getString('reason') || 'Exceptional dedication and shift activity';

    await executePromotion(interaction.channel, interaction.user, targetUser, oldRank, newRank, reason, async (payload) => {
      const reply = await interaction.reply({ ...payload, fetchReply: true });
      await createPromotionThread(reply, targetUser);
    });
  },
};

async function executePromotion(channel, moderator, targetUser, oldRank, newRank, reason, respond) {
  const promoId = `PRO-${Math.floor(1000 + Math.random() * 9000)}`;

  const embed = new EmbedBuilder()
    .setColor('#2051d9')
    .setTitle('🎖️ Staff Promotion')
    .setImage(config.BANNERS.PROMOTIONS_TOP)
    .setDescription(
      `Congratulations to <@${targetUser.id}> on their well-deserved promotion!\n\n` +
      `**Rank Transition:** \`${oldRank}\` ➔ **\`${newRank}\`**\n` +
      `**Reason:** ${reason}\n\n` +
      `🛡️ **Promoted By:** <@${moderator.id}>\n` +
      `📌 **Tracking ID:** \`${promoId}\``
    )
    .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
    .setFooter({ text: 'Los Angeles Roleplay Staff Operations' })
    .setTimestamp();

  return respond({ embeds: [embed] });
}

async function createPromotionThread(message, targetUser) {
  try {
    const thread = await message.startThread({
      name: `Promotion Review - ${targetUser.username}`,
      autoArchiveDuration: 1440,
      reason: 'Staff promotion congratulations and supervisor review',
    });
    await thread.send(`🎉 Feel free to congratulate <@${targetUser.id}> on their new rank here!`);
  } catch (err) {
    console.warn('Could not create promotion sub-thread:', err.message);
  }
}
