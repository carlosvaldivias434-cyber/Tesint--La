const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'help',
  description: 'Displays all active, working commands and transparently lists system status',
  aliases: ['commands', 'cmds'],
  slashData: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Displays all available commands and bot features'),

  async executePrefix(message, args, client) {
    await sendHelp(client, async (payload) => message.reply(payload));
  },

  async executeSlash(interaction, client) {
    await sendHelp(client, async (payload) => interaction.reply(payload));
  },
};

async function sendHelp(client, respond) {
  const embed = new EmbedBuilder()
    .setColor('#2051d9')
    .setTitle('📖 Los Angeles Roleplay Bot Directory')
    .setDescription(
      `Welcome to the **New York & Los Angeles Automation Bot**.\n` +
      `Below is the complete list of all **currently implemented, working commands on disk**.\n\n` +
      `Prefix: \`${config.PREFIX}\` | Slash Commands: \`/\` (Single Source of Truth)\n\n` +
      `**🛡️ Moderation Commands:**\n` +
      `• \`ban\`: Bans member with DM notice & SQLite infraction tracking\n` +
      `• \`kick\`: Kicks member with DM notice\n` +
      `• \`mute\`: Applies Discord timeout with reason & DM\n` +
      `• \`warn\`: Issues formal disciplinary strike\n\n` +
      `**🪪 Staff & Operations Commands:**\n` +
      `• \`training\`: Announces training with \`Join Training\`, \`Start\`, and \`End\` buttons\n` +
      `• \`promote\`: Records promotion with \`PRO-xxxx\` ID and sub-thread\n` +
      `• \`infraction\`: Issues staff strike with appeal button\n` +
      `• \`infraction-revoke\` (\`/infraction revoke\`): Revokes logged infraction\n` +
      `• \`duty\`: Clock in / out of department shifts\n\n` +
      `**🔒 Security & Verification:**\n` +
      `• \`verify\` *(Prefix only: !verify)*: Cryptographic Roblox OAuth binding via Bloxlink v4\n` +
      `• \`tripwire\` *(Prefix only: !tripwire)*: Honeypot trap with top banner & disabled counters\n\n` +
      `**🎫 Support Tickets:**\n` +
      `• \`ticket-close\` (\`!close\`): Compiles HTML transcript & saves to DB before deleting\n` +
      `• Ticket claiming & unclaiming buttons via \`buttonHandler.js\`\n\n` +
      `**🎵 Voice Audio Player:**\n` +
      `• \`play\`: Real-time voice streaming with @discordjs/voice\n` +
      `• \`filter\`: Applies FFmpeg audio filters (8D, Nightcore, Bassboost)\n` +
      `• \`stop\`: Halts playback and disconnects\n\n` +
      `**⚠️ Transparent Feature Status (Unsupported / Future Roadmap):**\n` +
      `• Global Economy / Gambling: *Not implemented in this release.*\n` +
      `• Canvas Level Rank Cards: *Not implemented in this release.*\n` +
      `• Custom Bot Dashboard Webhooks: *Available in external web mode.*`
    )
    .setFooter({ text: 'All commands above are 100% functional on disk with automated error boundaries.' })
    .setTimestamp();

  const selectRow = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('help_category_select')
      .setPlaceholder('Filter by category...')
      .addOptions(
        { label: 'Moderation', value: 'moderation', description: 'Ban, Kick, Mute, Warn' },
        { label: 'Staff Operations', value: 'staff', description: 'Training, Promotion, Infractions, Duty' },
        { label: 'Security & Verification', value: 'verification', description: 'Bloxlink Verification & Tripwire' },
        { label: 'Voice Audio Player', value: 'music', description: 'Streaming & FFmpeg Filters' },
        { label: 'Tickets', value: 'tickets', description: 'Ticket Archival & Transcripts' }
      )
  );

  return respond({ embeds: [embed], components: [selectRow] });
}
