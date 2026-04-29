import { useNavigate } from 'react-router-dom';
import { useTenant } from '../context/TenantContext';

export default function JobCard({ profile }) {
  const navigate = useNavigate();
  const { tenantSlug } = useTenant();
  const statusClass = profile.status === 'Active' ? 'job-card__tag--active' : 'job-card__tag--inactive';

  return (
    <div className="job-card" onClick={() => navigate(`/${tenantSlug}/profile/${profile.job_profile_id}`)} tabIndex={0} role="link">
      <div className="job-card__title">{profile.job_title}</div>
      <div className="job-card__meta">
        <span className={`job-card__tag job-card__tag--dept`}>{profile.job_category}</span>
        <span className="job-card__tag">{profile.pay_grade}</span>
        <span className="job-card__tag">{profile.management_level}</span>
        <span className={`job-card__tag ${statusClass}`}>{profile.status}</span>
      </div>
      <div className="job-card__desc">{profile.job_description}</div>
      <div className="job-card__arrow">View Details →</div>
    </div>
  );
}
