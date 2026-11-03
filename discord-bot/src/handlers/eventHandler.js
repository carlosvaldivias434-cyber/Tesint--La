const { EmbedBuilder } = require('discord.js');
const config = require('../../config');
const db = require('../../db');
const { handlePrefixMessage } = require('./commandHandler');
const { handleSlashInteraction } = require('./slashHandler');
const { handleButtonInteraction } = require('./buttonHandler');
const { handleSelectInteraction } = require('./selectHandler');

function loadEvents(client) {
  // 1. Ready Event
  client.once('ready', () => {
    console.log(`🤖 [DISCORD] Logged in as ${client.user.tag} (ID: ${client.user.id})`);
    console.log(`📡 [DISCORD] Serving ${client.guilds.cache.size} guild(s)`);

    // Rotating Status
    const activities = [
      { name: 'Los Angeles Roleplay', type: 0 },
      { name: 'Staff Trainings', type: 3 },
      { name: '!verify for Roblox sync', type: 2 },
      { name: 'Protecting Foundation & Directive', type: 3 },
    ];
    let index = 0;
    setInterval(() => {
      client.user.setActivity(activities[index].name, { type: activities[index].type });
      index = (index + 1) % activities.length;
    }, 30000);
  });

  // 2. Message Create (Anti-Ping Auto-Mod + Prefix Commands)
  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    // Check Anti-Ping Auto-Mod against Foundation & Directive roles
    const mentionsFoundation = message.mentions.roles.has(config.ROLES.FOUNDER);
    const mentionsDirective = message.mentions.roles.has(config.ROLES.DIRECTIVE);

    // Also check if reply pinged a member of Foundation / Directive
    let repliedToProtected = false;
    if (message.reference && message.reference.messageId) {
      try {
        const repliedMsg = await message.channel.messages.fetch(message.reference.messageId);
        if (repliedMsg && repliedMsg.member) {
          if (repliedMsg.member.roles.cache.has(config.ROLES.FOUNDER) || repliedMsg.member.roles.cache.has(config.ROLES.DIRECTIVE)) {
            // Check if mention was ON
            if (message.mentions.users.has(repliedMsg.author.id)) {
              repliedToProtected = true;
            }
          }
        }
      } catch (err) {
        // Message might be deleted or uncached
      }
    }

    if (mentionsFoundation || mentionsDirective || repliedToProtected) {
      const isStaffOrAdmin = message.member.permissions.has('Administrator') ||
                             message.member.roles.cache.has(config.ROLES.MANAGEMENT);

      if (!isStaffOrAdmin) {
        const pingedTarget = mentionsFoundation ? 'Foundation Team' : 'Directive Team';
        const strikes = db.recordAntiPingStrike(message.author.id);

        if (strikes >= 3) {
          // Strike 3: 24h Timeout
          try {
            const timeoutDuration = 24 * 60 * 60 * 1000;
            await message.member.timeout(timeoutDuration, `Exceeded 3 pings to ${pingedTarget} within 24h`);

            const muteEmbed = new EmbedBuilder()
              .setColor('#f04747')
              .setTitle('🔇 Muted for 24 Hours')
              .setDescription(
                `<@${message.author.id}>, you've pinged the **${pingedTarget}** 3/3 times within 1 day, so you've been muted for 24 hours.\n\n` +
                `> If you're replying to one of them, turn the ping off first. The GIF below shows you how.`
              )
              .setImage('https://media.discordapp.net/attachments/1140027663457816654/1200000000000000000/turn_ping_off.gif')
              .setTimestamp();

            await message.channel.send({ embeds: [muteEmbed] });

            // DM notice
            try {
              const dmEmbed = new EmbedBuilder()
                .setColor('#f04747')
                .setTitle('🔇 You have been muted for 24 hours')
                .setDescription(
                  `You have received a 24-hour timeout in **${message.guild.name}** for pinging the **${pingedTarget}** 3 times in 24 hours.\n\n` +
                  `Turn the reply mention off before sending replies to directive staff.`
                );
              await message.author.send({ embeds: [dmEmbed] });
            } catch (dmErr) {}

            return;
          } catch (timeoutErr) {
            console.error('Failed to timeout member for anti-ping:', timeoutErr);
          }
        } else {
          // Strikes 1 & 2: Warning embed + auto-delete after 7s + DM
          const warnEmbed = new EmbedBuilder()
            .setColor('#faa61a')
            .setTitle(`⚠️ Warning: Pinging ${pingedTarget} (${strikes}/3)`)
            .setDescription(
              `<@${message.author.id}>, do not ping the **${pingedTarget}**! (Strike ${strikes}/3)\n\n` +
              `> Turn the ping off when replying. If you reach 3/3 strikes, you will automatically be muted for 24 hours.\n` +
              `*This warning will self-destruct in 7 seconds.*`
            )
            .setImage('https://media.discordapp.net/attachments/1140027663457816654/1200000000000000000/turn_ping_off.gif');

          const warningMsg = await message.channel.send({ embeds: [warnEmbed] });
          setTimeout(() => {
            warningMsg.delete().catch(() => {});
          }, 7000);

          try {
            await message.author.send(`⚠️ You received Strike **${strikes}/3** for pinging ${pingedTarget} in ${message.guild.name}. Turn reply mentions off.`);
          } catch (e) {}
        }
      }
    }

    // Pass to Prefix Command Handler
    await handlePrefixMessage(message, client);
  });

  // 3. Interaction Create (Slash, Buttons, Select Menus)
  client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
      await handleSlashInteraction(interaction, client);
    } else if (interaction.isButton()) {
      await handleButtonInteraction(interaction, client);
    } else if (interaction.isStringSelectMenu()) {
      await handleSelectInteraction(interaction, client);
    }
  });
}

module.exports = {
  loadEvents,
};
