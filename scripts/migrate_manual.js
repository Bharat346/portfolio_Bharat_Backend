const db = require("../config/db");
const { sql } = require("drizzle-orm");

async function migrate() {
  try {
    console.log("Migrating database manually...");

    // =============================
    // PROJECTS TABLE SAFE UPDATES
    // =============================
    await db.execute(sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS img text`);
    await db.execute(sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS time text`);
    await db.execute(sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS members jsonb`);
    await db.execute(sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_stack jsonb`);
    await db.execute(sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS features jsonb`);
    await db.execute(sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS urls jsonb`);
    await db.execute(sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS buttons jsonb`);
    await db.execute(sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS files jsonb`);
    await db.execute(sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags jsonb`);

    // =============================
    // EXPERIENCE TABLE — FULL RESET
    // =============================
    console.log("Resetting experience table...");

    await db.execute(sql`DROP TABLE IF EXISTS experience`);

    await db.execute(sql`
      CREATE TABLE experience (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT,
        start_date TEXT NOT NULL,
        end_date TEXT,
        current BOOLEAN DEFAULT false,
        description TEXT,
        technologies JSONB,
        achievements JSONB,
        type TEXT
      )
    `);

    console.log("Migration completed!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();
