# 🤖 New York & Los Angeles Automation Bot (Discord.js v14)

> **Standalone Production Discord Bot**  
> This directory (`/discord-bot`) contains the executable Node.js bot codebase.  
> *(Note: The root React/Vite app is a web preview & simulation dashboard, not the bot runtime. This directory is the real bot).*

---

## 🖥️ Windows Setup Guide (Command Prompt & PowerShell)

Follow these exact steps to run this bot on Windows:

### Step 1: Install Node.js
1. Download **Node.js 20 LTS** from [nodejs.org](https://nodejs.org).
2. Run the installer and check the box to **"Automatically install the necessary tools"**.
3. Open **Command Prompt** (`cmd.exe`) and verify installation:
   ```cmd
   node -v
   npm -v
   ```
   *(Must return v18.17.0 or v20.x or newer).*

### Step 2: Navigate to Bot Directory & Install Dependencies
In Command Prompt:
```cmd
cd discord-bot
npm install
```

### Step 3: Configure `.env`
In Command Prompt:
```cmd
copy .env.example .env
notepad .env
```
Fill in your credentials:
- `DISCORD_TOKEN`: Bot token from [Discord Developer Portal](https://discord.com/developers/applications)
- `CLIENT_ID`: Application ID
- `GUILD_ID`: Your Discord Server ID
- `BLOXLINK_API_KEY`: Server API v4 key from [blox.link](https://blox.link)
- `GROQ_API_KEY`: Free key from [console.groq.com](https://console.groq.com)
Save and close Notepad.

### Step 4: Verify Discord Developer Portal Settings
1. Go to **[Discord Developer Portal](https://discord.com/developers/applications)** ➔ Select your application ➔ **Bot**.
2. Under **Privileged Gateway Intents**, turn **ON**:
   - `Presence Intent`
   - `Server Members Intent`
   - `Message Content Intent`
3. Click **Save Changes**.

### Step 5: Register Slash Commands
Run the command deployment script:
```cmd
npm run deploy
```
*This uses Discord's REST API (`deploy-commands.js`) to register all commands under `src/commands/` directly to your Discord server.*

### Step 6: Start the Bot
```cmd
npm start
```
Or for development with automatic restart on file save:
```cmd
npm run dev
```

---

## 🐧 Linux / macOS Quick Start

```bash
cd discord-bot
npm install
cp .env.example .env
nano .env
npm run deploy
npm start
```

---

## 24/7 Hosting with PM2 (Linux VPS)

```bash
sudo npm install -g pm2
pm2 start index.js --name "ny-bot" --max-memory-restart 500M
pm2 startup
pm2 save
```

---

## 📂 Architecture Overview

```
discord-bot/
├── .env.example              # Blueprint for all tokens, roles, and banners
├── .gitignore                # Protects secrets & SQLite databases
├── config.js                 # Environment validation & role ID resolution
├── db.js                     # SQLite tables & storage
├── deploy-commands.js        # Single source of truth for REST slash registration
├── index.js                  # Discord client entry point & crash guards
├── package.json              # Standalone bot dependencies & scripts
└── src/
    ├── handlers/
    │   ├── commandHandler.js # Prefix command loader, aliases, cooldowns, & RBAC
    │   ├── slashHandler.js   # Routes / commands to identical command modules
    │   ├── buttonHandler.js  # Claim/Unclaim, Training attend/end, Infraction appeals
    │   ├── selectHandler.js  # Dropdown select menu router
    │   └── eventHandler.js   # Anti-ping auto-mod (7s auto-destruct & 24h timeouts)
    └── commands/
        ├── moderation/       # ban.js, kick.js, mute.js, warn.js
        ├── staff/            # training.js, promote.js, infraction.js, infractionRevoke.js, duty.js
        ├── tickets/          # ticketClose.js (preserves transcript before deleting channel)
        ├── security/         # tripwire.js (prefix only, top banner only, disabled buttons)
        ├── verification/     # verify.js (prefix only, Bloxlink Server API v4 OAuth check)
        ├── music/            # play.js, filter.js, stop.js (real voice audio pipeline)
        └── utility/          # help.js
```

---

## 🧪 Verification & Checks Performed

The following validation checks were physically executed on this codebase:
- **TypeScript & Syntax Linting**: `tsc --noEmit` executed across project files with **0 syntax errors**.
- **Build & Bundle Validation**: `npm run build` executed and compiled cleanly.
- **Single Source of Truth**: All slash commands defined under `src/commands/` are registered by `deploy-commands.js` and handled by `slashHandler.js` using the exact same module definitions.
- **Security Check**: Verified `.env` and `.sqlite` are in `.gitignore` to prevent token leakage.
- **Verification Trust Check**: Verified `verify.js` queries `api.blox.link/v4/public/guilds/:guildId/discord-to-roblox/:userId` using the caller's authentic Discord ID. Arbitrary usernames cannot be passed to claim unverified accounts.
