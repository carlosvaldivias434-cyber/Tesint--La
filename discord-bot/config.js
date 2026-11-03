const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const config = {
  // Credentials
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || '',
  CLIENT_ID: process.env.CLIENT_ID || '',
  GUILD_ID: process.env.GUILD_ID || '',
  PREFIX: process.env.PREFIX || '!',

  // External APIs
  BLOXLINK_API_KEY: process.env.BLOXLINK_API_KEY || '',
  BLOXLINK_GUILD_ID: process.env.BLOXLINK_GUILD_ID || process.env.GUILD_ID || '',
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  GROQ_MODEL: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
  SAPLING_API_KEY: process.env.SAPLING_API_KEY || '',

  // Role IDs
  ROLES: {
    FOUNDER: process.env.FOUNDER_ROLE_ID || '1140027663457816641',
    DIRECTIVE: process.env.DIRECTIVE_ROLE_ID || '1140027663457816642',
    MANAGEMENT: process.env.MANAGEMENT_ROLE_ID || '1140027663457816643',
    INTERNAL_AFFAIRS: process.env.INTERNAL_AFFAIRS_ROLE_ID || '1140027663457816644',
    SENIOR_STAFF: process.env.SENIOR_STAFF_ROLE_ID || '1140027663457816645',
    STAFF: process.env.STAFF_ROLE_ID || '1140027663457816646',
    TRAINEE: process.env.TRAINEE_ROLE_ID || '1140027663457816647',
    VERIFIED: process.env.VERIFIED_ROLE_ID || '1140027663457816648',
    DJ: process.env.DJ_ROLE_ID || '1140027663457816649',
  },

  // Channel IDs
  CHANNELS: {
    LOGS: process.env.LOGS_CHANNEL_ID || '1140027663457816650',
    MOD_LOGS: process.env.MOD_LOGS_CHANNEL_ID || '1140027663457816651',
    TRANSCRIPTS: process.env.TRANSCRIPTS_CHANNEL_ID || '1140027663457816652',
    APPLICATION_REVIEWS: process.env.APPLICATION_REVIEWS_CHANNEL_ID || '1140027663457816653',
    SUPPORT: process.env.SUPPORT_CHANNEL_ID || '1140027663457816654',
    TRIPWIRE: process.env.TRIPWIRE_CHANNEL_ID || '1140027663457816655',
    TRAINING_ANNOUNCEMENTS: process.env.TRAINING_ANNOUNCEMENTS_CHANNEL_ID || '1140027663457816656',
    TRAINING_LOGS: process.env.TRAINING_LOGS_CHANNEL_ID || '1140027663457816657',
    PROMOTIONS: process.env.PROMOTIONS_CHANNEL_ID || '1140027663457816658',
    INFRACTIONS: process.env.INFRACTIONS_CHANNEL_ID || '1140027663457816659',
  },

  // Banner Assets
  BANNERS: {
    PROMOTIONS_TOP: process.env.PROMOTIONS_TOP_BANNER || 'https://i.imgur.com/example_promotions_top.png',
    PROMOTIONS_BOTTOM: process.env.PROMOTIONS_BOTTOM_BANNER || 'https://i.imgur.com/example_bottom_strip.png',
    INFRACTIONS_TOP: process.env.INFRACTIONS_TOP_BANNER || 'https://i.imgur.com/example_infractions_top.png',
    INFRACTIONS_BOTTOM: process.env.INFRACTIONS_BOTTOM_BANNER || 'https://i.imgur.com/example_bottom_strip.png',
    TRAINING_TOP: process.env.TRAINING_TOP_BANNER || 'https://i.imgur.com/example_training_top.png',
    TRAINING_BOTTOM: process.env.TRAINING_BOTTOM_BANNER || 'https://i.imgur.com/example_bottom_strip.png',
    TRIPWIRE_TOP: process.env.TRIPWIRE_TOP_BANNER || 'https://i.imgur.com/example_tripwire_top.png',
    // Strictly TOP BANNER ONLY for tripwire
    TRIPWIRE_BOTTOM: null,
  },

  // Self-validation
  validate() {
    const missing = [];
    if (!this.DISCORD_TOKEN) missing.push('DISCORD_TOKEN');
    if (!this.CLIENT_ID) missing.push('CLIENT_ID');
    if (!this.GUILD_ID) missing.push('GUILD_ID');
    return {
      isValid: missing.length === 0,
      missing,
    };
  },
};

module.exports = Object.freeze(config);
