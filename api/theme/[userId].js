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

    const userQ = await supabase
      .from("users")
      .select("team_name")
      .eq("id", userId)
      .maybeSingle();
    if (userQ.error) return sendJson(res, 500, { error: userQ.error.message });
    const teamName = userQ.data?.team_name || null;
    if (!teamName) return sendJson(res, 400, { error: "User has no team assigned." });

    if (req.method === "GET") {
      const q = await supabase
        .from("team_state")
        .select("theme_id, theme_confirmed, timer_start")
        .eq("team_name", teamName)
        .maybeSingle();
      if (q.error) return sendJson(res, 500, { error: q.error.message });
      return sendJson(res, 200, {
        teamName,
        themeId: q.data?.theme_id ?? null,
        themeConfirmed: !!q.data?.theme_confirmed,
        timerStart: q.data?.timer_start ?? null,
      });
    }

    const { themeId, themeConfirmed = true } = req.body || {};
    if (!themeId) return sendJson(res, 400, { error: "themeId is required." });

    const up = await supabase
      .from("team_state")
      .upsert(
        {
          team_name: teamName,
          theme_id: themeId,
          theme_confirmed: !!themeConfirmed,
          timer_start: new Date().toISOString()
        },
        { onConflict: "team_name" }
      )
      .select("theme_id, theme_confirmed")
      .single();

    if (up.error) return sendJson(res, 500, { error: up.error.message });
    return sendJson(res, 200, { teamName, themeId: up.data.theme_id, themeConfirmed: up.data.theme_confirmed });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Failed to manage theme state." });
  }
}
