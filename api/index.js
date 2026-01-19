require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");

const db = require("../config/db");
const { profile, projects, skills, experience } = require("../db/schema");
const { sql, eq, ilike, or, desc } = require("drizzle-orm");

const app = express();
const PORT = process.env.PORT || 5000;

/* =====================================================
   GLOBAL MIDDLEWARE
===================================================== */
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

/* =====================================================
   RATE LIMITING
===================================================== */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: "Too many requests. Try again later.",
    },
  }),
);

/* =====================================================
   AUTH MIDDLEWARE
===================================================== */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

/* =====================================================
   HEALTH CHECK
===================================================== */

const API_ENDPOINTS = {
  health: [
    { method: "GET", path: "/health", description: "Service health check" },
  ],

  auth: [
    { method: "POST", path: "/api/login", description: "Admin login (JWT)" },
  ],

  profile: [
    { method: "GET", path: "/api/profile", description: "Get profile data" },
  ],

  skills: [
    { method: "GET", path: "/api/skills", description: "Get all skills" },
    { method: "GET", path: "/api/skills/top", description: "Get top 5 skills" },
    { method: "POST", path: "/api/skills", description: "Add skill (protected)" },
  ],

  projects: [
    { method: "GET", path: "/api/projects", description: "Get all projects" },
    {
      method: "GET",
      path: "/api/projects?skill=js",
      description: "Search projects by tag / tech / keyword",
    },
    {
      method: "POST",
      path: "/api/projects",
      description: "Add project (protected)",
    },
  ],

  experience: [
    {
      method: "GET",
      path: "/api/experience",
      description: "Get experience list",
    },
  ],
};

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/health", async (req, res) => {
  const start = Date.now();

  const health = {
    status: "UP",
    service: "portfolio-api",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    environment: process.env.NODE_ENV || "development",
    nodeVersion: process.version,
    pid: process.pid,

    database: {
      status: "UNKNOWN",
      latencyMs: null,
    },

    memory: {},
    endpoints: API_ENDPOINTS,
  };

  try {
    await db.execute(sql`SELECT 1`);
    health.database.status = "CONNECTED";
    health.database.latencyMs = Date.now() - start;
  } catch (err) {
    health.status = "DEGRADED";
    health.database.status = "DISCONNECTED";
    health.database.error = err.message;
  }

  const mem = process.memoryUsage();
  health.memory = {
    rss: `${Math.round(mem.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(mem.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(mem.heapUsed / 1024 / 1024)} MB`,
  };

  const statusCode = health.status === "UP" ? 200 : 503;
  res.status(statusCode).json(health);
});

/* =====================================================
   LOGIN
===================================================== */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "bharat@example.com" && password === "secret") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

/* =====================================================
   PROFILE
===================================================== */
app.get("/api/profile", async (req, res) => {
  const data = await db.select().from(profile).limit(1);
  res.json(data[0] || {});
});

/* =====================================================
   SKILLS
===================================================== */

/**
 * GET /api/skills
 * Returns all skills
 */
app.get("/api/skills", async (req, res) => {
  const data = await db.select().from(skills).orderBy(desc(skills.level));

  res.json(data);
});

/**
 * GET /api/skills/top
 * Returns top 5 skills by level
 */
app.get("/api/skills/top", async (req, res) => {
  const data = await db
    .select()
    .from(skills)
    .orderBy(desc(skills.level))
    .limit(5);

  res.json(data);
});

/**
 * POST /api/skills (protected)
 */
app.post("/api/skills", authenticateToken, async (req, res) => {
  const { name, category, level } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: "Name and category required" });
  }

  const [skill] = await db
    .insert(skills)
    .values({ name, category, level })
    .returning();

  res.status(201).json(skill);
});

/* =====================================================
   PROJECTS
===================================================== */

/**
 * GET /api/projects
 * GET /api/projects?skill=js
 */
app.get("/api/projects", async (req, res) => {
  try {
    const { skill } = req.query;

    let query = db.select().from(projects);

    if (skill) {
      const keyword = `%${skill}%`;

      query = query.where(
        or(
          ilike(projects.title, keyword),
          ilike(projects.description, keyword),

          // JSONB ARRAY SEARCH (tags)
          sql`${projects.tags} @> ${JSON.stringify([skill])}::jsonb`,

          // JSONB ARRAY SEARCH (techStack)
          sql`${projects.techStack} @> ${JSON.stringify([skill])}::jsonb`,
        ),
      );
    }

    const data = await query.orderBy(desc(projects.createdAt));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

/**
 * POST /api/projects (protected)
 */
app.post("/api/projects", authenticateToken, async (req, res) => {
  const {
    title,
    description,
    img,
    time,
    members = [],
    techStack = [],
    features = [],
    urls = {},
    buttons = [],
    files = [],
    tags = [],
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description required" });
  }

  const [project] = await db
    .insert(projects)
    .values({
      title,
      description,
      img,
      time,
      members,
      techStack,
      features,
      urls,
      buttons,
      files,
      tags,
    })
    .returning();

  res.status(201).json(project);
});

/* =====================================================
   EXPERIENCE
===================================================== */
app.get("/api/experience", async (req, res) => {
  const data = await db.select().from(experience);
  res.json(data);
});

/* =====================================================
   SERVER
===================================================== */
// if (process.env.NODE_ENV !== "production") {
//   app.listen(3000, () => {
//     console.log("Server running on port 3000");
//   });
// }

module.exports = app;
  
