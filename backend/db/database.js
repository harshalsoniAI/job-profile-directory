const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'job_profiles.db');

function getDatabase() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS job_profiles (
      id                INTEGER PRIMARY KEY AUTOINCREMENT,
      job_profile_id    TEXT UNIQUE NOT NULL,
      job_title         TEXT NOT NULL,
      job_family        TEXT,
      job_category      TEXT,
      management_level  TEXT,
      job_description   TEXT,
      qualifications    TEXT,
      pay_grade         TEXT,
      status            TEXT DEFAULT 'Active',
      effective_date    TEXT,
      created_at        TEXT DEFAULT (datetime('now')),
      updated_at        TEXT DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_job_title ON job_profiles(job_title);
    CREATE INDEX IF NOT EXISTS idx_job_category ON job_profiles(job_category);
    CREATE INDEX IF NOT EXISTS idx_management_level ON job_profiles(management_level);
    CREATE INDEX IF NOT EXISTS idx_pay_grade ON job_profiles(pay_grade);
    CREATE INDEX IF NOT EXISTS idx_status ON job_profiles(status);
  `);

  return db;
}

module.exports = { getDatabase };
