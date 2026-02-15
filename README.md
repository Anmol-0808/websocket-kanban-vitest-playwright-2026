
# 📝 WebSocket-Powered Kanban Board

A real-time Kanban board built using **React, Socket.IO, Vitest, and Playwright**.

This project implements a fully functional task management system with real-time synchronization, drag-and-drop functionality, file uploads, and comprehensive test coverage.

---

## 🚀 Features Implemented

### ✅ Real-Time WebSocket Synchronization

* Live task updates across clients
* Event-based architecture using Socket.IO
* Automatic task sync on client connection

### ✅ Full CRUD Operations

* Create tasks
* Update tasks (double-click to edit)
* Delete tasks
* Drag & drop between columns

### ✅ Kanban Workflow

* To Do
* In Progress
* Done
* Column-wise task counts
* Real-time UI updates

### ✅ Priority & Category (react-select)

* Priority: Low / Medium / High
* Category: Bug / Feature / Enhancement
* Styled using react-select

### ✅ File Upload (Images & PDFs)

* Multiple file upload support
* Image preview
* Clickable PDF attachments (opens in new tab)
* Unsupported file validation with error message
* Files stored in memory (simulated backend storage)

### ✅ Task Progress Chart (Recharts)

* Visual count of tasks per column
* Completion percentage
* Real-time graph updates

---

## 🧪 Testing Coverage (Vitest + Playwright)

Testing was implemented as per evaluation criteria (50% weightage).

### 🔹 Unit Tests (Vitest + React Testing Library)

* Task creation
* Task update
* Task deletion
* WebSocket event emission
* Progress chart calculation

### 🔹 Integration Tests

* WebSocket state synchronization
* Drag and drop behavior

### 🔹 End-to-End Tests (Playwright)

* User can create a task
* User can edit a task
* User can delete a task
* User can upload attachments
* Invalid file shows error
* Progress chart updates dynamically

All tests are passing.

---

## 🛠 Tech Stack

Frontend:

* React
* React DnD
* react-select
* Recharts
* Socket.IO Client
* Vitest
* React Testing Library
* Playwright

Backend:

* Node.js
* Express
* Socket.IO

---

## 📂 Project Structure

```
websocket-kanban-vitest-playwright
│── backend/
│   ├── server.js
│   ├── package.json
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── tests/
│   │       ├── unit/
│   │       ├── integration/
│   │       ├── e2e/
│   ├── package.json
│
└── README.md
```

---

## ⚙️ How to Run Locally

### 1️⃣ Backend

```
cd backend
npm install
node server.js
```

Server runs at:

```
http://localhost:5000
```

---

### 2️⃣ Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🧪 Running Tests

### Unit & Integration Tests

```
npm run test
```

### Playwright E2E Tests

```
npx playwright test
```

---

## 📌 Notes

* Tasks are stored in-memory (no database used).
* File uploads are stored as base64 strings (simulated backend storage).
* Real-time updates are broadcast to all connected clients.
* Designed with a neo-brutalist UI approach for clarity and strong visual hierarchy.

---

## 📦 Deployment

Frontend and backend can be deployed independently.



* Frontend → Vercel--- https://websocket-kanban-vitest-playwright-lyart.vercel.app/
* Backend → Render---  https://websocket-kanban-vitest-playwright-2026-tkg8.onrender.com
