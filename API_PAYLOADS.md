# API Payloads for Postman Testing

Use these JSON bodies to test the `POST` endpoints. Ensure you are authenticated (obtain a token via `/api/login`) before testing protected routes.

## 🔐 Authentication

### **POST** `/api/login`

```json
{
  "email": "bharat@example.com",
  "password": "secret"
}
```

> **Response**: `{ "token": "ey..." }` - Copy this token for Bearer Auth.

---

## 🛠 Skills

### **POST** `/api/skills`

**Headers**: `Authorization: Bearer <your_token>`

```json
{
  "name": "Next.js",
  "category": "Frontend",
  "level": 95
}
```

---

## 🚀 Projects

### **POST** `/api/projects`

**Headers**: `Authorization: Bearer <your_token>`

```json
{
  "title": "DNA Decoded",
  "description": "An advanced genomics application for visualizing DNA sequences.",
  "img": "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80",
  "time": "3 Weeks",
  "members": ["Bharat", "Alex"],
  "techStack": ["Python", "Flask", "React", "D3.js"],
  "features": ["Sequence Alignment", "Mutation Detection", "3D Visualization"],
  "urls": {
    "demo": "https://dna-decoded.example.com",
    "repo": "https://github.com/Bharat346/dna-decoded"
  },
  "buttons": [
    {
      "text": "Live Demo",
      "link": "https://dna-decoded.example.com"
    }
  ],
  "files": [],
  "tags": ["Bioinformatics", "Data Viz", "Full Stack"]
}
```

---

## 💼 Experience

### **GET** `/api/experience`

Currently, this is a **read-only** endpoint in the backend. To add experience, you would need to manually insert it into the database or request the addition of a POST endpoint.

**Schema expected by Frontend:**

```json
[
  {
    "id": 1,
    "company": "Tech Corp",
    "role": "Senior Developer",
    "startDate": "2023-01-01",
    "endDate": "Present",
    "description": "Leading the frontend team..."
  }
]
```
