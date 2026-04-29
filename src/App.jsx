import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TenantProvider } from './context/TenantContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import JobDetail from './pages/JobDetail';
import Directory from './pages/Directory';
import './index.css';

function AppContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:id" element={<JobDetail />} />
          <Route path="/directory" element={<Directory />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to a default tenant for demo purposes */}
        <Route path="/" element={<Navigate to="/malgudi" replace />} />
        
        {/* Multi-tenant Route Structure */}
        <Route path="/:tenantSlug/*" element={
          <TenantProvider>
            <AppContent />
          </TenantProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}
