# Hushline: Real-Time Chat Application

React + Node/Express + MongoDB + Socket.IO. Progress follows the assignment timeline.

- [x] Day 1: project setup, JWT auth (register, login, logout, protected routes), auth UI
- [ ] Day 2: remaining REST APIs (conversations, messages)
- [ ] Day 3: one-to-one chat
- [ ] Day 4: group chat
- [ ] Day 5: Socket.IO features
- [ ] Day 6-7: testing, deployment

## Setup

Requires Node 18+ and a running MongoDB (local or Atlas).

```bash
# API
cd server
cp .env.example .env     # edit MONGO_URI and JWT_SECRET
npm install
npm run dev              # http://localhost:5000

# Client (new terminal)
cd client
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

## Environment variables

| File | Variable | Purpose |
|---|---|---|
| server/.env | PORT | API port |
| server/.env | MONGO_URI | MongoDB connection string |
| server/.env | JWT_SECRET | Secret used to sign tokens |
| server/.env | JWT_EXPIRES_IN | Token lifetime (e.g. 7d) |
| server/.env | CLIENT_URL | Allowed CORS origin |
| client/.env | VITE_API_URL | API base URL |

## API (Day 1)

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | no | Create account, returns JWT |
| POST | /api/auth/login | no | Sign in, returns JWT |
| GET | /api/auth/me | yes | Current user |
| POST | /api/auth/logout | yes | Mark offline, update last seen |
| PATCH | /api/auth/profile | yes | Update name / profile image |
| GET | /api/users?search= | yes | Search registered users |

Security: bcrypt (12 rounds), JWT bearer tokens, Helmet, CORS allow-list, login rate limit, regex-escaped search.
