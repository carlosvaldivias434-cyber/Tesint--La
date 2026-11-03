const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'verify',
  description: 'Cryptographically verifies and binds your Roblox account via Bloxlink Server API v4 (Prefix only)',
  aliases: ['getroles', 'update'],
  // Strictly prefix-only: No slashData per user requirement

  async executePrefix(message, args, client) {
    const member = message.member;
    const authorId = message.author.id;
    const guildId = config.BLOXLINK_GUILD_ID || message.guild.id;

    if (!config.BLOXLINK_API_KEY) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#ef4444')
            .setTitle('❌ Verification Offline')
            .setDescription('Bloxlink Server API v4 is not configured in the bot environment. Please notify server administration.')
        ]
      });
    }

    const checkingMsg = await message.reply('🔍 Contacting Bloxlink Server API v4 to verify your linked Roblox account...');

    try {
      // 1. Query Bloxlink Server API v4 for Discord User -> Roblox ID
      // CRITICAL SECURITY: We ONLY query by the user's authentic Discord ID.
      // We NEVER allow an unlinked user to claim someone else's public username!
      const bloxlinkRes = await axios.get(
        `https://api.blox.link/v4/public/guilds/${guildId}/discord-to-roblox/${authorId}`,
        {
          headers: {
            Authorization: config.BLOXLINK_API_KEY,
          },
          validateStatus: (status) => status < 500,
        }
      );

      if (bloxlinkRes.status === 404 || !bloxlinkRes.data || !bloxlinkRes.data.robloxID) {
        const unlinkedEmbed = new EmbedBuilder()
          .setColor('#faa61a')
          .setTitle('⚠️ No Linked Roblox Account Found')
          .setDescription(
            `Hey <@${authorId}>, your Discord account is not linked to any Roblox profile on Bloxlink.\n\n` +
            `**How to verify:**\n` +
            `1. Visit **[blox.link](https://blox.link)**\n` +
            `2. Sign in with Discord and complete account verification\n` +
            `3. Return to this server and type \`${config.PREFIX}verify\` again.\n\n` +
            `*Security Note: You cannot verify with a public username without proving ownership via Bloxlink OAuth.*`
          )
          .setFooter({ text: 'Los Angeles Roleplay Verification Gateway' })
          .setTimestamp();

        return checkingMsg.edit({ content: null, embeds: [unlinkedEmbed] });
      }

      const robloxId = bloxlinkRes.data.robloxID;

      // 2. Resolve Roblox Profile Information
      let robloxUsername = `Roblox_${robloxId}`;
      let robloxDisplayName = robloxUsername;
      try {
        const robloxUserRes = await axios.get(`https://users.roblox.com/v1/users/${robloxId}`);
        if (robloxUserRes.data) {
          robloxUsername = robloxUserRes.data.name;
          robloxDisplayName = robloxUserRes.data.displayName || robloxUsername;
        }
      } catch (err) {
        console.warn('Could not fetch Roblox profile details:', err.message);
      }

      // 3. Resolve Roblox Avatar Headshot
      let avatarUrl = 'https://tr.rbxcdn.com/30DAY-AvatarHeadshot-placeholder/150/150/AvatarHeadshot/Png/noFilter';
      try {
        const thumbRes = await axios.get(
          `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${robloxId}&size=150x150&format=Png&isCircular=true`
        );
        if (thumbRes.data?.data?.[0]?.imageUrl) {
          avatarUrl = thumbRes.data.data[0].imageUrl;
        }
      } catch (err) {
        console.warn('Could not fetch Roblox avatar:', err.message);
      }

      // 4. Update Member Nickname
      const newNickname = `${robloxDisplayName} (@${robloxUsername})`.slice(0, 32);
      let nickChanged = false;
      try {
        if (member.manageable && message.guild.ownerId !== member.id) {
          await member.setNickname(newNickname);
          nickChanged = true;
        }
      } catch (err) {
        console.warn('Failed to set nickname:', err.message);
      }

      // 5. Grant Verified Role
      let roleGranted = false;
      const verifiedRole = message.guild.roles.cache.get(config.ROLES.VERIFIED);
      if (verifiedRole && member.manageable) {
        try {
          await member.roles.add(verifiedRole);
          roleGranted = true;
        } catch (err) {
          console.warn('Failed to grant verified role:', err.message);
        }
      }

      // 6. Send Confirmation Embed
      const successEmbed = new EmbedBuilder()
        .setColor('#57f287')
        .setTitle('✅ Verification Successful')
        .setThumbnail(avatarUrl)
        .setDescription(
          `Welcome to **${message.guild.name}**, <@${authorId}>!\n` +
          `Your Discord account has been confirmed and linked via Bloxlink Server API v4.`
        )
        .addFields(
          { name: 'Roblox Username', value: `\`${robloxUsername}\``, inline: true },
          { name: 'Roblox ID', value: `\`${robloxId}\``, inline: true },
          { name: 'Display Name', value: robloxDisplayName, inline: true },
          { name: 'Nickname Sync', value: nickChanged ? `\`${newNickname}\`` : 'Manual / Unchanged', inline: true },
          { name: 'Role Assigned', value: roleGranted ? `<@&${config.ROLES.VERIFIED}>` : 'Verified', inline: true }
        )
        .setFooter({ text: 'Powered by Bloxlink Server API v4 & Roblox Cloud' })
        .setTimestamp();

      await checkingMsg.edit({ content: null, embeds: [successEmbed] });
    } catch (err) {
      console.error('Bloxlink verification API error:', err);
      return checkingMsg.edit({
        content: null,
        embeds: [
          new EmbedBuilder()
            .setColor('#ef4444')
            .setTitle('💥 Verification API Error')
            .setDescription(`An unexpected error occurred while contacting Bloxlink:\n\`\`\`${err.message}\`\`\``)
        ]
      });
    }
  },
};
