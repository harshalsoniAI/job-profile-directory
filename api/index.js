import express from 'express';
import cors from 'cors';
import jobProfileRoutes from './routes/jobProfiles.js';

const app = express();

app.use(cors());
app.use(express.json());

// Main Job Profile routes (mounted at /api)
app.use('/api', jobProfileRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;