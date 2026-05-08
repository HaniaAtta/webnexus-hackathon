import bcrypt from "bcryptjs";
import { getAdminClient, sendJson, signAppToken, withMethod } from "../_lib/supabase.js";

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = typeof raw === "string" ? raw.split(",")[0].trim() : null;
  return first || req.socket?.remoteAddress || "unknown";
}

export default async function handler(req, res) {
  if (!withMethod(req, res, ["POST"])) return;

  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return sendJson(res, 400, { error: "username and password are required." });
    }

    const supabase = getAdminClient();

    // --- Brute-force protection (IP + username lock window) ---
    const ipText = getClientIp(req);
    const action = "login";
    const MAX_ATTEMPTS = 8;
    const LOCK_MINUTES = 15;
    const attemptsRow = await supabase
      .from("auth_attempts")
      .select("attempts, locked_until")
      .eq("ip_text", ipText)
      .eq("username", username)
      .eq("action", action)
      .maybeSingle();

    if (attemptsRow.data?.locked_until) {
      const lockedUntil = new Date(attemptsRow.data.locked_until);
      if (!Number.isNaN(lockedUntil.getTime()) && lockedUntil.getTime() > Date.now()) {
        return sendJson(res, 429, { error: "Too many login attempts. Try again later." });
      }
    }

    const q = await supabase
      .from("users")
      .select("id, username, role, name, password_hash")
      .eq("username", username)
      .maybeSingle();

    if (q.error) return sendJson(res, 500, { error: q.error.message });
    if (!q.data) {
      const prevAttempts = attemptsRow.data?.attempts ?? 0;
      const nextAttempts = prevAttempts + 1;
      const shouldLock = nextAttempts >= MAX_ATTEMPTS;
      const lockedUntil = shouldLock ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000).toISOString() : null;

      await supabase
        .from("auth_attempts")
        .upsert(
          {
            ip_text: ipText,
            username,
            action,
            attempts: nextAttempts,
            locked_until: lockedUntil,
            last_attempt_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "ip_text,username,action" }
        );

      return sendJson(res, 401, { error: "Invalid credentials." });
    }

    const ok = await bcrypt.compare(password, q.data.password_hash);
    if (!ok) {
      const prevAttempts = attemptsRow.data?.attempts ?? 0;
      const nextAttempts = prevAttempts + 1;
      const shouldLock = nextAttempts >= MAX_ATTEMPTS;
      const lockedUntil = shouldLock ? new Date(Date.now() + LOCK_MINUTES * 60 * 1000).toISOString() : null;

      await supabase
        .from("auth_attempts")
        .upsert(
          {
            ip_text: ipText,
            username,
            action,
            attempts: nextAttempts,
            locked_until: lockedUntil,
            last_attempt_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "ip_text,username,action" }
        );

      return sendJson(res, 401, { error: "Invalid credentials." });
    }

    // Success: reset attempt counters.
    await supabase
      .from("auth_attempts")
      .upsert(
        { ip_text: ipText, username, action, attempts: 0, locked_until: null, updated_at: new Date().toISOString() },
        { onConflict: "ip_text,username,action" }
      );

    const user = { id: q.data.id, username: q.data.username, role: q.data.role, name: q.data.name };
    const token = signAppToken(user);
    return sendJson(res, 200, { token, user });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Login failed." });
  }
}
