import { getAdminClient, readAppToken, sendJson, withMethod } from "../_lib/supabase.js";

export default async function handler(req, res) {
  if (!withMethod(req, res, ["GET", "PUT"])) return;
  try {
    const auth = readAppToken(req);
    if (!auth) return sendJson(res, 401, { error: "Unauthorized." });
    const userId = Number(req.query.userId);
    if (!userId) return sendJson(res, 400, { error: "Invalid userId." });
    if (auth.role !== "admin" && auth.sub !== userId) return sendJson(res, 403, { error: "Forbidden." });
    const supabase = getAdminClient();
    const { data: user } = await supabase.from("users").select("team_name").eq("id", userId).maybeSingle();
    const teamName = user?.team_name;
    const getTeamProgress = async () => {
      const { data: members } = await supabase.from("users").select("id").eq("team_name", teamName);
      const memberIds = (members || []).map(m => m.id);
      const { data: rows } = await supabase.from("user_progress").select("progress").in("user_id", memberIds);
      const merged = {};
      for (const row of (rows || [])) {
        for (const [key, val] of Object.entries(row.progress || {})) {
          if (val === true) merged[key] = true;
        }
      }
      return merged;
    };
    if (req.method === "GET") {
      if (teamName) return sendJson(res, 200, { progress: await getTeamProgress() });
      const { data, error } = await supabase.from("user_progress").select("progress").eq("user_id", userId).maybeSingle();
      if (error) return sendJson(res, 500, { error: error.message });
      return sendJson(res, 200, { progress: data?.progress || {} });
    }
    const { progress } = req.body || {};
    if (!progress || typeof progress !== "object") return sendJson(res, 400, { error: "progress object is required." });
    const { error: upsertErr } = await supabase.from("user_progress").upsert({ user_id: userId, progress }, { onConflict: "user_id" });
    if (upsertErr) return sendJson(res, 500, { error: upsertErr.message });
    if (teamName) return sendJson(res, 200, { progress: await getTeamProgress() });
    const { data: saved } = await supabase.from("user_progress").select("progress").eq("user_id", userId).maybeSingle();
    return sendJson(res, 200, { progress: saved?.progress || {} });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Failed to manage progress." });
  }
}
