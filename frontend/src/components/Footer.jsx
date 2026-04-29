import { useTenant } from '../context/TenantContext';

export default function Footer() {
  const { org } = useTenant();
  
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {org?.name || 'City of Malgudi'} — Job Profile Directory</p>
      <p style={{ marginTop: '0.25rem' }}>
        Powered by <a href="#">Municipal HR Services</a> · All rights reserved
      </p>
    </footer>
  );
}
