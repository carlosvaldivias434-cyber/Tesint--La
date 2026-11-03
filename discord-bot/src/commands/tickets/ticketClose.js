const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const db = require('../../db');
const config = require('../../config');

module.exports = {
  name: 'close',
  description: 'Closes a support ticket and archives full HTML transcript before deletion',
  aliases: ['ticket-close'],
  slashData: new SlashCommandBuilder()
    .setName('ticket-close')
    .setDescription('Closes this ticket channel and archives the transcript')
    .addStringOption(opt => opt.setName('reason').setDescription('Reason for closing').setRequired(false)),

  async executePrefix(message, args, client) {
    const reason = args.join(' ') || 'Ticket resolved';
    await executeClose(message.channel, message.author, reason, async (msg) => {
      await message.reply(msg);
    });
  },

  async executeSlash(interaction, client) {
    const reason = interaction.options.getString('reason') || 'Ticket resolved';
    await executeClose(interaction.channel, interaction.user, reason, async (msg) => {
      await interaction.reply(msg);
    });
  },
};

async function executeClose(channel, closedBy, reason, respond) {
  // Check that this is a ticket channel
  if (!channel.name.includes('ticket')) {
    return respond({
      embeds: [
        new EmbedBuilder()
          .setColor('#ef4444')
          .setTitle('❌ Invalid Channel')
          .setDescription('This command can only be run inside an active support ticket channel.')
      ],
      ephemeral: true,
    });
  }

  await respond({
    content: '🔒 Archiving ticket messages and compiling HTML transcript. Channel will delete shortly...',
  });

  try {
    // 1. Fetch channel message history
    const messages = await channel.messages.fetch({ limit: 100 });
    const sorted = Array.from(messages.values()).reverse();

    // 2. Build standalone HTML transcript
    let html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Transcript: ${channel.name}</title>`;
    html += `<style>body{font-family:Segoe UI,Helvetica,Arial,sans-serif;background:#1e1f22;color:#dbdee1;padding:24px;margin:0;}`;
    html += `.header{border-bottom:1px solid #3f4147;padding-bottom:16px;margin-bottom:20px;}`;
    html += `.msg{display:flex;margin-bottom:16px;}`;
    html += `.avatar{width:40px;height:40px;border-radius:50%;margin-right:16px;background:#5865f2;}`;
    html += `.author{font-weight:600;color:#f2f3f5;font-size:15px;}`;
    html += `.time{font-size:12px;color:#949ba4;margin-left:8px;font-weight:400;}`;
    html += `.text{margin-top:4px;font-size:14px;line-height:1.4;white-space:pre-wrap;word-break:break-word;}`;
    html += `</style></head><body>`;
    html += `<div class="header"><h2>Ticket Transcript: #${channel.name}</h2><p>Closed by: ${closedBy.tag} | Reason: ${reason} | Timestamp: ${new Date().toISOString()}</p></div>`;

    for (const m of sorted) {
      const avatarUrl = m.author.displayAvatarURL({ dynamic: true, size: 64 });
      html += `<div class="msg"><img class="avatar" src="${avatarUrl}" alt="avatar"/><div>`;
      html += `<div><span class="author">${m.author.tag}</span><span class="time">${m.createdAt.toLocaleString()}</span></div>`;
      html += `<div class="text">${m.cleanContent ? m.cleanContent.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '[Attachment / Embed]'}</div>`;
      html += `</div></div>`;
    }
    html += `</body></html>`;

    // 3. Save to database FIRST
    db.saveTicketTranscript(channel.id, html);

    // 4. Send attachment to TRANSCRIPTS channel
    const buffer = Buffer.from(html, 'utf-8');
    const attachment = new AttachmentBuilder(buffer, { name: `transcript-${channel.name}.html` });

    const transcriptChannel = channel.guild.channels.cache.get(config.CHANNELS.TRANSCRIPTS);
    if (transcriptChannel) {
      await transcriptChannel.send({
        content: `📑 **Ticket Transcript Archived**: \`${channel.name}\` closed by <@${closedBy.id}>. (Reason: ${reason})`,
        files: [attachment],
      });
    }

    await channel.send('✅ Transcript archived successfully. Channel deleting in 4 seconds...');
    setTimeout(() => {
      channel.delete(`Ticket closed by ${closedBy.tag}`).catch(() => {});
    }, 4000);
  } catch (err) {
    console.error('Failed to archive ticket transcript:', err);
    await channel.send(`❌ **Transcript Save Failed**: Channel deletion aborted to prevent data loss.\n\`\`\`${err.message}\`\`\``);
  }
}
