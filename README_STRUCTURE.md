# CogniDrift Agent Project Structure

## 📁 Three Separate Applications

```
cognidrift-agent/
├── frontend/     → Main Marketing Website
├── backend/      → SMS & API Server  
└── dashboard/    → Admin Dashboard
```

---

## 🌐 Frontend (Main Website)

**Path:** `./frontend/`

**Description:** Public-facing marketing website with Cal.com booking integration

**Tech Stack:**
- React + Vite
- Tailwind CSS
- Framer Motion
- Cal.com Embed

**Development:**
```powershell
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

**Build:**
```powershell
cd frontend
npm run build
```

**Deploy:** Vercel
- URL: https://cognidrift-agent.vercel.app

---

## 🔧 Backend (API Server)

**Path:** `./backend/`

**Description:** SMS conversation handler with LLM integration and Retell AI calling

**Tech Stack:**
- Node.js + Express
- MongoDB + Mongoose
- OpenAI GPT-4
- Twilio SMS
- Retell AI

**Development:**
```powershell
cd backend
npm install
npm start
# Runs on http://localhost:3000
```

**Deploy:** Railway
- URL: https://cognidrift-send-and-receive-sms-production.up.railway.app

---

## 📊 Dashboard (Admin Panel)

**Path:** `./dashboard/`

**Description:** Internal admin panel for monitoring conversations and callbacks

**Tech Stack:**
- React + Vite
- Tailwind CSS
- API integration with backend

**Development:**
```powershell
cd dashboard
npm install  
npm run dev
# Runs on http://localhost:5173
```

**Build:**
```powershell
cd dashboard
npm run build
```

**Deploy:** Vercel
- Configure root directory: `dashboard/`

---

## 🚀 Quick Start

### Run All Applications:

```powershell
# Terminal 1 - Frontend
cd frontend && npm run dev

# Terminal 2 - Backend
cd backend && npm start

# Terminal 3 - Dashboard
cd dashboard && npm run dev
```

---

## 📝 Notes

- Each folder has its own `package.json` and dependencies
- Environment variables are configured per folder (`.env` files)
- Frontend and Dashboard are independent React apps
- Backend is shared by both frontend and dashboard

---

## 🔗 URLs

| Application | Local | Production |
|------------|-------|-----------|
| Frontend | http://localhost:3000 | https://cognidrift-agent.vercel.app |
| Backend | http://localhost:3000 | https://cognidrift...railway.app |
| Dashboard | http://localhost:5173 | TBD |
