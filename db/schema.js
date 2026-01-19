const {
  pgTable,
  serial,
  text,
  jsonb,
  timestamp,
  integer,
} = require("drizzle-orm/pg-core");

const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  bio: text("bio"),
  role: text("role"),
  avatarUrl: text("avatar_url"),
  passwordHash: text("password_hash"), // For admin logic
  createdAt: timestamp("created_at").defaultNow(),
});

const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  img: text("img"),
  time: text("time"),
  members: jsonb("members"),
  techStack: jsonb("tech_stack"),
  features: jsonb("features"),
  urls: jsonb("urls"),
  buttons: jsonb("buttons"),
  files: jsonb("files"),
  tags: jsonb("tags"),
  createdAt: timestamp("created_at").defaultNow(),
});

const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // e.g., 'Frontend', 'Backend'
  level: integer("level"), // 1-100
});

const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description"),
});

module.exports = {
  profile,
  projects,
  skills,
  experience,
};
