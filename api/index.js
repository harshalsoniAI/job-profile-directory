const express = require("express");
const cors = require("cors");
const jobProfileRoutes = require("../backend/routes/jobProfiles");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/", jobProfileRoutes);

module.exports = app;