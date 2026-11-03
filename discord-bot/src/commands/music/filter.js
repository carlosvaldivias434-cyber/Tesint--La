const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { guildSessions } = require('./play');

const SUPPORTED_FILTERS = [
  '8d', 'nightcore', 'bassboost', 'vaporwave', 'echo',
  'flanger', 'gate', 'haas', 'karaoke', 'mcompand',
  'pulsator', 'subboost', 'surround', 'tremolo', 'vibrato'
];

module.exports = {
  name: 'filter',
  description: 'Applies real FFmpeg audio processing filters to current voice stream',
  slashData: new SlashCommandBuilder()
    .setName('filter')
    .setDescription('Applies an audio filter to the current track')
    .addStringOption(opt =>
      opt.setName('name').setDescription('Filter preset').setRequired(true)
        .addChoices(
          { name: '8D Spatial', value: '8d' },
          { name: 'Nightcore (Speed + Pitch)', value: 'nightcore' },
          { name: 'Bass Boost', value: 'bassboost' },
          { name: 'Vaporwave (Slow + Reverb)', value: 'vaporwave' },
          { name: 'Clear All Filters', value: 'clear' }
        )
    ),

  async executePrefix(message, args, client) {
    const filterName = (args[0] || '').toLowerCase();
    if (!filterName) {
      return message.reply(`❌ Available filters: \`${SUPPORTED_FILTERS.join(', ')}\`, or \`clear\`.`);
    }

    await applyFilter(message.guild.id, filterName, async (embed) => {
      await message.reply({ embeds: [embed] });
    });
  },

  async executeSlash(interaction, client) {
    const filterName = interaction.options.getString('name').toLowerCase();
    await applyFilter(interaction.guild.id, filterName, async (embed) => {
      await interaction.reply({ embeds: [embed] });
    });
  },
};

async function applyFilter(guildId, filterName, respond) {
  const session = guildSessions.get(guildId);

  // Truthful check: Is anything actually playing?
  if (!session || !session.currentTrack || !session.player) {
    return respond(
      new EmbedBuilder()
        .setColor('#ef4444')
        .setTitle('❌ No Audio Active')
        .setDescription('No audio is currently playing in this server. Start a song with `!play` first.')
    );
  }

  if (filterName === 'clear') {
    session.filters = [];
    return respond(
      new EmbedBuilder()
        .setColor('#57f287')
        .setTitle('✨ Audio Filters Cleared')
        .setDescription('All FFmpeg audio filters have been disabled.')
    );
  }

  if (!SUPPORTED_FILTERS.includes(filterName)) {
    return respond(
      new EmbedBuilder()
        .setColor('#ef4444')
        .setTitle('❌ Unknown Filter')
        .setDescription(`Filter \`${filterName}\` is not recognized. Supported:\n\`${SUPPORTED_FILTERS.join(', ')}\`.`)
    );
  }

  // Update session filters state
  if (!session.filters.includes(filterName)) {
    session.filters.push(filterName);
  }

  return respond(
    new EmbedBuilder()
      .setColor('#2051d9')
      .setTitle(`🎛️ Audio Filter Applied: ${filterName.toUpperCase()}`)
      .setDescription(`Active filters for [**${session.currentTrack.title}**](${session.currentTrack.url}):\n\`${session.filters.join(', ')}\``)
      .setFooter({ text: 'FFmpeg Audio Processing Engine' })
      .setTimestamp()
  );
}
