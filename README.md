# 📊 User Metadata Dashboard

A fullstack React + Go application that fetches and displays user account metadata from a backend API. The table highlights stale access or password data using Tailwind styling and supports filtering by MFA status.

---

## Tech Stack

- **Frontend**: React (CRA)
- **Styling**: Tailwind CSS
- **Backend**: Go (net/http)
- **Testing**: Jest + React Testing Library, `net/http/httptest` (Go)
- **Live reload** (backend): `air` 

---

## Directory Structure

strato-cloud-project/
├── backend/ # Go server + API
│ ├── main.go
│ └── main_test.go
├── frontend/ # React app
│ ├── src/
│ │ ├── tests/ # Unit tests
│ │ ├── App.jsx
│ │ ├── index.js
│ │ └── index.css
│ ├── public/
│ ├── tailwind.config.js
│ ├── babel.config.js
│ └── package.json
└── README.md

---

## Setup Instructions

### Prerequisites

- Go (≥1.20)
- Node.js (≥18.x)
- npm or yarn
- curl (for testing)
- Optional: [`air`](https://github.com/cosmtrek/air) for hot reload in backend

---

## Running the App Locally

### Backend (Go API)

cd backend

If not done already:
go mod init strato-backend

Run manually:
go run main.go

OR run with auto-reload (optional):
air
The server will start on:
http://localhost:8080/api/users

You can test the endpoint with:
curl http://localhost:8080/api/users

### Frontend (React + Tailwind)
cd frontend
npm install
npm start
Visit in browser:
http://localhost:3000

---

### Features
Displays user metadata from backend

Calculates:
⏱ Days since password change
⏱ Days since last access

Color-codes rows:
🔴 Both password and access are stale
🟡 Only password is stale
🔵 Only access is stale

MFA filter: All, Yes, No
🔁 Auto-refreshes data every 1 second

---

## Testing
### Frontend:
cd frontend
npm run test
Tests include:
computeDays logic
MFA filtering

### Backend:
cd backend
go test
Covers:
Status 200 OK from /api/users
Valid JSON structure
Correct user count

---

## Design & Architecture Notes
Lightweight Go backend using only the standard library
Frontend consumes REST API with fetch()
Tailwind is used via JIT build (no CDN) for flexibility
Color-coding handled entirely via Tailwind classes
Auto-refresh with setInterval for live updates
Separation of frontend and backend allows for independent deployment
Optional dev tooling (air) improves DX during iteration


