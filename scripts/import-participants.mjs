import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

function mustEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function normalizePhone(p) {
  if (!p) return "";
  return String(p).replace(/[^\d+]/g, "").replace(/^00/, "+");
}

function slugUsername(name) {
  const cleaned = String(name || "")
    .replace(/-+\s*web\s*nexus/i, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .trim()
    .replace(/\s+/g, "_")
    .toLowerCase();
  return cleaned || `user_${Math.random().toString(16).slice(2, 8)}`;
}

async function main() {
  const supabase = createClient(
    mustEnv("SUPABASE_URL"),
    mustEnv("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { persistSession: false } }
  );

  const dataPath = path.join(process.cwd(), "data", "participants.json");
  const rows = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  // 1) Create teams
  const teams = Array.from(new Set(rows.map(r => String(r.team_name || "").trim()).filter(Boolean)));
  if (teams.length) {
    const tInsert = await supabase.from("teams").upsert(teams.map(name => ({ name })));
    if (tInsert.error) throw new Error(tInsert.error.message);
  }

  // 2) Create users with password = phone (as requested)
  for (const r of rows) {
    const name = String(r.participant_name || "").trim();
    const phone = normalizePhone(r.phone);
    const team_name = String(r.team_name || "").trim();
    const university = String(r.university || "").trim();

    if (!name || !phone || !team_name) continue;

    let username = slugUsername(name);

    // Avoid collisions: try adding a suffix if needed
    for (let attempt = 0; attempt < 5; attempt++) {
      const exists = await supabase.from("users").select("id").eq("username", username).maybeSingle();
      if (exists.error) throw new Error(exists.error.message);
      if (!exists.data) break;
      username = `${username}_${attempt + 2}`;
    }

    const password_hash = await bcrypt.hash(phone, 10);
    const up = await supabase
      .from("users")
      .upsert(
        { username, password_hash, role: "participant", name, team_name, phone, university },
        { onConflict: "username" }
      );
    if (up.error) throw new Error(up.error.message);
  }

  console.log(`Imported teams=${teams.length}, users=${rows.length}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

