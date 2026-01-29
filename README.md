# 📝 To-Do App — tRPC + Prisma

A simple but well-structured **To-Do application** built to demonstrate **end-to-end type safety**, modern full-stack architecture, and clean code practices using **Next.js**, **tRPC**, and **Prisma**.

This project was intentionally designed for **portfolio purposes**, focusing on developer experience and scalability-ready patterns.

> This project was built for portfolio purposes.
> typescript, nextjs, trpc, prisma, fullstack, portfolio

---

## ✨ Features

- Create, list, update and delete todos
- Fully type-safe API (client ↔ server)
- Input validation with Zod
- Optimistic UI powered by React Query
- Clean and predictable architecture

---

## 🧱 Tech Stack

### Frontend
- **Next.js (App Router)**
- **React 19**
- **tRPC React Query**
- **@tanstack/react-query**
- **Tailwind CSS**
- **Shadcn UI**
- **React Hook Form**

### Backend
- **tRPC**
- **Prisma ORM**
- **PostgreSQL** (via Prisma Adapter)
- **Zod** for schema validation

---

## 🔒 Why tRPC?

This project uses **tRPC** to achieve:

- 🚫 No REST or GraphQL boilerplate
- ⚡ Better DX with full TypeScript inference
- 🧠 Single source of truth for API contracts

Client and server share the same types, eliminating an entire class of runtime errors.

---


### Key design decisions
- Prisma access is isolated to the server layer
- Procedures are small, explicit and validated
- Clear separation between client and server concerns

---

## 🧪 Validation & Error Handling

- All inputs are validated using **Zod**
- Server-side errors are propagated in a predictable way
- Strong typing ensures compile-time safety across the stack

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up the database
```bash
npx prisma generate
npx prisma migrate dev
```

### 3. Run the app
```bash
npm run dev
```

---

## 📌 Notes

Authentication was intentionally left out to keep the example focused.

The architecture supports adding protected procedures without refactoring.

This project prioritizes clarity and correctness over feature count.

---

## 📚 What this project demonstrates

Full-stack TypeScript mastery

Practical usage of tRPC in real-world scenarios

Clean Prisma integration

Scalable mental model for growing applications

---

## 📄 License

[MIT LICENSE](./LICENSE)
