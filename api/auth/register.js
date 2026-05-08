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
    const { username, password, name, role = "participant" } = req.body || {};
    if (!username || !password || !name) {
      return sendJson(res, 400, { error: "username, password, and name are required." });
    }

    const supabase = getAdminClient();

    // --- Brute-force protection (IP + username lock window) ---
    const ipText = getClientIp(req);
    const action = "register";
    const MAX_ATTEMPTS = 5;
    const LOCK_MINUTES = 20;
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
        return sendJson(res, 429, { error: "Too many registration attempts. Try again later." });
      }
    }

    const existing = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .maybeSingle();
    if (existing.data) {
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
      return sendJson(res, 409, { error: "Username already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const insert = await supabase
      .from("users")
      .insert({ username, password_hash: passwordHash, role, name })
      .select("id, username, role, name")
      .single();

    if (insert.error) return sendJson(res, 500, { error: insert.error.message });

    // Success: reset attempt counters.
    await supabase
      .from("auth_attempts")
      .upsert(
        { ip_text: ipText, username, action, attempts: 0, locked_until: null, updated_at: new Date().toISOString() },
        { onConflict: "ip_text,username,action" }
      );

    const token = signAppToken(insert.data);
    return sendJson(res, 201, { token, user: insert.data });
  } catch (err) {
    return sendJson(res, 500, { error: err.message || "Registration failed." });
  }
}
