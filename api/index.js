import express from 'express';
import cors from 'cors';
import jobProfileRoutes from './routes/jobProfiles.js';

const app = express();

app.use(cors());
app.use(express.json());

// Log requests to help debug Vercel routing
app.use((req, res, next) => {
  console.log(`API Request: ${req.method} ${req.url}`);
  next();
});

// Mount at root because Vercel api/index.js already handles the /api prefix
app.use('/', jobProfileRoutes);

// Health check (now handles both /api/health and /api/api/health)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), message: 'Malgudi API is active' });
});

export default app;