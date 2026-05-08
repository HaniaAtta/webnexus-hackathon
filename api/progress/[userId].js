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

    if (req.method === "GET") {
      const q = await supabase
        .from("user_progress")
        .select("progress")
        .eq("user_id", userId)
        .maybeSingle();
      if (q.error) return sendJson(res, 500, { error: q.error.message });
      return sendJson(res, 200, { progress: q.data?.progress || {} });
    }

    const { progress } = req.body || {};
    if (!progress || typeof progress !== "object") {
      return sendJson(res, 400, { error: "progress object is required." });
    }

    const up = await supabase
      .from("user_progress")
      .upsert({ user_id: userId, progress }, { onConflict: "user_id" })
      .select("progress")
      .single();

    if (up.error) return sendJson(res, 500, { error: up.error.message });
    return sendJson(res, 200, { progress: up.data.progress });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Failed to manage progress." });
  }
}
