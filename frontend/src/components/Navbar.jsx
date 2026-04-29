import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTenant } from '../context/TenantContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { org, tenantSlug } = useTenant();

  const links = [
    { to: `/${tenantSlug}`, label: 'Home' },
    { to: `/${tenantSlug}/search`, label: 'Search' },
    { to: `/${tenantSlug}/directory`, label: 'A–Z Directory' },
  ];

  return (
    <nav className={`navbar${open ? ' open' : ''}`}>
      <Link to={`/${tenantSlug}`} className="navbar__logo">
        <span className="navbar__logo-icon">
          {org?.logo_url ? <img src={org.logo_url} alt="Logo" /> : 'JP'}
        </span>
        {org?.name || 'Job Profile Directory'}
      </Link>
      <div className="navbar__links">
        {links.map(l => (
          <Link
            key={l.to}
            to={l.to}
            className={pathname === l.to ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <button className="navbar__mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? '✕' : '☰'}
      </button>
    </nav>
  );
}
