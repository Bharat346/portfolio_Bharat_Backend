const db = require("../config/db");
const { sql } = require("drizzle-orm");

async function migrate() {
  try {
    console.log("Migrating database manually...");

    // Add new columns
    await db.execute(
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS img text`,
    );
    await db.execute(
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS time text`,
    );
    await db.execute(
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS members jsonb`,
    );
    await db.execute(
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS features jsonb`,
    );
    await db.execute(
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS urls jsonb`,
    );
    await db.execute(
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS buttons jsonb`,
    );
    await db.execute(
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS files jsonb`,
    );
    await db.execute(
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags jsonb`,
    );

    // Check if tech_stack exists (it should), if not add it (just in case)
    await db.execute(
      sql`ALTER TABLE projects ADD COLUMN IF NOT EXISTS tech_stack jsonb`,
    );

    console.log("Migration completed!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();
