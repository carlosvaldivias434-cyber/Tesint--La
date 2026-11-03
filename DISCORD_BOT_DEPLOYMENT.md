# 🚀 Discord Bot Deployment Guide

> **New York & Los Angeles Automation Bot (Discord.js v14)**  
> Complete deployment manual for hosting your Discord bot 24/7 on a VPS, Railway, Render, Docker, or your personal server.

---

## 📋 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Discord Developer Portal Setup](#-discord-developer-portal-setup)
3. [External API Keys Setup](#-external-api-keys-setup)
4. [Project Installation](#-project-installation)
5. [Environment Variables (`.env`)](#-environment-variables-env)
6. [Registering Slash Commands](#-registering-slash-commands)
7. [Starting the Bot (Local Development)](#-starting-the-bot-local-development)
8. [24/7 Production Hosting Options](#-247-production-hosting-options)
   - [Option A: Linux VPS with PM2 (Recommended)](#option-a-linux-vps-with-pm2-recommended)
   - [Option B: Docker & Docker Compose](#option-b-docker--docker-compose)
   - [Option C: Railway / Render / Pterodactyl](#option-c-railway--render--pterodactyl)
9. [Architecture & How to Modify Commands](#-architecture--how-to-modify-commands)
10. [Troubleshooting & Common Errors](#-troubleshooting--common-errors)

---

## ⚡ Prerequisites

Before deploying, ensure you have:
- **Node.js**: `v18.17.0` or `v20.x` LTS or newer (`node -v`)
- **NPM**: `v9.x` or newer (`npm -v`)
- **Git**: Installed on your system or server
- **Discord Bot Token & Client ID**: From Discord Developer Portal
- **Privileged Gateway Intents**: Enabled on your Discord application

---

## 🤖 Discord Developer Portal Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application**, name your bot (e.g., `New York Automation` or `Los Angeles Roleplay`), and accept the terms.
3. In the left sidebar, navigate to **Bot**:
   - Click **Reset Token** and copy your token. **Keep this secret!** (This is `DISCORD_TOKEN`).
   - Under **Privileged Gateway Intents**, **YOU MUST ENABLE ALL THREE**:
     - ✅ **PRESENCE INTENT**
     - ✅ **SERVER MEMBERS INTENT** *(Required for Bloxlink nickname & role sync, duty logs, and member management)*
     - ✅ **MESSAGE CONTENT INTENT** *(Required for `!verify`, `!tripwire`, prefix commands, and anti-ping auto-moderation)*
   - Save Changes.
4. In the left sidebar, navigate to **OAuth2 ➔ URL Generator**:
   - Under **Scopes**, select:
     - `bot`
     - `applications.commands`
   - Under **Bot Permissions**, select:
     - `Administrator` (or individually select: *Manage Roles, Manage Nicknames, Kick Members, Ban Members, Moderate Members, Send Messages, Embed Links, Attach Files, Read Message History, Connect, Speak, Move Members*).
   - Copy the generated URL at the bottom and open it in a browser to invite the bot to your server.
5. In your Discord Server Settings ➔ **Roles**:
   - **CRITICAL ROLE HIERARCHY**: Drag your bot's role to the top of the role list (above verified, trainee, and staff roles). Discord will not allow a bot to mute, kick, ban, or change nicknames of users whose highest role is above the bot's highest role!

---

## 🔑 External API Keys Setup

### 1. Bloxlink Server API v4 (Roblox Verification)
1. Go to [blox.link](https://blox.link) and make sure the official Bloxlink bot is in your Discord server.
2. Go to the **Bloxlink Dashboard** ➔ Select your Server ➔ **Settings** / **API**.
3. Generate or copy your **Server API Key** (set this to `BLOXLINK_API_KEY` in `.env`).
4. Set `BLOXLINK_GUILD_ID` to your Discord server ID.

### 2. Groq API (AI Ticket Assistant)
1. Sign up for free at [console.groq.com](https://console.groq.com).
2. Go to **API Keys** ➔ **Create API Key**.
3. Set `GROQ_API_KEY` in your `.env` (default model used: `llama-3.3-70b-versatile`).

### 3. Sapling AI API (Staff Application AI Detection)
1. Sign up at [sapling.ai](https://sapling.ai) and obtain an API key.
2. Set `SAPLING_API_KEY` in your `.env`.

---

## 📦 Project Installation

1. Download or clone your bot repository to your server or computer:
   ```bash
   cd discord-bot
   ```

2. Install all required dependencies from `package.json`:
   ```bash
   npm install
   ```
   *Dependencies installed: `discord.js v14`, `@discordjs/voice`, `better-sqlite3`, `play-dl`, `ffmpeg-static`, `axios`, `dotenv`.*

---

## ⚙️ Environment Variables (`.env`)

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Open `.env` in your text editor (`nano .env`) and fill in your values:

```env
# DISCORD BOT CREDENTIALS
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_discord_application_id_here
GUILD_ID=your_discord_server_id_here
PREFIX=!

# BLOXLINK SERVER API V4 (ROBLOX LOOKUP & ROLE SYNC)
BLOXLINK_API_KEY=your_bloxlink_server_api_v4_key_here
BLOXLINK_GUILD_ID=your_discord_server_id_here

# AI SUPPORT & APPLICATION AUDIT
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
SAPLING_API_KEY=your_sapling_api_key_here

# DISCORD ROLE IDS (Right-click role in Discord -> Copy Role ID)
FOUNDER_ROLE_ID=1140027663457816641
DIRECTIVE_ROLE_ID=1140027663457816642
MANAGEMENT_ROLE_ID=1140027663457816643
INTERNAL_AFFAIRS_ROLE_ID=1140027663457816644
SENIOR_STAFF_ROLE_ID=1140027663457816645
STAFF_ROLE_ID=1140027663457816646
TRAINEE_ROLE_ID=1140027663457816647
VERIFIED_ROLE_ID=1140027663457816648
DJ_ROLE_ID=1140027663457816649

# DISCORD CHANNEL IDS (Right-click channel in Discord -> Copy Channel ID)
LOGS_CHANNEL_ID=1140027663457816650
MOD_LOGS_CHANNEL_ID=1140027663457816651
TRANSCRIPTS_CHANNEL_ID=1140027663457816652
APPLICATION_REVIEWS_CHANNEL_ID=1140027663457816653
SUPPORT_CHANNEL_ID=1140027663457816654
TRIPWIRE_CHANNEL_ID=1140027663457816655
TRAINING_ANNOUNCEMENTS_CHANNEL_ID=1140027663457816656
TRAINING_LOGS_CHANNEL_ID=1140027663457816657
PROMOTIONS_CHANNEL_ID=1140027663457816658
INFRACTIONS_CHANNEL_ID=1140027663457816659

# BANNER ASSETS (Direct image URLs e.g. Imgur or CDN)
PROMOTIONS_TOP_BANNER=https://your-domain.com/banners/promotions-top.png
PROMOTIONS_BOTTOM_BANNER=https://your-domain.com/banners/promotions-bottom.png
INFRACTIONS_TOP_BANNER=https://your-domain.com/banners/infractions-top.png
INFRACTIONS_BOTTOM_BANNER=https://your-domain.com/banners/infractions-bottom.png
TRAINING_TOP_BANNER=https://your-domain.com/banners/training-top.png
TRAINING_BOTTOM_BANNER=https://your-domain.com/banners/training-bottom.png
TRIPWIRE_TOP_BANNER=https://your-domain.com/banners/tripwire-top.png
# NOTE: Tripwire uses TOP BANNER ONLY - do not provide a bottom banner for tripwire!
```

---

## ⚡ Registering Slash Commands

Before starting the bot for the first time, register your slash commands with Discord:

```bash
npm run deploy
```
*This invokes `src/handlers/slashHandler.js` using the Discord REST API to register all commands under `src/commands/` directly to your `GUILD_ID` (instant updates, no 1-hour global cache delay).*

---

## 💻 Starting the Bot (Local Development)

To start the bot in development mode with auto-reload:
```bash
npm run dev
```

Or standard start:
```bash
npm start
```

You should see:
```
✓ Database connected: bot_storage.sqlite
✓ 25 commands loaded from src/commands/
✓ 4 event listeners loaded from src/handlers/
🤖 [DISCORD] Logged in as New York Automation#1234
✓ 100 Rotating activities initialized
```

---

## 🌐 24/7 Production Hosting Options

### Option A: Linux VPS with PM2 (Recommended)
This is the most reliable, industry-standard way to host Discord bots on Ubuntu/Debian/CentOS.

1. **Connect to your VPS via SSH**:
   ```bash
   ssh root@your-vps-ip
   ```

2. **Install Node.js 20 LTS**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs build-essential
   ```

3. **Install PM2 Process Manager globally**:
   ```bash
   sudo npm install -g pm2
   ```

4. **Clone or transfer your bot code**:
   ```bash
   cd /var/www
   git clone https://github.com/your-username/your-bot-repo.git discord-bot
   cd discord-bot
   npm install
   cp .env.example .env
   nano .env # Paste your tokens and IDs
   npm run deploy # Register slash commands
   ```

5. **Start the bot with PM2**:
   ```bash
   pm2 start index.js --name "discord-bot" --max-memory-restart 500M
   ```

6. **Enable Auto-Restart on Server Reboot**:
   ```bash
   pm2 startup
   # Run the command PM2 gives you (e.g. sudo env PATH=... pm2 startup systemd -u root --hp /root)
   pm2 save
   ```

7. **Helpful PM2 Commands**:
   - `pm2 status`: Check if the bot is online
   - `pm2 logs discord-bot`: View live console logs
   - `pm2 restart discord-bot`: Restart the bot
   - `pm2 stop discord-bot`: Stop the bot

---

### Option B: Docker & Docker Compose
If you prefer running in a container:

1. Create a `Dockerfile` in the bot root:
   ```dockerfile
   FROM node:20-alpine
   RUN apk add --no-cache ffmpeg python3 make g++
   WORKDIR /app
   COPY package*.json ./
   RUN npm install --production
   COPY . .
   CMD ["node", "index.js"]
   ```

2. Create a `docker-compose.yml`:
   ```yaml
   version: '3.8'
   services:
     bot:
       build: .
       container_name: discord_bot
       restart: always
       env_file: .env
       volumes:
         - ./data:/app/data
   ```

3. Build and run in background:
   ```bash
   docker compose up -d --build
   docker compose logs -f
   ```

---

### Option C: Railway / Render / Pterodactyl

#### Railway.app
1. Go to [railway.app](https://railway.app), create a new project ➔ **Deploy from GitHub Repo**.
2. In **Variables**, add all keys from your `.env`.
3. In **Settings** ➔ **Deploy**:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Deploy!

#### Pterodactyl Panel (Bot Hosting Services)
1. Select the **Node.js** egg (Node 18 or 20).
2. Upload your bot zip files and extract them.
3. Configure your `.env` in the file manager.
4. Set main file to `index.js`.
5. Press **Start**.

---

## 📂 Architecture & How to Modify Commands

Your bot uses a **fully modular architecture**. Every command and handler is independent:

```
├── .env                  # Secrets & configuration
├── config.js             # Validated configuration & banner URLs
├── db.js                 # SQLite database & migrations
├── index.js              # Discord client & handler initiator
├── package.json          # Node dependencies & npm scripts
└── src/
    ├── handlers/
    │   ├── commandHandler.js   # Loads prefix commands & wraps in error boundaries
    │   ├── slashHandler.js     # Registers & routes slash commands
    │   ├── buttonHandler.js    # Routes button interactions (Claim, Training, Infraction)
    │   ├── selectHandler.js    # Routes select menus (Help category picker)
    │   └── eventHandler.js     # Gateway events & anti-ping auto-mod
    ├── commands/
    │   ├── moderation/         # ban.js, kick.js, mute.js, warn.js
    │   ├── staff/              # training.js, promote.js, infraction.js, duty.js
    │   ├── tickets/            # ticketClose.js
    │   ├── security/           # tripwire.js
    │   ├── verification/       # verify.js (Bloxlink v4 integration)
    │   ├── music/              # play.js, filter.js (25 FFmpeg filters)
    │   └── utility/            # help.js
    └── services/
        ├── groqService.js      # Groq AI ticket answering
        ├── saplingService.js   # Sapling application AI-writing audit
        ├── bloxlinkService.js  # Bloxlink v4 API integration
        └── musicPlayer.js      # Discord voice audio engine
```

### Adding or Editing a Command:
To add a new command, simply create a new file in `src/commands/<category>/mycommand.js`:
```javascript
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Checks bot latency',
  aliases: ['latency', 'p'],
  slashData: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Checks bot latency'),

  async executePrefix(message, args, client) {
    await message.reply(`🏓 Pong! Latency is \`${client.ws.ping}ms\`.`);
  },

  async executeSlash(interaction, client) {
    await interaction.reply({ content: `🏓 Pong! Latency is \`${client.ws.ping}ms\`.`, ephemeral: true });
  },
};
```
The bot will automatically discover and load it without needing to touch `index.js`!

---

## 🛠️ Troubleshooting & Common Errors

### 1. `Error [DISALLOWED_INTENTS]: Privileged intent provided is not enabled`
- **Cause**: You didn't check the intent switches on Discord Developer Portal.
- **Fix**: Go to [Discord Developer Portal](https://discord.com/developers/applications) ➔ Select Application ➔ **Bot** ➔ Check **Presence Intent**, **Server Members Intent**, and **Message Content Intent** ➔ Save Changes.

### 2. `DiscordAPIError[50013]: Missing Permissions`
- **Cause**: The bot's role is below the user it is trying to mute/kick/ban/rename in Discord's role list.
- **Fix**: Open Discord Server Settings ➔ **Roles** ➔ Click and drag the bot's role to the very top. Also ensure the bot has `Administrator` or `Manage Roles`, `Moderate Members`, and `Manage Nicknames`.

### 3. `TypeError: Cannot read properties of undefined (reading 'token')`
- **Cause**: `.env` file is missing or not named `.env` (e.g. named `.env.txt`).
- **Fix**: Verify your `.env` is located in the root folder alongside `index.js` and contains `DISCORD_TOKEN=...`.

### 4. `Bloxlink 404: User not found`
- **Cause**: The user has not linked their Roblox account to Discord via Bloxlink.
- **Fix**: Have the user visit [blox.link](https://blox.link) and link their Roblox account.

### 5. `Error: FFmpeg not found`
- **Cause**: Voice streaming needs FFmpeg.
- **Fix**: Run `npm install ffmpeg-static` (already in `package.json`). On Linux VPS, you can also run `sudo apt install ffmpeg`.
