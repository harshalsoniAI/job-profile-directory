const API_BASE = 'http://localhost:3001/api';

export async function fetchOrgConfig(slug) {
  const res = await fetch(`${API_BASE}/${slug}/config`);
  if (!res.ok) throw new Error('Organization not found');
  return res.json();
}

export async function fetchJobProfiles(slug, filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, v); });
  const res = await fetch(`${API_BASE}/${slug}/job-profiles?${params}`);
  if (!res.ok) throw new Error('Failed to fetch job profiles');
  return res.json();
}

export async function fetchJobProfile(slug, id) {
  const res = await fetch(`${API_BASE}/${slug}/job-profiles/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Failed to fetch job profile');
  return res.json();
}

export async function fetchStats(slug) {
  const res = await fetch(`${API_BASE}/${slug}/job-profiles/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}
