require("dotenv").config();
const db = require("../config/db");
const { profile, projects, skills, experience } = require("../db/schema");

const seed = async () => {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    console.log("Deleting old data...");
    await db.delete(profile);
    await db.delete(projects);
    await db.delete(skills);
    await db.delete(experience);

    // 1. Profile
    console.log("Creating Profile...");
    await db.insert(profile).values({
      name: "Bharat",
      email: "bharat@example.com",
      bio: "Full Stack Developer passionate about building scalable web applications and premium user interfaces. Expert in React, Node.js, and Cloud Architecture.",
      role: "Senior Software Engineer",
      avatarUrl: "https://github.com/shadcn.png", // Placeholder
      passwordHash: "hashed_secret_password", // In real app, hash this
    });

    // 2. Skills
    console.log("Creating Skills...");
    await db.insert(skills).values([
      { name: "JavaScript", category: "Language", level: 95 },
      { name: "TypeScript", category: "Language", level: 90 },
      { name: "Python", category: "Language", level: 85 },
      { name: "Go", category: "Language", level: 75 },
      { name: "React", category: "Frontend", level: 95 },
      { name: "Next.js", category: "Frontend", level: 90 },
      { name: "Vue.js", category: "Frontend", level: 80 },
      { name: "Tailwind CSS", category: "Frontend", level: 95 },
      { name: "Framer Motion", category: "Frontend", level: 85 },
      { name: "Three.js", category: "Frontend", level: 70 },
      { name: "Node.js", category: "Backend", level: 90 },
      { name: "Express", category: "Backend", level: 90 },
      { name: "NestJS", category: "Backend", level: 80 },
      { name: "GraphQL", category: "Backend", level: 85 },
      { name: "PostgreSQL", category: "Database", level: 85 },
      { name: "Redis", category: "Database", level: 80 },
      { name: "MongoDB", category: "Database", level: 80 },
      { name: "Docker", category: "DevOps", level: 75 },
      { name: "Kubernetes", category: "DevOps", level: 70 },
      { name: "AWS", category: "DevOps", level: 70 },
      { name: "CI/CD", category: "DevOps", level: 80 },
      { name: "Git", category: "Tools", level: 95 },
      { name: "Figma", category: "Design", level: 75 },
      { name: "System Design", category: "Architecture", level: 85 },
      { name: "Microservices", category: "Architecture", level: 80 },
    ]);

    // 3. Projects
    console.log("Creating Projects...");
    const projectData = [];
    for (let i = 1; i <= 6; i++) {
      projectData.push({
        title: `Project Alpha ${i}`,
        description: `A high-performance web application designed to solve problem X using technology Y. Features include real-time updates, secure authentication, and a responsive UI. Iteration ${i}.`,
        techStack: ["React", "Node.js", "PostgreSQL", "Tailwind"],
        repoLink: "https://github.com/bharat/project-alpha",
        demoLink: "https://project-alpha.demo.com",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
      });
    }
    // Add some specific ones
    projectData.push({
      title: "E-Commerce Dashboard",
      description:
        "Comprehensive dashboard for managing products, orders, and analytics. Built with Next.js and Tremor.",
      techStack: ["Next.js", "Tremor", "Prisma"],
      repoLink: "https://github.com/bharat/dashboard",
      demoLink: "https://dashboard.demo.com",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    });

    await db.insert(projects).values(projectData);

    // 4. Experience
    console.log("Creating Experience...");
    await db.insert(experience).values([
      {
        company: "Tech Corp Inc.",
        role: "Senior Frontend Engineer",
        startDate: "2023-01",
        endDate: "Present",
        description:
          "Leading the frontend team, migrating legacy code to React, and improving site performance by 40%.",
      },
      {
        company: "Startup Hustle",
        role: "Full Stack Developer",
        startDate: "2021-06",
        endDate: "2022-12",
        description:
          "Built the MVP of the core product using MERN stack. Handled deployment and CI/CD pipelines.",
      },
      {
        company: "Freelance",
        role: "Web Developer",
        startDate: "2020-01",
        endDate: "2021-05",
        description:
          "Delivered 10+ custom websites for clients in various industries using WordPress and React.",
      },
    ]);

    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seed();
