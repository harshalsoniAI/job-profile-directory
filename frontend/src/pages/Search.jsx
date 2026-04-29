import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchJobProfiles, fetchStats } from '../api';
import JobCard from '../components/JobCard';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profiles, setProfiles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    keyword: searchParams.get('keyword') || '',
    category: searchParams.get('category') || '',
    managementLevel: '',
    payGrade: '',
    status: '',
  });

  useEffect(() => { fetchStats().then(setStats); }, []);

  useEffect(() => {
    setLoading(true);
    fetchJobProfiles(filters)
      .then(res => setProfiles(res.data))
      .finally(() => setLoading(false));
  }, [filters]);

  // Sync URL params on mount
  useEffect(() => {
    const kw = searchParams.get('keyword');
    const cat = searchParams.get('category');
    if (kw || cat) {
      setFilters(f => ({ ...f, keyword: kw || '', category: cat || '' }));
    }
  }, []);

  const updateFilter = (key, value) => {
    setFilters(f => ({ ...f, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ keyword: '', category: '', managementLevel: '', payGrade: '', status: '' });
    setSearchParams({});
  };

  return (
    <div className="section">
      <div className="section__title">Search Job Profiles</div>
      <div className="section__subtitle">Use filters to find specific positions</div>

      <div className="filter-bar">
        <div className="filter-group" style={{ flex: 2 }}>
          <label htmlFor="filter-keyword">Keyword</label>
          <input
            id="filter-keyword"
            type="text"
            placeholder="Search by title or description…"
            value={filters.keyword}
            onChange={e => updateFilter('keyword', e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filter-dept">Department</label>
          <select id="filter-dept" value={filters.category} onChange={e => updateFilter('category', e.target.value)}>
            <option value="">All Departments</option>
            {stats?.departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-level">Management Level</label>
          <select id="filter-level" value={filters.managementLevel} onChange={e => updateFilter('managementLevel', e.target.value)}>
            <option value="">All Levels</option>
            {stats?.managementLevels.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-grade">Pay Grade</label>
          <select id="filter-grade" value={filters.payGrade} onChange={e => updateFilter('payGrade', e.target.value)}>
            <option value="">All Grades</option>
            {stats?.payGrades.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-status">Status</label>
          <select id="filter-status" value={filters.status} onChange={e => updateFilter('status', e.target.value)}>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button className="filter-bar__btn filter-bar__btn--clear" onClick={clearFilters}>Clear</button>
      </div>

      <div className="results-count">
        {loading ? 'Searching…' : `${profiles.length} job profile${profiles.length !== 1 ? 's' : ''} found`}
      </div>

      {loading ? (
        <div className="loading"><div className="spinner" />Loading…</div>
      ) : profiles.length === 0 ? (
        <div className="empty-state">No job profiles match your filters. Try broadening your search.</div>
      ) : (
        <div className="job-cards">
          {profiles.map(p => <JobCard key={p.jobProfileId} profile={p} />)}
        </div>
      )}
    </div>
  );
}
