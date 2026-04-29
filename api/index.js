const express = require("express");
const cors = require("cors");
const jobProfileRoutes = require("./routes/jobProfiles");

const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Main Job Profile routes
app.use("/", jobProfileRoutes);

module.exports = app;