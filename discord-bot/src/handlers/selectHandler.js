const { EmbedBuilder } = require('discord.js');

async function handleSelectInteraction(interaction, client) {
  if (!interaction.isStringSelectMenu()) return;

  const customId = interaction.customId;

  if (customId === 'help_category_select') {
    const selectedCategory = interaction.values[0];

    const categoryCommands = [];
    client.commands.forEach(cmd => {
      if (cmd.category && cmd.category.toLowerCase() === selectedCategory.toLowerCase()) {
        categoryCommands.push(cmd);
      }
    });

    const embed = new EmbedBuilder()
      .setColor('#2051d9')
      .setTitle(`📖 Command Help: ${selectedCategory.toUpperCase()}`)
      .setDescription(
        categoryCommands.length > 0
          ? categoryCommands.map(c => `\`!${c.name}\` / \`/${c.name}\` - ${c.description || 'No description'}`).join('\n')
          : 'No commands in this category.'
      )
      .setFooter({ text: 'New York & Los Angeles Automation' })
      .setTimestamp();

    await interaction.update({ embeds: [embed] });
  }
}

module.exports = {
  handleSelectInteraction,
};
