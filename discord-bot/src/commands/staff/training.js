const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('../../db');
const config = require('../../config');

module.exports = {
  name: 'training',
  description: 'Hosts and announces an official staff training session with interactive attendance',
  requiredRoles: ['MANAGEMENT', 'INTERNAL_AFFAIRS', 'SENIOR_STAFF', 'STAFF'],
  slashData: new SlashCommandBuilder()
    .setName('training')
    .setDescription('Announces a staff training session')
    .addStringOption(opt => opt.setName('notes').setDescription('Session notes (e.g., Only an R/A!)').setRequired(false))
    .addStringOption(opt => opt.setName('game_link').setDescription('Roblox server link').setRequired(false)),

  async executePrefix(message, args, client) {
    const notes = args.join(' ') || 'Only an R/A!';
    await createTrainingNotice(message.channel, message.author, notes, 'https://www.roblox.com', async (payload) => {
      await message.channel.send(payload);
    });
  },

  async executeSlash(interaction, client) {
    const notes = interaction.options.getString('notes') || 'Only an R/A!';
    const gameLink = interaction.options.getString('game_link') || 'https://www.roblox.com';
    await createTrainingNotice(interaction.channel, interaction.user, notes, gameLink, async (payload) => {
      await interaction.reply(payload);
    });
  },
};

async function createTrainingNotice(channel, host, notes, gameLink, respond) {
  const trainingId = `TRN-${Date.now().toString().slice(-4)}`;
  db.saveTraining(trainingId, host.id, 'Scheduled', notes, []);

  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const embed = new EmbedBuilder()
    .setColor('#2051d9')
    .setTitle('🪪 Staff Training')
    .setDescription(
      `Greetings, <@&${config.ROLES.TRAINEE}>! A training session is being hosted. If you're a Trainee wishing to officially join the staff team, now is your chance.\n\n` +
      `> You must complete a training within **7 days** of becoming a Trainee, otherwise it will result in an immediate termination.\n\n` +
      `**How to attend**\n` +
      `1. Press **Join Game** below to load into the server\n` +
      `2. Go to the **Police Team briefing room** and wait for your trainer\n` +
      `3. Make sure you are wearing the **staff uniform**\n\n` +
      `🛡️ **Trainer:** <@${host.id}>\n` +
      `🕒 **Starts:** Just now (${timeString})\n` +
      `📌 **Status:** Scheduled\n` +
      `👥 **Attending (0):** Nobody yet\n` +
      `📁 **Notes:** ${notes}\n\n` +
      `*Press **Join Training** if you will be attending. Press it again to leave.*`
    )
    .setImage(config.BANNERS.TRAINING_BOTTOM || 'https://i.imgur.com/example_bottom_strip.png')
    .setTimestamp();

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`training_join_${trainingId}`)
      .setLabel('Join Training')
      .setStyle(ButtonStyle.Success)
      .setEmoji('✓'),
    new ButtonBuilder()
      .setCustomId(`training_start_${trainingId}`)
      .setLabel('Start Training')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`training_end_${trainingId}`)
      .setLabel('End Training')
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setLabel('Join Game')
      .setStyle(ButtonStyle.Link)
      .setURL(gameLink)
      .setEmoji('🎮')
  );

  return respond({ embeds: [embed], components: [row] });
}
