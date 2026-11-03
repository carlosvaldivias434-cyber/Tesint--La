const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { guildSessions } = require('./play');

module.exports = {
  name: 'stop',
  description: 'Stops audio playback and disconnects the bot from voice',
  aliases: ['leave', 'dc'],
  slashData: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops music playback and disconnects the bot'),

  async executePrefix(message, args, client) {
    await stopPlayback(message.guild.id, async (embed) => message.reply({ embeds: [embed] }));
  },

  async executeSlash(interaction, client) {
    await stopPlayback(interaction.guild.id, async (embed) => interaction.reply({ embeds: [embed] }));
  },
};

async function stopPlayback(guildId, respond) {
  const session = guildSessions.get(guildId);
  if (!session) {
    return respond(
      new EmbedBuilder()
        .setColor('#ef4444')
        .setTitle('❌ Not Connected')
        .setDescription('The bot is not connected to a voice channel in this server.')
    );
  }

  if (session.player) {
    session.player.stop();
  }
  if (session.connection) {
    session.connection.destroy();
  }
  guildSessions.delete(guildId);

  return respond(
    new EmbedBuilder()
      .setColor('#57f287')
      .setTitle('⏹️ Playback Stopped')
      .setDescription('Disconnected from the voice channel and cleared queue.')
  );
}
