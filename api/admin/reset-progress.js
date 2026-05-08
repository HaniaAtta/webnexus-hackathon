import { getAdminClient, readAppToken, sendJson, withMethod } from "../_lib/supabase.js";

export default async function handler(req, res) {
  if (!withMethod(req, res, ["POST"])) return;
  try {
    const auth = readAppToken(req);
    if (!auth) return sendJson(res, 401, { error: "Unauthorized." });
    if (auth.role !== "admin") return sendJson(res, 403, { error: "Admins only." });

    const supabase = getAdminClient();

    // Delete all rows from user_progress — resets everyone
    const { error } = await supabase
      .from("user_progress")
      .delete()
      .neq("user_id", 0); // neq 0 matches all rows (no row has id 0)

    if (error) return sendJson(res, 500, { error: error.message });

    return sendJson(res, 200, { ok: true, message: "All progress cleared." });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Failed to reset progress." });
  }
}
