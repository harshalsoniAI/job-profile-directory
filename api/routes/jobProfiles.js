import express from 'express';
import { supabase } from '../db/database.js';

const router = express.Router();

/**
 * Middleware to fetch organization ID based on slug
 */
const getOrg = async (req, res, next) => {
  const { orgSlug } = req.params;
  const { data: org, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('slug', orgSlug)
    .single();

  if (error || !org) {
    return res.status(404).json({ error: 'Organization not found' });
  }

  req.org = org;
  next();
};

/**
 * GET /:orgSlug/config
 */
router.get('/:orgSlug/config', getOrg, (req, res) => {
  res.json({ data: req.org });
});

/**
 * GET /:orgSlug/job-profiles
 */
router.get('/:orgSlug/job-profiles', getOrg, async (req, res) => {
  try {
    const { keyword, category, managementLevel, payGrade, status } = req.query;

    let query = supabase
      .from('job_profiles')
      .select('*')
      .eq('organization_id', req.org.id);

    if (keyword) query = query.or(`job_title.ilike.%${keyword}%,job_description.ilike.%${keyword}%`);
    if (category) query = query.eq('job_category', category);
    if (managementLevel) query = query.eq('management_level', managementLevel);
    if (payGrade) query = query.eq('pay_grade', payGrade);
    if (status) query = query.eq('status', status);

    const { data: profiles, error } = await query.order('job_title', { ascending: true });

    if (error) throw error;

    res.json({ data: profiles, total: profiles.length });
  } catch (err) {
    console.error('Error fetching job profiles:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /:orgSlug/job-profiles/stats
 */
router.get('/:orgSlug/job-profiles/stats', getOrg, async (req, res) => {
  try {
    const orgId = req.org.id;

    const [totalRes, activeRes, deptsRes, levelsRes, gradesRes] = await Promise.all([
      supabase.from('job_profiles').select('*', { count: 'exact', head: true }).eq('organization_id', orgId),
      supabase.from('job_profiles').select('*', { count: 'exact', head: true }).eq('organization_id', orgId).eq('status', 'Active'),
      supabase.from('job_profiles').select('job_category').eq('organization_id', orgId),
      supabase.from('job_profiles').select('management_level').eq('organization_id', orgId),
      supabase.from('job_profiles').select('pay_grade').eq('organization_id', orgId)
    ]);

    const departments = [...new Set(deptsRes.data.map(d => d.job_category))].sort();
    const managementLevels = [...new Set(levelsRes.data.map(l => l.management_level))].sort();
    const payGrades = [...new Set(gradesRes.data.map(g => g.pay_grade))].sort();

    res.json({
      totalProfiles: totalRes.count,
      activeProfiles: activeRes.count,
      totalDepartments: departments.length,
      departments,
      managementLevels,
      payGrades
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /:orgSlug/job-profiles/:id
 */
router.get('/:orgSlug/job-profiles/:id', getOrg, async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('job_profiles')
      .select('*')
      .eq('organization_id', req.org.id)
      .eq('job_profile_id', req.params.id)
      .single();

    if (error || !profile) {
      return res.status(404).json({ error: 'Job profile not found' });
    }

    res.json({ data: profile });
  } catch (err) {
    console.error('Error fetching job profile:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
