import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import JobDetail from './pages/JobDetail';
import Directory from './pages/Directory';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
