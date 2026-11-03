const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'tripwire',
  description: 'Deploys the tripwire honeypot trap with top banner and counter buttons (prefix only)',
  aliases: ['setup-tripwire'],
  requiredRoles: ['MANAGEMENT', 'INTERNAL_AFFAIRS', 'DIRECTIVE', 'FOUNDER'],
  // No slashData per requirement: strictly with ! prefix

  async executePrefix(message, args, client) {
    const memberCount = message.guild.memberCount || 5937;
    const softbansCount = 19;

    // Embed matching screenshot 5: TOP BANNER ONLY, NO bottom banner!
    const embed = new EmbedBuilder()
      .setColor('#2b2d31')
      .setImage(config.BANNERS.TRIPWIRE_TOP || 'https://i.imgur.com/example_tripwire_top.png')
      .setTitle('⚠️ Tripwire')
      .setDescription(
        `Welcome to 🚨 **${message.guild.name}** tripwire. Here is where we catch malicious bots to keep our community safe. ` +
        `We ask that you **do not chat in this channel** if you are a real user. If you do chat, you will be **softbanned**.\n\n` +
        `*(This security trap operates silently. Any bot messages trigger an instant purge & softban.)*`
      );

    // 2 disabled counter buttons matching screenshot
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('tripwire_softbans')
        .setLabel(`${softbansCount} Softbans`)
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('⚠️')
        .setDisabled(true),
      new ButtonBuilder()
        .setCustomId('tripwire_members')
        .setLabel(`Protecting ${memberCount} members.`)
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('🛡️')
        .setDisabled(true)
    );

    await message.channel.send({ embeds: [embed], components: [row] });
    await message.delete().catch(() => {});
  },
};
