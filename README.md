# 📌 Pinterest MVP

A scalable Pinterest-like application built using a modern microservices architecture.
This project focuses on backend-first development with extensibility, performance, and clean system design in mind.

---

## 🚀 Overview

This project is a Minimum Viable Product (MVP) of a Pinterest-like platform where users can:
* login & Create New Account
* Create and manage pins (images)
* Save pins
* Interact with content (basic features)
* add/remove like
* Create Board

The system is designed to evolve into a full-scale production-ready application.

---

## 🧠 Architecture

The system follows a **Microservices Architecture**:

* API Gateway (GraphQL)
* Auth Service
* User Service
* Pin Service
* Board Service
* Like Service
* Saves Service

Each service is isolated and communicates via:

* RabbitMQ (internal communication)
* gRPC (internal communication)
* GraphQL (external API)
* Rest API (external API)

---

## ⚙️ Tech Stack

### Backend

* Node.js + NestJS
* GraphQL (Code-first approach)
* gRPC
* MongoDB   (depending on service)
* Mongoose ORM
* hashicorp vault (managment secrets)

### Infrastructure

* Docker
* Docker compose


### Messaging & Communication (planned)

* RabbitMQ 

### Dev Tools

* TypeScript
* ts-proto (for gRPC types generation)

---

## 📁 Project Structure

```
/apps
  /gateway
  /authe
  /user
  /pins
  /boards
  /saves
/libs
  /proto
  /shared
    /types
    /utils
    /constants
    /index.ts
```

---

## 🔌 API Design

* **GraphQL Gateway** is the entry point for clients
* Each microservice exposes gRPC endpoints
* Shared `.proto` files are used for type-safe communication

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/pinterest-mvp.git
cd pinterest-mvp
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Generate gRPC Types

```bash
npm run proto:generate
```

> Make sure all `.proto` files are correctly placed in `/libs/shared/proto`

---

### 4. Run services

```bash
npm run start:dev
```

---

## ⚠️ Common Issues

### Proto path errors

If you see errors like:

```
File does not reside within any path specified using --proto_path
```

Make sure:

* You are passing correct `--proto_path`
* Paths are relative to project root
* No missing folders

---

## 📈 Roadmap

* [ ] Image upload & storage (Cloudinary / S3)
* [ ] Authentication (JWT + Refresh Tokens)
* [ ] Comments & Likes
* [ ] Search (ElasticSearch)
* [ ] Recommendation system (AI-based)
* [ ] Real-time updates
* [ ] Frontend (Next.js)

---

## 💡 Design Goals

* Scalability (horizontal scaling)
* Clean separation of concerns
* Type safety across services
* High performance communication (gRPC)

---

## 🤝 Contributing

This is a personal learning project, but contributions, ideas, and feedback are welcome.

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Ahmed Hassan
Full Stack Developer | AI Enthusiast

---
