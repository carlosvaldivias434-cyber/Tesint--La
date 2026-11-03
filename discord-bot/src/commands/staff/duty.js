const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Active shifts map: userId -> { department, clockIn: timestamp }
const activeShifts = new Map();

module.exports = {
  name: 'duty',
  description: 'Clock in or out of active roleplay staff or department shifts',
  slashData: new SlashCommandBuilder()
    .setName('duty')
    .setDescription('Manage active shift duty status')
    .addSubcommand(sub =>
      sub
        .setName('in')
        .setDescription('Clock in to your shift')
        .addStringOption(opt =>
          opt.setName('department').setDescription('Department').setRequired(true)
            .addChoices(
              { name: 'Police Department (LAPD/NYPD)', value: 'Police Department' },
              { name: 'Fire & Rescue (LAFD/FDNY)', value: 'Fire & Rescue' },
              { name: 'Staff Moderation Team', value: 'Staff Moderation' },
              { name: 'Internal Affairs', value: 'Internal Affairs' }
            )
        )
    )
    .addSubcommand(sub => sub.setName('out').setDescription('Clock out from your current shift')),

  async executePrefix(message, args, client) {
    const sub = (args[0] || '').toLowerCase();
    if (sub === 'in') {
      const dept = args.slice(1).join(' ') || 'Staff Moderation';
      await clockIn(message.author, dept, async (embed) => message.reply({ embeds: [embed] }));
    } else if (sub === 'out') {
      await clockOut(message.author, async (embed) => message.reply({ embeds: [embed] }));
    } else {
      message.reply('❌ Usage: `!duty in <Department>` or `!duty out`');
    }
  },

  async executeSlash(interaction, client) {
    const sub = interaction.options.getSubcommand();
    if (sub === 'in') {
      const dept = interaction.options.getString('department');
      await clockIn(interaction.user, dept, async (embed) => interaction.reply({ embeds: [embed] }));
    } else {
      await clockOut(interaction.user, async (embed) => interaction.reply({ embeds: [embed] }));
    }
  },
};

async function clockIn(user, department, respond) {
  if (activeShifts.has(user.id)) {
    const shift = activeShifts.get(user.id);
    return respond(
      new EmbedBuilder()
        .setColor('#faa61a')
        .setTitle('⚠️ Already on Duty')
        .setDescription(`You are already clocked into **${shift.department}** since <t:${Math.floor(shift.clockIn / 1000)}:R>.`)
    );
  }

  const now = Date.now();
  activeShifts.set(user.id, { department, clockIn: now });

  const embed = new EmbedBuilder()
    .setColor('#57f287')
    .setTitle('🟢 Shift Started')
    .setDescription(`<@${user.id}> clocked in for **${department}** at <t:${Math.floor(now / 1000)}:T>.`)
    .setFooter({ text: 'Los Angeles Roleplay Shift Logs' })
    .setTimestamp();

  return respond(embed);
}

async function clockOut(user, respond) {
  if (!activeShifts.has(user.id)) {
    return respond(
      new EmbedBuilder()
        .setColor('#ef4444')
        .setTitle('❌ Not on Duty')
        .setDescription('You have not clocked into an active shift yet.')
    );
  }

  const shift = activeShifts.get(user.id);
  activeShifts.delete(user.id);

  const now = Date.now();
  const minutes = Math.max(1, Math.round((now - shift.clockIn) / (60 * 1000)));

  const embed = new EmbedBuilder()
    .setColor('#ed4245')
    .setTitle('🔴 Shift Ended')
    .setDescription(
      `<@${user.id}> clocked out from **${shift.department}**.\n\n` +
      `⏱️ **Total Duration:** \`${minutes} minutes\`\n` +
      `🕒 **Shift:** <t:${Math.floor(shift.clockIn / 1000)}:t> ➔ <t:${Math.floor(now / 1000)}:t>`
    )
    .setFooter({ text: 'Los Angeles Roleplay Shift Logs' })
    .setTimestamp();

  return respond(embed);
}
