const fs = require('fs');
const path = require('path');
const { EmbedBuilder, Collection } = require('discord.js');
const config = require('../../config');

function checkPermissions(member, command) {
  if (!member) return { pass: true };

  // Check Discord Permission Bits
  if (command.requiredPermissions && command.requiredPermissions.length > 0) {
    for (const perm of command.requiredPermissions) {
      if (!member.permissions.has(perm)) {
        return { pass: false, reason: `You lack the required Discord permission: \`${perm}\`.` };
      }
    }
  }

  // Check Role-Based Access Control
  if (command.requiredRoles && command.requiredRoles.length > 0) {
    const hasRole = command.requiredRoles.some(roleKey => {
      const roleId = config.ROLES[roleKey];
      return roleId && member.roles.cache.has(roleId);
    });
    // Server administrators always bypass role requirements
    if (!hasRole && !member.permissions.has('Administrator')) {
      return { pass: false, reason: `This command requires one of the following roles: ${command.requiredRoles.join(', ')}.` };
    }
  }

  return { pass: true };
}

function loadCommands(client) {
  const commandsDir = path.join(__dirname, '..', 'commands');
  if (!fs.existsSync(commandsDir)) {
    console.warn(`[COMMANDS] Directory ${commandsDir} not found.`);
    return;
  }

  const categories = fs.readdirSync(commandsDir);
  let totalLoaded = 0;

  for (const category of categories) {
    const categoryPath = path.join(commandsDir, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(categoryPath, file);
      try {
        delete require.cache[require.resolve(filePath)];
        const command = require(filePath);

        if (command && command.name) {
          command.category = category;
          client.commands.set(command.name.toLowerCase(), command);

          // Register aliases
          if (Array.isArray(command.aliases)) {
            for (const alias of command.aliases) {
              client.aliases.set(alias.toLowerCase(), command.name.toLowerCase());
            }
          }

          // Register for slash if slashData is provided
          if (command.slashData) {
            client.slashCommands.set(command.name.toLowerCase(), command);
          }

          totalLoaded++;
        }
      } catch (err) {
        console.error(`💥 Failed to load command ${file} from ${category}:`, err);
      }
    }
  }

  console.log(`✓ Loaded ${totalLoaded} command modules across ${categories.length} categories.`);
}

async function handlePrefixMessage(message, client) {
  if (message.author.bot || !message.guild) return;

  const prefix = config.PREFIX || '!';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!commandName) return;

  // Resolve alias or command name
  const resolvedName = client.aliases.get(commandName) || commandName;
  const command = client.commands.get(resolvedName);
  if (!command) return;

  // Permission Verification
  const permCheck = checkPermissions(message.member, command);
  if (!permCheck.pass) {
    const errEmbed = new EmbedBuilder()
      .setColor('#ef4444')
      .setTitle('❌ Permission Denied')
      .setDescription(permCheck.reason)
      .setFooter({ text: 'Los Angeles Roleplay Access Control' })
      .setTimestamp();
    return message.reply({ embeds: [errEmbed] });
  }

  // Cooldown Protection
  if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
      return message.reply(`⏳ Please wait **${timeLeft}s** before reusing \`${config.PREFIX}${command.name}\`.`);
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  // Isolated Execution Block
  try {
    if (typeof command.executePrefix === 'function') {
      await command.executePrefix(message, args, client);
    } else {
      await message.reply(`⚠️ Command \`${command.name}\` does not support prefix execution. Use \`/${command.name}\`.`);
    }
  } catch (err) {
    console.error(`💥 [ERROR] Prefix command ${command.name} threw:`, err);
    const errorEmbed = new EmbedBuilder()
      .setColor('#ef4444')
      .setTitle('💥 Execution Failure')
      .setDescription(`An unexpected error occurred while executing \`${prefix}${command.name}\`.\n\`\`\`${err.message || 'Unknown Error'}\`\`\``)
      .setFooter({ text: `File: src/commands/${command.category}/${command.name}.js` })
      .setTimestamp();

    await message.reply({ embeds: [errorEmbed] }).catch(() => {});
  }
}

module.exports = {
  loadCommands,
  handlePrefixMessage,
  checkPermissions,
};
