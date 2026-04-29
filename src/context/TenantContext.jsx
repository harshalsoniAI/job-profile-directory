import { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrgConfig } from '../api';

const TenantContext = createContext();

export function TenantProvider({ children }) {
  const { tenantSlug } = useParams();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tenantSlug) return;
    
    setLoading(true);
    fetchOrgConfig(tenantSlug)
      .then(res => {
        setOrg(res.data);
        // Apply branding colors dynamically
        document.documentElement.style.setProperty('--navy', res.data.primary_color || '#0f2744');
        document.documentElement.style.setProperty('--teal', res.data.accent_color || '#0ea5a0');
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError('Organization not found');
      })
      .finally(() => setLoading(false));
  }, [tenantSlug]);

  const value = {
    org,
    tenantSlug,
    loading,
    error
  };

  if (loading) return <div className="loading"><div className="spinner" />Loading Configuration...</div>;
  if (error) return <div className="empty-state">{error}</div>;

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export const useTenant = () => useContext(TenantContext);
