import { getAdminClient, sendJson, withMethod } from "./_lib/supabase.js";

export default async function handler(req, res) {
  if (!withMethod(req, res, ["GET"])) return;

  try {
    const supabase = getAdminClient();

    const q = await supabase
      .from("leaderboard_team_view")
      .select("team_key, theme_id, members_count, member_names, team_points, completion_pct, day_reached")
      .order("team_points", { ascending: false });

    if (q.error) return sendJson(res, 500, { error: q.error.message });
    // `items` kept for backwards compatibility with any existing frontend usage.
    return sendJson(res, 200, { teams: q.data || [], items: q.data || [] });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Failed to fetch leaderboard." });
  }
}
