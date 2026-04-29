import { useNavigate } from 'react-router-dom';

export default function JobCard({ profile }) {
  const navigate = useNavigate();
  const statusClass = profile.status === 'Active' ? 'job-card__tag--active' : 'job-card__tag--inactive';

  return (
    <div className="job-card" onClick={() => navigate(`/profile/${profile.jobProfileId}`)} tabIndex={0} role="link">
      <div className="job-card__title">{profile.jobTitle}</div>
      <div className="job-card__meta">
        <span className={`job-card__tag job-card__tag--dept`}>{profile.jobCategory}</span>
        <span className="job-card__tag">{profile.payGrade}</span>
        <span className="job-card__tag">{profile.managementLevel}</span>
        <span className={`job-card__tag ${statusClass}`}>{profile.status}</span>
      </div>
      <div className="job-card__desc">{profile.jobDescription}</div>
      <div className="job-card__arrow">View Details →</div>
    </div>
  );
}
