const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, entersState, VoiceConnectionStatus } = require('@discordjs/voice');
const play = require('play-dl');

// Server music sessions: guildId -> { player, connection, currentTrack, filters: [] }
const guildSessions = new Map();

module.exports = {
  name: 'play',
  description: 'Streams audio from YouTube or Soundcloud into your voice channel',
  aliases: ['p'],
  slashData: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Streams audio into your voice channel')
    .addStringOption(opt => opt.setName('query').setDescription('Song name or YouTube URL').setRequired(true)),

  async executePrefix(message, args, client) {
    const query = args.join(' ');
    if (!query) {
      return message.reply('❌ Usage: `!play <song name or URL>`');
    }

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('❌ You must be connected to a voice channel to play music.');
    }

    await executePlay(message.guild, message.channel, message.author, voiceChannel, query, async (msg) => {
      await message.reply(msg);
    });
  },

  async executeSlash(interaction, client) {
    const query = interaction.options.getString('query');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({ content: '❌ You must be connected to a voice channel to play music.', ephemeral: true });
    }

    await interaction.deferReply();
    await executePlay(interaction.guild, interaction.channel, interaction.user, voiceChannel, query, async (msg) => {
      await interaction.editReply(msg);
    });
  },
};

async function executePlay(guild, textChannel, requestedBy, voiceChannel, query, respond) {
  try {
    // 1. Validate voice channel permissions
    const permissions = voiceChannel.permissionsFor(guild.members.me);
    if (!permissions.has('Connect') || !permissions.has('Speak')) {
      return respond({
        embeds: [
          new EmbedBuilder()
            .setColor('#ef4444')
            .setTitle('❌ Missing Permissions')
            .setDescription('The bot lacks `Connect` or `Speak` permissions for your voice channel.')
        ]
      });
    }

    // 2. Search track using play-dl
    const searchResults = await play.search(query, { limit: 1 });
    if (!searchResults || searchResults.length === 0) {
      return respond({
        embeds: [
          new EmbedBuilder()
            .setColor('#ef4444')
            .setTitle('❌ No Results Found')
            .setDescription(`Could not find any playable audio matching: \`${query}\`.`)
        ]
      });
    }

    const track = searchResults[0];

    // 3. Establish Voice Connection
    let session = guildSessions.get(guild.id);
    if (!session || !session.connection) {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
      });

      // Wait up to 10 seconds for connection readiness
      try {
        await entersState(connection, VoiceConnectionStatus.Ready, 10000);
      } catch (connErr) {
        connection.destroy();
        return respond({
          embeds: [
            new EmbedBuilder()
              .setColor('#ef4444')
              .setTitle('💥 Voice Connection Failed')
              .setDescription(`Failed to join voice channel within 10 seconds.\n\`\`\`${connErr.message}\`\`\``)
          ]
        });
      }

      const player = createAudioPlayer();
      connection.subscribe(player);

      session = {
        player,
        connection,
        voiceChannel,
        currentTrack: null,
        filters: [],
      };
      guildSessions.set(guild.id, session);

      player.on(AudioPlayerStatus.Idle, () => {
        session.currentTrack = null;
      });

      player.on('error', (err) => {
        console.error('Audio Player Error:', err);
        session.currentTrack = null;
        textChannel.send(`⚠️ Audio playback error encountered: \`${err.message}\``).catch(() => {});
      });
    }

    // 4. Stream Audio Resource
    const stream = await play.stream(track.url);
    const resource = createAudioResource(stream.stream, {
      inputType: stream.type,
      inlineVolume: true,
    });

    session.player.play(resource);
    session.currentTrack = track;

    // 5. Send verified now-playing confirmation ONLY after playback actually begins
    const embed = new EmbedBuilder()
      .setColor('#57f287')
      .setTitle('🎶 Now Streaming Audio')
      .setDescription(`[**${track.title}**](${track.url})`)
      .setThumbnail(track.thumbnails[0]?.url || null)
      .addFields(
        { name: 'Duration', value: track.durationRaw || 'Live', inline: true },
        { name: 'Requested By', value: `<@${requestedBy.id}>`, inline: true },
        { name: 'Channel', value: `<#${voiceChannel.id}>`, inline: true }
      )
      .setFooter({ text: 'Powered by @discordjs/voice & play-dl' })
      .setTimestamp();

    return respond({ embeds: [embed] });
  } catch (err) {
    console.error('Playback execution failure:', err);
    return respond({
      embeds: [
        new EmbedBuilder()
          .setColor('#ef4444')
          .setTitle('💥 Playback Error')
          .setDescription(`Could not initialize audio stream.\n\`\`\`${err.message}\`\`\``)
      ]
    });
  }
}

module.exports.guildSessions = guildSessions;
