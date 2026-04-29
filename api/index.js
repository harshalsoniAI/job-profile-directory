const express = require('express');
const cors = require('cors');
const jobProfileRoutes = require('./routes/jobProfiles');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// TODO: When Workday integration is ready, add a middleware layer here
//       that can toggle between local DB and Workday API data sources.
app.use('/api', jobProfileRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Job Profile Directory API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
