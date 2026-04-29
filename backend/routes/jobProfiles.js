const express = require('express');
const { getDatabase } = require('../db/database');

const router = express.Router();

/**
 * GET /api/job-profiles
 * Returns all job profiles with optional filtering.
 *
 * Query params: keyword, category, managementLevel, payGrade, status
 *
 * TODO: Replace with Workday GET /jobProfiles API call.
 *       The response shape is already designed to match Workday's
 *       job profile object structure for seamless swap-in.
 */
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const { keyword, category, managementLevel, payGrade, status } = req.query;

    let query = 'SELECT * FROM job_profiles WHERE 1=1';
    const params = [];

    if (keyword) {
      query += ' AND (job_title LIKE ? OR job_description LIKE ?)';
      params.push(`%${keyword}%`, `%${keyword}%`);
    }
    if (category) {
      query += ' AND job_category = ?';
      params.push(category);
    }
    if (managementLevel) {
      query += ' AND management_level = ?';
      params.push(managementLevel);
    }
    if (payGrade) {
      query += ' AND pay_grade = ?';
      params.push(payGrade);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY job_title ASC';

    const rows = db.prepare(query).all(...params);
    db.close();

    // Map DB snake_case to API camelCase (mirrors Workday object shape)
    const profiles = rows.map(mapRowToProfile);
    res.json({ data: profiles, total: profiles.length });
  } catch (err) {
    console.error('Error fetching job profiles:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/job-profiles/stats
 * Returns aggregate stats for the landing page.
 */
router.get('/stats', (req, res) => {
  try {
    const db = getDatabase();
    const total = db.prepare('SELECT COUNT(*) as count FROM job_profiles').get();
    const active = db.prepare("SELECT COUNT(*) as count FROM job_profiles WHERE status = 'Active'").get();
    const departments = db.prepare('SELECT COUNT(DISTINCT job_category) as count FROM job_profiles').get();
    const categories = db.prepare('SELECT DISTINCT job_category FROM job_profiles ORDER BY job_category').all();
    const levels = db.prepare('SELECT DISTINCT management_level FROM job_profiles ORDER BY management_level').all();
    const grades = db.prepare('SELECT DISTINCT pay_grade FROM job_profiles ORDER BY pay_grade').all();
    db.close();

    res.json({
      totalProfiles: total.count,
      activeProfiles: active.count,
      totalDepartments: departments.count,
      departments: categories.map(c => c.job_category),
      managementLevels: levels.map(l => l.management_level),
      payGrades: grades.map(g => g.pay_grade)
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/job-profiles/:id
 * Returns a single job profile by jobProfileId.
 *
 * TODO: Replace with Workday GET /jobProfiles/:id API call.
 */
router.get('/:id', (req, res) => {
  try {
    const db = getDatabase();
    const row = db.prepare('SELECT * FROM job_profiles WHERE job_profile_id = ?').get(req.params.id);
    db.close();

    if (!row) {
      return res.status(404).json({ error: 'Job profile not found' });
    }

    res.json({ data: mapRowToProfile(row) });
  } catch (err) {
    console.error('Error fetching job profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/** Maps a DB row (snake_case) to the API response shape (camelCase / Workday-aligned) */
function mapRowToProfile(row) {
  return {
    jobProfileId: row.job_profile_id,
    jobTitle: row.job_title,
    jobFamily: row.job_family,
    jobCategory: row.job_category,
    managementLevel: row.management_level,
    jobDescription: row.job_description,
    qualifications: row.qualifications,
    payGrade: row.pay_grade,
    status: row.status,
    effectiveDate: row.effective_date
  };
}

module.exports = router;
