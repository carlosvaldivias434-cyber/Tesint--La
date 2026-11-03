const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../../db');

module.exports = {
  name: 'infraction-revoke',
  description: 'Revokes a logged staff infraction with audit confirmation',
  aliases: ['revoke-infraction', 'uninfract'],
  requiredRoles: ['MANAGEMENT', 'INTERNAL_AFFAIRS', 'DIRECTIVE', 'FOUNDER'],
  slashData: new SlashCommandBuilder()
    .setName('infraction')
    .setDescription('Manage staff infractions')
    .addSubcommand(sub =>
      sub
        .setName('revoke')
        .setDescription('Revoke an active staff infraction')
        .addStringOption(opt => opt.setName('id').setDescription('The infraction ID, like INF-0001').setRequired(true))
        .addStringOption(opt => opt.setName('reason').setDescription('Reason for revocation').setRequired(true))
    ),

  async executePrefix(message, args, client) {
    // !infraction-revoke <id> <reason>
    const id = args[0];
    const reason = args.slice(1).join(' ');

    if (!id || !reason) {
      return message.reply('❌ Usage: `!infraction-revoke <id> <reason>`');
    }

    await executeRevoke(message.guild, message.author, id, reason, async (embed) => {
      await message.reply({ embeds: [embed] });
    });
  },

  async executeSlash(interaction, client) {
    const id = interaction.options.getString('id');
    const reason = interaction.options.getString('reason');

    await executeRevoke(interaction.guild, interaction.user, id, reason, async (embed) => {
      await interaction.reply({ embeds: [embed] });
    });
  },
};

async function executeRevoke(guild, moderator, id, reason, respond) {
  const cleanId = id.toUpperCase();
  const existing = db.getInfraction(cleanId);

  // Update DB state
  db.revokeInfraction(cleanId, moderator.id, reason);

  const targetUserId = existing ? existing.user_id : moderator.id;
  const punishmentType = existing ? existing.type : 'Warning';

  // Embed formatted EXACTLY as screenshot 2
  const embed = new EmbedBuilder()
    .setColor('#2051d9')
    .setTitle('✓ Infraction Revoked')
    .setDescription(
      `**${cleanId}** (${punishmentType}) for <@${targetUserId}> was revoked by <@${moderator.id}>.\n` +
      `> ${reason}`
    )
    .setTimestamp();

  return respond(embed);
}
