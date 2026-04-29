import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Search' },
    { to: '/directory', label: 'A–Z Directory' },
  ];

  return (
    <nav className={`navbar${open ? ' open' : ''}`}>
      <Link to="/" className="navbar__logo">
        <span className="navbar__logo-icon">JP</span>
        Job Profile Directory
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
