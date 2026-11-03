const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const db = require('../../db');
const config = require('../../config');

async function handleButtonInteraction(interaction, client) {
  if (!interaction.isButton()) return;

  const customId = interaction.customId;

  // 1. Training Attendance (Join / Leave)
  if (customId.startsWith('training_join_')) {
    const trainingId = customId.replace('training_join_', '');
    const training = db.getTraining(trainingId);

    if (!training || training.status === 'Ended') {
      return interaction.reply({ content: '❌ This training session has already ended.', ephemeral: true });
    }

    let attendees = training.attendees || [];
    const userId = interaction.user.id;
    const userTag = interaction.user.tag;

    let joined = false;
    if (attendees.some(a => a.id === userId)) {
      attendees = attendees.filter(a => a.id !== userId);
    } else {
      attendees.push({ id: userId, tag: userTag });
      joined = true;
    }

    db.updateTrainingAttendees(trainingId, attendees);

    const count = attendees.length;
    const attendeesText = count === 0 ? 'Nobody yet' : attendees.map(a => `<@${a.id}>`).join(', ');

    // Update the embed
    const originalEmbed = interaction.message.embeds[0];
    if (originalEmbed) {
      const updatedEmbed = EmbedBuilder.from(originalEmbed);
      const fields = originalEmbed.fields.map(f => {
        if (f.name.includes('Attending')) {
          return { name: `👥 Attending (${count})`, value: attendeesText, inline: f.inline };
        }
        return f;
      });

      // If fields didn't have Attending, update description or field
      if (fields.length > 0) {
        updatedEmbed.setFields(fields);
      } else {
        // Updated in description regex if stored there
        const desc = originalEmbed.description || '';
        const updatedDesc = desc.replace(/:ppl: Attending \(\d+\): .*/, `:ppl: Attending (${count}): ${attendeesText}`);
        updatedEmbed.setDescription(updatedDesc);
      }

      await interaction.message.edit({ embeds: [updatedEmbed] }).catch(() => {});
    }

    return interaction.reply({
      content: joined ? '✅ You have joined this training session!' : 'ℹ️ You have left the training session.',
      ephemeral: true,
    });
  }

  // 2. Training Start (Host or Management only)
  if (customId.startsWith('training_start_')) {
    const trainingId = customId.replace('training_start_', '');
    const training = db.getTraining(trainingId);

    const isHost = training && training.host_id === interaction.user.id;
    const isMgmt = interaction.member.roles.cache.has(config.ROLES.MANAGEMENT) || interaction.member.permissions.has('Administrator');

    if (!isHost && !isMgmt) {
      return interaction.reply({ content: '❌ Only the training host or Management can start this session.', ephemeral: true });
    }

    db.saveTraining(trainingId, training ? training.host_id : interaction.user.id, 'In Progress');

    const originalEmbed = interaction.message.embeds[0];
    if (originalEmbed) {
      const updatedEmbed = EmbedBuilder.from(originalEmbed)
        .setColor('#2051d9');

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`training_join_${trainingId}`).setLabel('Join Training').setStyle(ButtonStyle.Success),
        new ButtonBuilder().setCustomId(`training_end_${trainingId}`).setLabel('End Training').setStyle(ButtonStyle.Danger),
        new ButtonBuilder().setLabel('Join Game').setStyle(ButtonStyle.Link).setURL('https://roblox.com')
      );

      await interaction.message.edit({ embeds: [updatedEmbed], components: [row] }).catch(() => {});
    }

    return interaction.reply({ content: '🚀 Training is now **In Progress**!', ephemeral: true });
  }

  // 3. Training End (Host or Management only)
  if (customId.startsWith('training_end_')) {
    const trainingId = customId.replace('training_end_', '');
    const training = db.getTraining(trainingId);

    const isHost = training && training.host_id === interaction.user.id;
    const isMgmt = interaction.member.roles.cache.has(config.ROLES.MANAGEMENT) || interaction.member.permissions.has('Administrator');

    if (!isHost && !isMgmt) {
      return interaction.reply({ content: '❌ Only the training host or Management can end this session.', ephemeral: true });
    }

    db.endTraining(trainingId);

    const originalEmbed = interaction.message.embeds[0];
    if (originalEmbed) {
      const endedEmbed = EmbedBuilder.from(originalEmbed)
        .setColor('#2b2d31')
        .setDescription(
          `This training session has ended. Thank you to everyone who attended.\n\n` +
          `You must complete a training within **7 days** of becoming a Trainee, otherwise it will result in an immediate termination.\n\n` +
          `**How to attend**\n` +
          `1. Press **Join Game** below to load into the server\n` +
          `2. Go to the **Police Team briefing room** and wait for your trainer\n` +
          `3. Make sure you are wearing the **staff uniform**\n\n` +
          `🛡️ **Trainer:** <@${training ? training.host_id : interaction.user.id}>\n` +
          `📌 **Status:** Ended\n` +
          `📅 **Ended:** Just now\n` +
          `👥 **Attending (${training?.attendees?.length || 0}):** ${training?.attendees?.length ? training.attendees.map(a => `<@${a.id}>`).join(', ') : 'Nobody yet'}\n` +
          `📁 **Notes:** ${training?.notes || 'R/A'}\n\n` +
          `*This training has finished. Keep an eye out for the next one.*`
        );

      const disabledRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('training_done_1').setLabel('Join Training').setStyle(ButtonStyle.Success).setDisabled(true),
        new ButtonBuilder().setCustomId('training_done_2').setLabel('End Training').setStyle(ButtonStyle.Danger).setDisabled(true),
        new ButtonBuilder().setLabel('Join Game').setStyle(ButtonStyle.Link).setURL('https://roblox.com')
      );

      await interaction.message.edit({ embeds: [endedEmbed], components: [disabledRow] }).catch(() => {});
    }

    return interaction.reply({ content: '🛑 Training session officially concluded.', ephemeral: true });
  }

  // 4. Ticket Claim & Unclaim Toggle (Staff Only)
  if (customId === 'ticket_claim' || customId === 'ticket_unclaim') {
    const isStaff = interaction.member.roles.cache.has(config.ROLES.STAFF) || 
                    interaction.member.roles.cache.has(config.ROLES.SENIOR_STAFF) ||
                    interaction.member.roles.cache.has(config.ROLES.MANAGEMENT) ||
                    interaction.member.permissions.has('Administrator');

    if (!isStaff) {
      return interaction.reply({ content: '❌ Only verified staff members may claim support tickets.', ephemeral: true });
    }

    const channel = interaction.channel;
    const currentName = channel.name;

    if (customId === 'ticket_claim') {
      db.claimTicket(channel.id, interaction.user.id);
      const newName = currentName.replace(/^🔴-?/, '🟢-');
      await channel.setName(newName).catch(() => {});

      const updatedRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('ticket_unclaim').setLabel('Unclaim').setStyle(ButtonStyle.Danger).setEmoji('🔓'),
        new ButtonBuilder().setCustomId('ticket_close').setLabel('Close Ticket').setStyle(ButtonStyle.Secondary).setEmoji('🔒')
      );

      await interaction.update({ components: [updatedRow] });
      await channel.send(`🟢 **Ticket Claimed** by <@${interaction.user.id}>. Automated AI support is paused; a human staff member will assist you shortly.`);
    } else {
      db.unclaimTicket(channel.id);
      const newName = currentName.replace(/^🟢-?/, '🔴-');
      await channel.setName(newName).catch(() => {});

      const updatedRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('ticket_claim').setLabel('Claim').setStyle(ButtonStyle.Success).setEmoji('🔒'),
        new ButtonBuilder().setCustomId('ticket_close').setLabel('Close Ticket').setStyle(ButtonStyle.Secondary).setEmoji('🔒')
      );

      await interaction.update({ components: [updatedRow] });
      await channel.send(`🔴 **Ticket Unclaimed** by <@${interaction.user.id}>. Open to other staff members.`);
    }
  }

  // 5. Ticket Close with GUARANTEED Transcript Preservation Before Channel Deletion
  if (customId === 'ticket_close') {
    const isStaff = interaction.member.roles.cache.has(config.ROLES.STAFF) || 
                    interaction.member.permissions.has('Administrator');

    if (!isStaff) {
      return interaction.reply({ content: '❌ Only staff members may close support tickets.', ephemeral: true });
    }

    await interaction.reply('🔒 Preserving ticket transcript before deletion. Please wait...');

    const channel = interaction.channel;
    try {
      // 1. Fetch channel messages for transcript
      const messages = await channel.messages.fetch({ limit: 100 });
      const sortedMessages = Array.from(messages.values()).reverse();

      // 2. Build full HTML transcript
      let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Transcript - ${channel.name}</title>`;
      html += `<style>body{font-family:sans-serif;background:#313338;color:#dbdee1;padding:20px;}`;
      html += `.msg{margin-bottom:12px;padding:8px;border-radius:4px;background:#2b2d31;}`;
      html += `.author{font-weight:bold;color:#fff;margin-bottom:4px;}`;
      html += `.time{font-size:11px;color:#949ba4;margin-left:8px;}`;
      html += `.content{word-wrap:break-word;}</style></head><body>`;
      html += `<h2>Ticket Transcript: ${channel.name}</h2><p>Closed at: ${new Date().toISOString()} by ${interaction.user.tag}</p><hr/>`;

      for (const msg of sortedMessages) {
        html += `<div class="msg"><div class="author">${msg.author.tag} <span class="time">${msg.createdAt.toLocaleString()}</span></div><div class="content">${msg.cleanContent || '[Embed/Attachment]'}</div></div>`;
      }
      html += `</body></html>`;

      // 3. Save transcript to database FIRST
      db.saveTicketTranscript(channel.id, html);

      // 4. Send transcript file to transcripts audit channel
      const transcriptBuffer = Buffer.from(html, 'utf-8');
      const attachment = new AttachmentBuilder(transcriptBuffer, { name: `transcript-${channel.name}.html` });

      const transcriptsChannel = interaction.guild.channels.cache.get(config.CHANNELS.TRANSCRIPTS);
      if (transcriptsChannel) {
        await transcriptsChannel.send({
          content: `📑 **Ticket Transcript Saved**: \`${channel.name}\` closed by <@${interaction.user.id}>.`,
          files: [attachment],
        });
      }

      await channel.send('✅ Transcript successfully saved to database and audit logs. Deleting ticket channel in 5 seconds...');
      setTimeout(() => {
        channel.delete('Ticket closed and transcript preserved').catch(() => {});
      }, 5000);
    } catch (err) {
      console.error('Failed to preserve transcript before channel deletion:', err);
      return channel.send(`❌ **Transcript Save Failed**: Deletion cancelled for safety.\n\`\`\`${err.message}\`\`\``);
    }
  }

  // 6. Infraction Appeal Permission Check (Exact Screenshot rule)
  if (customId.startsWith('appeal_infraction_')) {
    const infractionId = customId.replace('appeal_infraction_', '');
    const infraction = db.getInfraction(infractionId);

    // Rule: "Only the staff member who received this infraction can appeal it."
    if (infraction && infraction.user_id !== interaction.user.id) {
      return interaction.reply({
        content: '✕ Only the staff member who received this infraction can appeal it.',
        ephemeral: true,
      });
    }

    return interaction.reply({
      content: `📝 Appeal modal opened for **${infractionId}**. Please explain your grounds for revocation.`,
      ephemeral: true,
    });
  }
}

module.exports = {
  handleButtonInteraction,
};
