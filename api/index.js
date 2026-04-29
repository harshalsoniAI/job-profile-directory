import { supabase } from "./db/database.js";

export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname.split("/").filter(Boolean);

  // Health
  if (url.pathname === "/api/health") {
    return res.status(200).json({ status: "ok" });
  }

  // /api/:tenantSlug/config
  if (parts.length === 3 && parts[0] === "api" && parts[2] === "config") {
    const tenantSlug = parts[1];

    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .eq("slug", tenantSlug)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Organization not found" });
    }

    return res.status(200).json(data);
  }

  return res.status(404).json({ error: "Not found" });
}