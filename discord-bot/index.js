const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./config');
const db = require('./db');
const { loadCommands } = require('./src/handlers/commandHandler');
const { loadEvents } = require('./src/handlers/eventHandler');

console.log('====================================================');
console.log('🤖 Starting New York & Los Angeles Automation Bot');
console.log('====================================================');

// 1. Validate Environment
const validation = config.validate();
if (!validation.isValid) {
  console.error('❌ FATAL CONFIG ERROR: Missing environment variables:');
  for (const item of validation.missing) {
    console.error(`   - ${item}`);
  }
  console.error('\nPlease copy .env.example to .env and provide your Discord credentials.');
  process.exit(1);
}

// 2. Initialize Discord Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
  ],
});

// 3. Shared Collections
client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();

// 4. Load Handlers
loadCommands(client);
loadEvents(client);

// 5. Global Process Crash Guards
process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 [GLOBAL GUARD] Unhandled Promise Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('💥 [GLOBAL GUARD] Uncaught Exception thrown:', err);
});

// 6. Connect to Discord Gateway
client.login(config.DISCORD_TOKEN).catch((err) => {
  console.error('❌ FATAL: Discord Client Login Failed:', err.message);
  if (err.message.includes('DISALLOWED_INTENTS')) {
    console.error('\n👉 FIX: Go to https://discord.com/developers/applications');
    console.error('   Select your bot -> Bot tab -> Enable Presence Intent, Server Members Intent, and Message Content Intent!');
  } else if (err.message.includes('TOKEN_INVALID') || err.message.includes('401: Unauthorized')) {
    console.error('\n👉 FIX: Check your DISCORD_TOKEN in discord-bot/.env');
  }
  process.exit(1);
});
