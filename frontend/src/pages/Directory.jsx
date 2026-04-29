import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchJobProfiles } from '../api';
import { useTenant } from '../context/TenantContext';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function Directory() {
  const { tenantSlug } = useTenant();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLetter, setActiveLetter] = useState(null);
  const navigate = useNavigate();
  const letterRefs = useRef({});

  useEffect(() => {
    fetchJobProfiles(tenantSlug)
      .then(res => setProfiles(res.data))
      .finally(() => setLoading(false));
  }, [tenantSlug]);

  // Group by first letter
  const grouped = {};
  profiles.forEach(p => {
    const letter = p.job_title[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(p);
  });
  const activeLetters = new Set(Object.keys(grouped));

  const scrollToLetter = (letter) => {
    setActiveLetter(letter);
    letterRefs.current[letter]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) return <div className="loading"><div className="spinner" />Loading…</div>;

  return (
    <div className="section">
      <div className="section__title">A–Z Job Profile Directory</div>
      <div className="section__subtitle">Browse all {profiles.length} job profiles alphabetically</div>

      <div className="az-nav">
        {LETTERS.map(l => (
          <button
            key={l}
            className={activeLetter === l ? 'active' : ''}
            disabled={!activeLetters.has(l)}
            onClick={() => scrollToLetter(l)}
          >
            {l}
          </button>
        ))}
      </div>

      {LETTERS.filter(l => grouped[l]).map(letter => (
        <div key={letter} className="letter-group" ref={el => (letterRefs.current[letter] = el)}>
          <div className="letter-group__heading">{letter}</div>
          <div className="letter-group__list">
            {grouped[letter].map(p => (
              <div
                key={p.id}
                className="letter-group__item"
                onClick={() => navigate(`/${tenantSlug}/profile/${p.job_profile_id}`)}
                tabIndex={0}
                role="link"
              >
                <div>
                  <div className="letter-group__item-title">{p.job_title}</div>
                  <div className="letter-group__item-dept">{p.job_category} · {p.pay_grade}</div>
                </div>
                <span style={{ color: 'var(--teal)', fontWeight: 600, fontSize: '0.8rem' }}>→</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
