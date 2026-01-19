const db = require("../config/db");
const { projects } = require("../db/schema");
const { sql } = require("drizzle-orm");

const projectsData = [
  {
    id: 0,
    title: "BharatDocs",
    img: "/ProjectsData/img/BharatDocs.png",
    description:
      "A comprehensive documentation platform designed for developers, educators, and learners to organize content efficiently for reading. Features include markdown support, hierarchical note-taking, and secure admin dashboard for content management.",
    time: "Dec 2024 – Feb 2025",
    members: [
      {
        name: "Bharat",
        role: "Full-stack Developer",
        github: "https://github.com/Bharat346",
      },
    ],
    tech_stack: {
      frontend: ["React", "Vite.js", "Tailwind CSS"],
      backend: ["Node.js"],
      markdown: ["MDX", "Prism.js"],
      storage: ["Vercel Blob"],
      authentication: ["Local Auth"],
    },
    features: [
      {
        name: "Docs Management",
        description:
          "Create and publish Docs with markdown support, syntax highlighting, and SEO optimization. Includes draft saving, version history, and collaborative editing features.",
      },
      {
        name: "Note Organizer",
        description:
          "Hierarchical note-taking system with folder structures, tags, and full-text search. Supports PDF viewing, image embedding, and cross-note linking.",
      },
      {
        name: "Admin Dashboard",
        description:
          "Allows secure addition of blogs and notes via password-protected access with admin role.",
      },
    ],
    urls: {
      github: "https://github.com/Bharat346/Docs_and_Notes/tree/gh-pages",
      live_project: "https://bharat-docs.vercel.app/",
    },
    buttons: [
      {
        label: "View Project",
        url: "https://bharat-docs.vercel.app/",
        type: "primary",
      },
      {
        label: "GitHub Repository",
        url: "https://github.com/Bharat346/Docs_and_Notes/tree/gh-pages",
        type: "secondary",
      },
    ],
    files: [
      {
        name: "Project DFD",
        type: "drawio",
        url: "#",
        description: "Data Flow Diagram for the entire BharatDocs platform",
      },
      {
        name: "Technical Specifications",
        type: "doc",
        url: "#",
        description: "Detailed technical requirements and specifications",
      },
      {
        name: "Database Schema",
        type: "drawio",
        url: "#",
        description: "Visual representation of the database structure",
      },
    ],
    tags: [
      "React Js",
      "JavaScript",
      "Github",
      "NodeJs",
      "Tailwind",
      "Documentation",
      "MDX",
      "Note-taking",
    ],
  },
  {
    id: 0,
    title: "ShareLink",
    img: "/ProjectsData/img/ShareLink.png",
    description:
      "A secure and real-time file sharing application that enables users to upload, share, and download files seamlessly across devices. Features include peer-to-peer sharing, link-based access, and optional password-protection for sensitive files.",
    time: "Aug 2025 – current",
    members: [
      {
        name: "Bharat Kumar",
        role: "Full-stack Developer",
        github: "https://github.com/Bharat346",
      },
    ],
    tech_stack: {
      frontend: ["React", "Vite.js"],
      backend: ["Node.js", "Express.js"],
      file_transfer: ["Computer Network", "WebSockets"],
    },
    features: [
      {
        name: "Instant File Sharing",
        description:
          "Users can upload and share files instantly through generated shareable links with optional expiry times.",
      },
      {
        name: "Secure Access",
        description:
          "Files can be password-protected with end-to-end encryption, ensuring data privacy and secure transfers.",
      },
      {
        name: "Real-time Transfer",
        description:
          "Utilizes WebSockets for peer-to-peer connections, enabling faster and direct file sharing between users.",
      },
      {
        name: "Cross-device Compatibility",
        description:
          "Supports file access and sharing across mobile, desktop, and tablets with responsive UI.",
      },
    ],
    urls: {
      github: "https://github.com/Bharat346/File-Sharing-App",
      live_project: "https://bharatshare.vercel.app/",
    },
    buttons: [
      {
        label: "Try BharatShare",
        url: "https://sharelink-psi.vercel.app/",
        type: "primary",
      },
      {
        label: "GitHub Repository",
        url: "https://github.com/Bharat346/ShareLink",
        type: "secondary",
      },
    ],
    files: [
      {
        name: "System Architecture",
        type: "drawio",
        url: "#",
        description:
          "High-level architecture showing file flow, storage, and transfer modules.",
      },
      {
        name: "API Documentation",
        type: "doc",
        url: "#",
        description:
          "Detailed REST API documentation for file upload, download, and sharing endpoints.",
      },
      {
        name: "ER Diagram",
        type: "drawio",
        url: "#",
        description:
          "Database schema representation including users, files, and sessions.",
      },
    ],
    tags: [
      "Computer Network",
      "WebSockets",
      "React Js",
      "JavaScript",
      "NodeJs",
      "File Sharing",
    ],
  },
  {
    id: 1,
    title: "Water-Distribution-System",
    img: "/ProjectsData/img/water_distri.png",
    description:
      "A smart water distribution system using graph algorithms and physics logic for optimal flow distribution across pipelines. Designed for efficient municipal water management.",
    time: "March 2024 – April 2024",
    members: [
      {
        name: "Bharat",
        role: "Full-stack Developer",
        github: "https://github.com/Bharat346",
      },
    ],
    tech_stack: {
      frontend: ["React.js", "Tailwind CSS"],
      backend: ["Node.js"],
      logic: ["Graph Algorithms", "Physics Flow Modeling"],
    },
    features: [
      {
        name: "Graph-Based Network",
        description:
          "Uses graph theory to model water flow through nodes and pipelines for simulation.",
      },
      {
        name: "Flow Optimization",
        description:
          "Applies physics-based formulas to calculate pressure and velocity across different pipes.",
      },
      {
        name: "Interactive Visualization",
        description:
          "Visual representation of the network with adjustable flow and source controls.",
      },
    ],
    urls: {
      github: "https://github.com/Bharat346/Water-Distribution-System",
      live_project: "https://bharat346.github.io/Water-Distribution-System/",
    },
    buttons: [
      {
        label: "View Project",
        url: "https://bharat346.github.io/Water-Distribution-System/",
        type: "primary",
      },
      {
        label: "GitHub Repository",
        url: "https://github.com/Bharat346/Water-Distribution-System",
        type: "secondary",
      },
    ],
    files: [
      {
        name: "Project DFD",
        type: "drawio",
        url: "#",
        description: "Data Flow Diagram illustrating water flow modeling",
      },
      {
        name: "Gantt Chart",
        type: "pdf",
        url: "#",
        description: "Timeline for system design and deployment",
      },
      {
        name: "Graph Algorithm Design",
        type: "pdf",
        url: "#",
        description: "Technical details on graph usage",
      },
    ],
    tags: ["React Js", "Node Js", "Graph", "Physics"],
  },
  {
    id: 2,
    title: "Calculator",
    img: "/ProjectsData/img/Calculator.png",
    description:
      "The JavaScript Calculator project is a simple web-based calculator that allows users to perform basic arithmetic operations such as addition, subtraction, multiplication, and division.",
    time: "Sept 2024 – Oct 2024",
    members: [
      {
        name: "Bharat",
        role: "Full-stack Developer",
        github: "https://github.com/Bharat346",
      },
    ],
    tech_stack: {
      frontend: ["React", "Tailwind CSS"],
      language: ["JavaScript"],
    },
    features: [
      {
        name: "Basic Operations",
        description:
          "Supports standard arithmetic operations including addition, subtraction, multiplication, and division.",
      },
      {
        name: "Responsive UI",
        description:
          "Fully responsive design built with Tailwind CSS, ensuring usability across all device sizes.",
      },
      {
        name: "Keyboard Support",
        description:
          "Allows users to perform calculations using both on-screen buttons and keyboard input.",
      },
      {
        name: "Advanced Operations",
        description:
          "Supports Trignometric , Inverse-Trignometric , Logarithmic , Factorial Operations that degrade calculation time.",
      },
    ],
    urls: {
      github: "https://github.com/Bharat346/calculator/tree/gh-pages",
      live_project: "https://bharat346.github.io/calculator/",
    },
    buttons: [
      {
        label: "View Project",
        url: "https://bharat346.github.io/calculator/",
        type: "primary",
      },
      {
        label: "GitHub Repository",
        url: "https://github.com/Bharat346/calculator/tree/gh-pages",
        type: "secondary",
      },
    ],
    files: [
      {
        name: "Wireframe",
        type: "drawio",
        url: "#",
        description: "Initial UI/UX layout for the calculator",
      },
      {
        name: "Feature List",
        type: "doc",
        url: "#",
        description:
          "Documented list of all features included in the calculator",
      },
      {
        name: "User Manual",
        type: "pdf",
        url: "#",
        description: "PDF guide explaining usage and controls",
      },
    ],
    tags: ["ReactJs", "JavaScript", "Tailwind", "Calculator", "Frontend"],
  },
  {
    id: 3,
    title: "Tic-Tac-Toe",
    img: "/ProjectsData/img/TicTacToe.png",
    description:
      "This JavaScript Tic Tac Toe game is created for entertainment purposes. The developer holds no responsibility for the accuracy or outcomes. Use at your own discretion. Enjoy the game!",
    time: "Dec 2023 – Jan 2023",
    members: [
      {
        name: "Bharat",
        role: "Full-stack Developer",
        github: "https://github.com/Bharat346",
      },
    ],
    tech_stack: {
      frontend: ["React"],
      language: ["JavaScript"],
    },
    features: [
      {
        name: "Two-Player Mode",
        description:
          "Allows two players to take turns and play against each other on the same device.",
      },
      {
        name: "Win Detection",
        description:
          "Automatically detects winning combinations and highlights the winner.",
      },
      {
        name: "Draw Detection",
        description:
          "Identifies draw situations when the board is full with no winner.",
      },
      {
        name: "Simple Responsive UI",
        description:
          "User-friendly layout that adapts to different screen sizes.",
      },
    ],
    urls: {
      github: "https://github.com/Bharat346/Tic-Tac-Toe/tree/master",
      live_project: "https://bharat346.github.io/Tic-Tac-Toe/",
    },
    buttons: [
      {
        label: "View Project",
        url: "https://bharat346.github.io/Tic-Tac-Toe/",
        type: "primary",
      },
      {
        label: "GitHub Repository",
        url: "https://github.com/Bharat346/Tic-Tac-Toe/tree/master",
        type: "secondary",
      },
    ],
    files: [
      {
        name: "Game Logic Flowchart",
        type: "drawio",
        url: "#",
        description: "Flowchart showing the game's logical flow",
      },
      {
        name: "Feature Checklist",
        type: "doc",
        url: "#",
        description: "Detailed list of planned and implemented features",
      },
      {
        name: "Rules Document",
        type: "pdf",
        url: "#",
        description: "Instructions on how to play the game",
      },
    ],
    tags: ["ReactJs", "JavaScript", "Game", "TicTacToe", "Frontend"],
  },
];

const seedProjects = async () => {
  try {
    console.log("Seeding projects...");

    // Clear existing projects
    await db.delete(projects);

    // Insert new projects
    const values = projectsData.map((p) => ({
      title: p.title,
      description: p.description,
      img: p.img,
      time: p.time,
      members: p.members,
      techStack: p.tech_stack,
      features: p.features,
      urls: p.urls,
      buttons: p.buttons,
      files: p.files,
      tags: p.tags,
    }));

    await db.insert(projects).values(values);

    console.log("Projects seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding projects:", error);
    process.exit(1);
  }
};

seedProjects();
