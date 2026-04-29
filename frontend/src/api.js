const API_BASE = 'http://localhost:3001/api';

// TODO: Replace these fetch calls with Workday API client when ready.
// The response shapes are already designed to match Workday job profile objects.

export async function fetchJobProfiles(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) params.append(k, v); });
  const res = await fetch(`${API_BASE}/job-profiles?${params}`);
  if (!res.ok) throw new Error('Failed to fetch job profiles');
  return res.json();
}

export async function fetchJobProfile(id) {
  const res = await fetch(`${API_BASE}/job-profiles/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Failed to fetch job profile');
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/job-profiles/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}
