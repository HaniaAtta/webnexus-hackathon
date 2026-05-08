import { getAdminClient, readAppToken, sendJson, withMethod } from "../_lib/supabase.js";

export default async function handler(req, res) {
  if (!withMethod(req, res, ["GET", "PUT"])) return;

  try {
    const supabase = getAdminClient();

    if (req.method === "GET") {
      const q = await supabase
        .from("app_state")
        .select("current_day")
        .eq("id", 1)
        .maybeSingle();
      if (q.error) return sendJson(res, 500, { error: q.error.message });
      return sendJson(res, 200, { currentDay: q.data?.current_day ?? 1 });
    }

    const auth = readAppToken(req);
    if (!auth || auth.role !== "admin") {
      return sendJson(res, 403, { error: "Admin access required." });
    }

    const day = Number(req.body?.day);
    if (![1, 2].includes(day)) return sendJson(res, 400, { error: "day must be 1 or 2." });

    const up = await supabase
      .from("app_state")
      .upsert({ id: 1, current_day: day }, { onConflict: "id" })
      .select("current_day")
      .single();
    if (up.error) return sendJson(res, 500, { error: up.error.message });

    return sendJson(res, 200, { currentDay: up.data.current_day });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Failed to manage day state." });
  }
}
