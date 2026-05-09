# CogniDrift

> AI-Powered Receptionist & Communication Platform

CogniDrift is a comprehensive AI communication platform that provides intelligent phone receptionists, SMS agents, web chatbots, and automated scheduling solutions for businesses.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [License](#license)

---

## Features

### AI Communication
- **Phone Receptionist** - 24/7 AI-powered call handling with natural conversations
- **SMS Agent** - Intelligent text message automation and responses
- **Web Chatbot** - Embeddable chat widget for websites
- **Web Voicebot** - Voice-enabled web interactions

### Automation & Scheduling
- **AI Calendar** - Smart scheduling with Cal.com integration
- **Automated Calls** - Outbound call campaigns with AI
- **Smart Tickets** - Automated support ticket management

### Analytics & Management
- **Admin Dashboard** - Real-time analytics and conversation monitoring
- **CRM Integration** - Connect with existing business tools
- **Multi-Model Chat** - Support for multiple AI models

### Industry Solutions
- Healthcare
- Real Estate
- Professional Services
- Call Centers
- Local Services

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| Vite | Build Tool |
| TailwindCSS | Styling |
| Framer Motion | Animations |
| React Router | Navigation |
| Lucide React | Icons |
| Three.js | 3D Graphics |
| Retell Client SDK | Voice AI |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| Twilio | SMS/Voice |
| OpenAI | LLM Integration |
| Resend | Email Service |
| Nodemailer | Email Sending |

### Dashboard
| Technology | Purpose |
|------------|---------|
| React 19 | UI Library |
| Chart.js | Data Visualization |
| Vite | Build Tool |
| TailwindCSS | Styling |

---

## Project Structure

```
cognidrift/
├── frontend/                # Marketing website
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ui/          # Base primitives (Button, Card, etc.)
│   │   │   └── ...          # Feature components
│   │   ├── pages/           # Route pages
│   │   │   ├── products/    # Product pages
│   │   │   ├── solutions/   # Industry solutions
│   │   │   └── resources/   # Blog, Help Center
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── lib/             # Third-party integrations
│   ├── api/                 # Serverless API functions
│   └── public/              # Static assets
│
├── backend/                 # API Server
│   ├── config/              # Database configuration
│   ├── controllers/         # Route handlers
│   ├── models/              # MongoDB schemas
│   ├── services/            # Business logic
│   └── utils/               # Helper functions
│
├── dashboard/               # Admin Dashboard
│   ├── src/
│   │   ├── components/      # Dashboard components
│   │   ├── contexts/        # React contexts
│   │   ├── pages/           # Dashboard pages
│   │   └── api/             # API client
│   └── public/              # Static assets
│
└── CLAUDE.md                # Development guidelines
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB instance
- Twilio account (for SMS/Voice)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/elite1122/cognidrift.git
   cd cognidrift
   ```

2. **Install dependencies for each package**

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install

   # Dashboard
   cd ../dashboard
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

### Development

Run each service in separate terminals:

```bash
# Frontend (http://localhost:5173)
cd frontend
npm run dev

# Backend (http://localhost:3001)
cd backend
npm run dev

# Dashboard (http://localhost:5174)
cd dashboard
npm run dev
```

### Build for Production

```bash
# Frontend
cd frontend
npm run build

# Dashboard
cd dashboard
npm run build

# Backend
cd backend
npm start
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
# Server
PORT=3001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cognidrift

# Twilio
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# OpenAI
OPENAI_API_KEY=your_openai_key

# Email (Resend)
RESEND_API_KEY=your_resend_key

# Admin
ADMIN_PASSWORD=your_admin_password
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3001
VITE_RETELL_AGENT_ID=your_retell_agent_id
```

### Dashboard (`dashboard/.env`)

```env
VITE_API_URL=http://localhost:3001
```

---

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set root directory to `frontend`
3. Configure environment variables
4. Deploy

### Backend (Railway)

1. Create new project on Railway
2. Connect GitHub repository
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

### Dashboard (Vercel)

1. Connect your GitHub repository to Vercel
2. Set root directory to `dashboard`
3. Configure environment variables
4. Deploy

---

## API Endpoints

### Contact
- `POST /api/contact` - Submit contact form

### SMS
- `POST /api/sms/inbound` - Handle incoming SMS
- `POST /api/sms/outbound` - Send SMS

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/conversations` - List conversations
- `GET /api/callbacks` - List callback requests
- `GET /api/customers` - List customers

### Blog
- `GET /api/blogs` - List blog posts
- `POST /api/blogs` - Create blog post
- `PUT /api/blogs/:id` - Update blog post
- `DELETE /api/blogs/:id` - Delete blog post

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with care by the CogniDrift Team
</p>
