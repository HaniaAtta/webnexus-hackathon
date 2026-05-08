import { createClient } from "@supabase/supabase-js";
import jwt from "jsonwebtoken";

function mustEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

export function getAdminClient() {
  return createClient(
    mustEnv("SUPABASE_URL"),
    mustEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } }
  );
}

export function signAppToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role, username: user.username },
    mustEnv("APP_JWT_SECRET"),
    { expiresIn: "12h" }
  );
}

export function readAppToken(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;
  try {
    return jwt.verify(token, mustEnv("APP_JWT_SECRET"));
  } catch {
    return null;
  }
}

export function sendJson(res, status, payload) {
  res.status(status).json(payload);
}

export function withMethod(req, res, methods) {
  if (!methods.includes(req.method)) {
    sendJson(res, 405, { error: `Method ${req.method} not allowed` });
    return false;
  }
  return true;
}
