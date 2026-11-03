const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const config = require('./config');

async function deploySlashCommands() {
  const validation = config.validate();
  if (!validation.isValid) {
    console.error('❌ Cannot deploy slash commands. Missing config:', validation.missing.join(', '));
    process.exit(1);
  }

  const commands = [];
  const commandsDir = path.join(__dirname, 'src', 'commands');

  if (!fs.existsSync(commandsDir)) {
    console.error('❌ Commands directory not found at', commandsDir);
    process.exit(1);
  }

  const categories = fs.readdirSync(commandsDir);
  for (const category of categories) {
    const categoryPath = path.join(commandsDir, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));
    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      try {
        const cmd = require(filePath);
        if (cmd && cmd.slashData) {
          commands.push(cmd.slashData.toJSON());
          console.log(`  ✓ Queued slash command: /${cmd.name} (${category})`);
        }
      } catch (err) {
        console.warn(`  ⚠️ Could not load slash definition from ${file}: ${err.message}`);
      }
    }
  }

  console.log(`\n⏳ Registering ${commands.length} application (/) commands with Discord REST API...`);
  const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

  try {
    const data = await rest.put(
      Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID),
      { body: commands }
    );
    console.log(`✅ Successfully deployed ${data.length} slash commands to Guild ID: ${config.GUILD_ID}`);
  } catch (err) {
    console.error('💥 Failed to deploy slash commands:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  deploySlashCommands();
}

module.exports = { deploySlashCommands };
