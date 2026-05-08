import { getAdminClient, readAppToken, sendJson, withMethod } from "./_lib/supabase.js";

export default async function handler(req, res) {
  if (!withMethod(req, res, ["GET"])) return;

  try {
    const auth = readAppToken(req);
    if (!auth) return sendJson(res, 401, { error: "Unauthorized." });

    const supabase = getAdminClient();
    const q = await supabase
      .from("users")
      .select("id, username, role, name, team_name, phone, university")
      .eq("id", auth.sub)
      .maybeSingle();

    if (q.error) return sendJson(res, 500, { error: q.error.message });
    if (!q.data) return sendJson(res, 404, { error: "User not found." });

    return sendJson(res, 200, { user: q.data });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Failed to load user." });
  }
}

