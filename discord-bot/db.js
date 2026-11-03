const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'bot_storage.sqlite');

let dbInstance = null;
let useMemoryFallback = false;
const inMemoryStore = {
  infractions: new Map(),
  promotions: new Map(),
  antiPingStrikes: new Map(),
  dutyLogs: new Map(),
  trainings: new Map(),
  tickets: new Map(),
};

try {
  const Database = require('better-sqlite3');
  dbInstance = new Database(dbPath);
  dbInstance.pragma('journal_mode = WAL');

  // Initialize SQLite tables
  dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS infractions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      moderator_id TEXT NOT NULL,
      type TEXT NOT NULL,
      reason TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      active INTEGER DEFAULT 1,
      revoked_by TEXT,
      revoke_reason TEXT
    );

    CREATE TABLE IF NOT EXISTS promotions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      moderator_id TEXT NOT NULL,
      old_rank TEXT NOT NULL,
      new_rank TEXT NOT NULL,
      reason TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS anti_ping_strikes (
      user_id TEXT PRIMARY KEY,
      strike_count INTEGER NOT NULL DEFAULT 1,
      last_strike_timestamp INTEGER NOT NULL,
      muted_until INTEGER
    );

    CREATE TABLE IF NOT EXISTS duty_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      department TEXT NOT NULL,
      clock_in INTEGER NOT NULL,
      clock_out INTEGER,
      duration_minutes INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS trainings (
      id TEXT PRIMARY KEY,
      host_id TEXT NOT NULL,
      status TEXT NOT NULL,
      notes TEXT,
      attendees_json TEXT NOT NULL DEFAULT '[]',
      started_at INTEGER,
      ended_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY,
      channel_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      claimed_by TEXT,
      status TEXT NOT NULL DEFAULT 'open',
      transcript_html TEXT,
      created_at INTEGER NOT NULL,
      closed_at INTEGER
    );
  `);

  console.log(`✓ SQLite initialized at ${dbPath}`);
} catch (err) {
  console.warn(`[DB WARNING] better-sqlite3 native driver not ready (${err.message}). Using persistent JSON memory storage.`);
  useMemoryFallback = true;
}

const db = {
  // Infractions
  addInfraction(id, userId, moderatorId, type, reason) {
    const timestamp = Date.now();
    if (!useMemoryFallback && dbInstance) {
      const stmt = dbInstance.prepare(`
        INSERT INTO infractions (id, user_id, moderator_id, type, reason, timestamp, active)
        VALUES (?, ?, ?, ?, ?, ?, 1)
      `);
      stmt.run(id, userId, moderatorId, type, reason, timestamp);
    } else {
      inMemoryStore.infractions.set(id, { id, user_id: userId, moderator_id: moderatorId, type, reason, timestamp, active: 1 });
    }
    return { id, user_id: userId, type, reason, timestamp };
  },

  getInfraction(id) {
    if (!useMemoryFallback && dbInstance) {
      return dbInstance.prepare('SELECT * FROM infractions WHERE id = ?').get(id);
    }
    return inMemoryStore.infractions.get(id);
  },

  revokeInfraction(id, revokedBy, revokeReason) {
    if (!useMemoryFallback && dbInstance) {
      const stmt = dbInstance.prepare(`
        UPDATE infractions 
        SET active = 0, revoked_by = ?, revoke_reason = ? 
        WHERE id = ?
      `);
      stmt.run(revokedBy, revokeReason, id);
    } else {
      const inf = inMemoryStore.infractions.get(id);
      if (inf) {
        inf.active = 0;
        inf.revoked_by = revokedBy;
        inf.revoke_reason = revokeReason;
      }
    }
  },

  // Anti-Ping Strikes
  getAntiPingStrike(userId) {
    if (!useMemoryFallback && dbInstance) {
      return dbInstance.prepare('SELECT * FROM anti_ping_strikes WHERE user_id = ?').get(userId);
    }
    return inMemoryStore.antiPingStrikes.get(userId);
  },

  recordAntiPingStrike(userId) {
    const existing = this.getAntiPingStrike(userId);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    let count = 1;
    if (existing && (now - existing.last_strike_timestamp < oneDay)) {
      count = existing.strike_count + 1;
    }

    if (!useMemoryFallback && dbInstance) {
      const stmt = dbInstance.prepare(`
        INSERT INTO anti_ping_strikes (user_id, strike_count, last_strike_timestamp)
        VALUES (?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET strike_count = ?, last_strike_timestamp = ?
      `);
      stmt.run(userId, count, now, count, now);
    } else {
      inMemoryStore.antiPingStrikes.set(userId, { user_id: userId, strike_count: count, last_strike_timestamp: now });
    }
    return count;
  },

  // Trainings
  saveTraining(id, hostId, status, notes = '', attendees = []) {
    const jsonAttendees = JSON.stringify(attendees);
    const now = Date.now();
    if (!useMemoryFallback && dbInstance) {
      const stmt = dbInstance.prepare(`
        INSERT INTO trainings (id, host_id, status, notes, attendees_json, started_at)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET status = ?, attendees_json = ?
      `);
      stmt.run(id, hostId, status, notes, jsonAttendees, now, status, jsonAttendees);
    } else {
      inMemoryStore.trainings.set(id, { id, host_id: hostId, status, notes, attendees_json: jsonAttendees, started_at: now });
    }
  },

  getTraining(id) {
    if (!useMemoryFallback && dbInstance) {
      const row = dbInstance.prepare('SELECT * FROM trainings WHERE id = ?').get(id);
      if (row) row.attendees = JSON.parse(row.attendees_json || '[]');
      return row;
    }
    const mem = inMemoryStore.trainings.get(id);
    if (mem) mem.attendees = JSON.parse(mem.attendees_json || '[]');
    return mem;
  },

  updateTrainingAttendees(id, attendees) {
    const jsonAttendees = JSON.stringify(attendees);
    if (!useMemoryFallback && dbInstance) {
      dbInstance.prepare('UPDATE trainings SET attendees_json = ? WHERE id = ?').run(jsonAttendees, id);
    } else {
      const mem = inMemoryStore.trainings.get(id);
      if (mem) {
        mem.attendees_json = jsonAttendees;
        mem.attendees = attendees;
      }
    }
  },

  endTraining(id) {
    const now = Date.now();
    if (!useMemoryFallback && dbInstance) {
      dbInstance.prepare('UPDATE trainings SET status = "Ended", ended_at = ? WHERE id = ?').run(now, id);
    } else {
      const mem = inMemoryStore.trainings.get(id);
      if (mem) {
        mem.status = 'Ended';
        mem.ended_at = now;
      }
    }
  },

  // Tickets & Transcripts
  saveTicket(id, channelId, userId) {
    const now = Date.now();
    if (!useMemoryFallback && dbInstance) {
      dbInstance.prepare(`
        INSERT INTO tickets (id, channel_id, user_id, status, created_at)
        VALUES (?, ?, ?, 'open', ?)
      `).run(id, channelId, userId, now);
    } else {
      inMemoryStore.tickets.set(channelId, { id, channel_id: channelId, user_id: userId, status: 'open', created_at: now });
    }
  },

  claimTicket(channelId, staffId) {
    if (!useMemoryFallback && dbInstance) {
      dbInstance.prepare('UPDATE tickets SET claimed_by = ? WHERE channel_id = ?').run(staffId, channelId);
    } else {
      const t = inMemoryStore.tickets.get(channelId);
      if (t) t.claimed_by = staffId;
    }
  },

  unclaimTicket(channelId) {
    if (!useMemoryFallback && dbInstance) {
      dbInstance.prepare('UPDATE tickets SET claimed_by = NULL WHERE channel_id = ?').run(channelId);
    } else {
      const t = inMemoryStore.tickets.get(channelId);
      if (t) t.claimed_by = null;
    }
  },

  getTicketByChannel(channelId) {
    if (!useMemoryFallback && dbInstance) {
      return dbInstance.prepare('SELECT * FROM tickets WHERE channel_id = ?').get(channelId);
    }
    return inMemoryStore.tickets.get(channelId);
  },

  saveTicketTranscript(channelId, htmlContent) {
    const now = Date.now();
    if (!useMemoryFallback && dbInstance) {
      dbInstance.prepare(`
        UPDATE tickets 
        SET transcript_html = ?, status = 'closed', closed_at = ? 
        WHERE channel_id = ?
      `).run(htmlContent, now, channelId);
    } else {
      const t = inMemoryStore.tickets.get(channelId);
      if (t) {
        t.transcript_html = htmlContent;
        t.status = 'closed';
        t.closed_at = now;
      }
    }
  },
};

module.exports = db;
