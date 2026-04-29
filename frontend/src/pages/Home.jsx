import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStats, fetchJobProfiles } from '../api';

const DEPT_ICONS = {
  'Public Works': '🏗️',
  'Finance': '💰',
  'Information Technology': '💻',
  'Parks & Recreation': '🌳',
  'Human Resources': '👥',
};

export default function Home() {
  const [stats, setStats] = useState(null);
  const [deptCounts, setDeptCounts] = useState({});
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats().then(setStats);
    fetchJobProfiles().then(res => {
      const counts = {};
      res.data.forEach(p => { counts[p.jobCategory] = (counts[p.jobCategory] || 0) + 1; });
      setDeptCounts(counts);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  if (!stats) return <div className="loading"><div className="spinner" />Loading…</div>;

  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <div className="hero__badge">📋 Public Directory</div>
          <h1>City of Malgudi<br />Job Profile Directory</h1>
          <p>
            Browse all job classifications within our organization.
            Find detailed descriptions, qualifications, and pay information
            for every position in our workforce.
          </p>
          <form onSubmit={handleSearch}>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search job titles… (e.g. Engineer, Analyst)"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                id="hero-search"
              />
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
      </section>

      <section className="stats-strip">
        <div className="stat-item">
          <div className="stat-item__number">{stats.totalProfiles}</div>
          <div className="stat-item__label">Job Profiles</div>
        </div>
        <div className="stat-item">
          <div className="stat-item__number">{stats.totalDepartments}</div>
          <div className="stat-item__label">Departments</div>
        </div>
        <div className="stat-item">
          <div className="stat-item__number">{stats.activeProfiles}</div>
          <div className="stat-item__label">Active Positions</div>
        </div>
      </section>

      <section className="section">
        <div className="section__title">Browse by Department</div>
        <div className="section__subtitle">Select a department to see all related job profiles</div>
        <div className="dept-grid">
          {stats.departments.map(dept => (
            <div
              key={dept}
              className="dept-card"
              onClick={() => navigate(`/search?category=${encodeURIComponent(dept)}`)}
            >
              <div className="dept-card__icon">{DEPT_ICONS[dept] || '📂'}</div>
              <div>
                <div className="dept-card__name">{dept}</div>
                <div className="dept-card__count">{deptCounts[dept] || 0} profiles</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
