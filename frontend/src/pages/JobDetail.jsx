import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobProfile } from '../api';

export default function JobDetail() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchJobProfile(id)
      .then(res => setProfile(res.data))
      .catch(() => setError('Job profile not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading"><div className="spinner" />Loading…</div>;
  if (error) return <div className="empty-state">{error}<br /><Link to="/search" className="detail-back" style={{ marginTop: '1rem', display: 'inline-flex' }}>← Back to Directory</Link></div>;

  const statusClass = profile.status === 'Active' ? 'detail-header__status--active' : 'detail-header__status--inactive';

  return (
    <div className="detail-page">
      <Link to="/search" className="detail-back">← Back to Directory</Link>

      <div className="detail-header">
        <span className={`detail-header__status ${statusClass}`}>{profile.status}</span>
        <h1>{profile.jobTitle}</h1>
        <div className="detail-meta-grid">
          <div className="detail-meta-item">
            <div className="detail-meta-item__label">Job Profile ID</div>
            <div className="detail-meta-item__value">{profile.jobProfileId}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-item__label">Department</div>
            <div className="detail-meta-item__value">{profile.jobCategory}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-item__label">Job Family</div>
            <div className="detail-meta-item__value">{profile.jobFamily}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-item__label">Management Level</div>
            <div className="detail-meta-item__value">{profile.managementLevel}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-item__label">Pay Grade</div>
            <div className="detail-meta-item__value">{profile.payGrade}</div>
          </div>
          <div className="detail-meta-item">
            <div className="detail-meta-item__label">Effective Date</div>
            <div className="detail-meta-item__value">{new Date(profile.effectiveDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h2>Job Description</h2>
        <p>{profile.jobDescription}</p>
      </div>

      <div className="detail-section">
        <h2>Qualifications &amp; Requirements</h2>
        <p>{profile.qualifications}</p>
      </div>
    </div>
  );
}
