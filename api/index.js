export default function handler(req, res) {
  if (req.url === "/api/health" || req.url === "/health") {
    return res.status(200).json({ status: "ok" });
  }

  return res.status(404).json({ error: "Not found" });
}