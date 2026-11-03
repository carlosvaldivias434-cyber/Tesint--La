const { EmbedBuilder } = require('discord.js');
const { checkPermissions } = require('./commandHandler');

async function handleSlashInteraction(interaction, client) {
  if (!interaction.isChatInputCommand()) return;

  const command = client.slashCommands.get(interaction.commandName);
  if (!command) {
    return interaction.reply({
      content: `❌ Unknown command \`/${interaction.commandName}\`.`,
      ephemeral: true,
    });
  }

  // Permission Verification
  const permCheck = checkPermissions(interaction.member, command);
  if (!permCheck.pass) {
    const errEmbed = new EmbedBuilder()
      .setColor('#ef4444')
      .setTitle('❌ Permission Denied')
      .setDescription(permCheck.reason)
      .setFooter({ text: 'Los Angeles Roleplay Access Control' })
      .setTimestamp();
    return interaction.reply({ embeds: [errEmbed], ephemeral: true });
  }

  // Isolated Execution Block
  try {
    if (typeof command.executeSlash === 'function') {
      await command.executeSlash(interaction, client);
    } else {
      await interaction.reply({
        content: `⚠️ Command \`/${command.name}\` does not have a slash execution handler.`,
        ephemeral: true,
      });
    }
  } catch (err) {
    console.error(`💥 [SLASH ERROR] Command /${interaction.commandName} failed:`, err);
    const errorEmbed = new EmbedBuilder()
      .setColor('#ef4444')
      .setTitle('💥 Slash Execution Error')
      .setDescription(`An unexpected error occurred while executing \`/${interaction.commandName}\`.\n\`\`\`${err.message || 'Unknown Error'}\`\`\``)
      .setFooter({ text: `File: src/commands/${command.category || 'unknown'}/${command.name}.js` })
      .setTimestamp();

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ embeds: [errorEmbed], ephemeral: true }).catch(() => {});
    } else {
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true }).catch(() => {});
    }
  }
}

module.exports = {
  handleSlashInteraction,
};
