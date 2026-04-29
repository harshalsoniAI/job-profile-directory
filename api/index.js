const express = require('express');
const cors = require('cors');
const jobProfileRoutes = require('./routes/jobProfiles'); // Correct path: routes are in the same folder

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTANT: remove /api prefix for Vercel
app.use('/', jobProfileRoutes);

// health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = app;
