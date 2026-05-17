# Phase 1: Cogni* Product Rebrand + CogniHub Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename 5 products to Cogni* branded names, merge Web Voicebot into CogniVoice, restructure the navbar, build a full CogniHub product page with dual-track pricing, and add route redirects.

**Architecture:** File renames via git mv, then update imports/routes in App.jsx. Navbar restructured into 2 groups (AI Products + Platform). CogniHub gets a new product page following the WebChatbot.jsx pattern, plus a pricing data file, pricing cards component with Managed/BYOK toggle, and detailed pricing page. Old routes get `<Navigate replace>` redirects.

**Tech Stack:** React 18, Vite, Tailwind CSS 3, Framer Motion, Lucide icons, react-icons, react-router-dom v6

**Global CSS file:** `src/app/globals.css` (NOT src/index.css)

---

## File Structure

### Files to Rename (git mv)
- `src/pages/products/PhoneReceptionist.jsx` → `src/pages/products/CogniVoice.jsx`
- `src/pages/products/PhoneReceptionistPricing.jsx` → `src/pages/products/CogniVoicePricing.jsx`
- `src/pages/products/WebChatbot.jsx` → `src/pages/products/CogniChat.jsx`
- `src/pages/products/WebChatbotPricing.jsx` → `src/pages/products/CogniChatPricing.jsx`
- `src/pages/products/AutomatedCalls.jsx` → `src/pages/products/CogniReachCalls.jsx`
- `src/pages/products/AutomatedSms.jsx` → `src/pages/products/CogniReachSms.jsx`
- `src/pages/products/AiAutomation.jsx` → `src/pages/products/CogniFlow.jsx`

### Files to Delete
- `src/pages/products/MultiModelChat.jsx` (replaced by CogniHub.jsx)
- `src/pages/products/WebVoicebot.jsx` (merged into CogniVoice)

### Files to Create
- `src/pages/products/CogniHub.jsx` — Full product page
- `src/pages/products/CogniHubPricing.jsx` — Detailed pricing comparison page
- `src/data/cognihubPricing.js` — Pricing tiers, features, add-ons
- `src/components/CogniHubPricingCards.jsx` — Pricing cards with Managed/BYOK toggle

### Files to Modify
- `src/App.jsx` — Update lazy imports, routes, add redirects
- `src/components/Navbar.jsx` — Restructure product groups
- `src/components/Footer.jsx` — Update product links
- `src/pages/Home.jsx` — Update product path references
- `src/pages/products/CogniVoice.jsx` — Update hero title + add "Deploy Anywhere" section
- `src/pages/products/CogniChat.jsx` — Update hero SEO meta path
- `src/pages/products/CogniReachCalls.jsx` — Update hero title
- `src/pages/products/CogniReachSms.jsx` — Update hero title
- `src/pages/products/CogniFlow.jsx` — Update hero title

---

### Task 1: Rename product files and update hero titles

**Files:**
- Rename: all 7 files listed above via `git mv`
- Delete: `src/pages/products/MultiModelChat.jsx`, `src/pages/products/WebVoicebot.jsx`
- Modify: hero titles and SEO meta in each renamed file

- [ ] **Step 1: Rename files with git mv**

```bash
cd /Users/qratul/research_and_dev/cognidrift_website/frontend
git mv src/pages/products/PhoneReceptionist.jsx src/pages/products/CogniVoice.jsx
git mv src/pages/products/PhoneReceptionistPricing.jsx src/pages/products/CogniVoicePricing.jsx
git mv src/pages/products/WebChatbot.jsx src/pages/products/CogniChat.jsx
git mv src/pages/products/WebChatbotPricing.jsx src/pages/products/CogniChatPricing.jsx
git mv src/pages/products/AutomatedCalls.jsx src/pages/products/CogniReachCalls.jsx
git mv src/pages/products/AutomatedSms.jsx src/pages/products/CogniReachSms.jsx
git mv src/pages/products/AiAutomation.jsx src/pages/products/CogniFlow.jsx
```

- [ ] **Step 2: Delete replaced files**

```bash
git rm src/pages/products/MultiModelChat.jsx
git rm src/pages/products/WebVoicebot.jsx
```

- [ ] **Step 3: Update hero titles in each renamed file**

In `src/pages/products/CogniVoice.jsx`:
- Change the `<h1>` hero title from `AI <span ...>Phone Receptionist</span>` to `<span className="text-blue-600">CogniVoice</span>`
- Update `<SEOMeta title="..." description="..." url="/products/cognivoice" />`

In `src/pages/products/CogniVoicePricing.jsx`:
- Update any title references from "Phone Receptionist" to "CogniVoice"
- Update SEO meta url to `/products/cognivoice/pricing`

In `src/pages/products/CogniChat.jsx`:
- Title already says "CogniChat" (was updated earlier)
- Update SEO meta url from `/products/web-chatbot` to `/products/cognichat`

In `src/pages/products/CogniChatPricing.jsx`:
- Update SEO meta url to `/products/cognichat/pricing`

In `src/pages/products/CogniReachCalls.jsx`:
- Change hero title from `AI <span ...>Automated Calls</span>` to `<span className="text-blue-600">CogniReach</span> Calls`
- Update SEO meta url to `/products/cognireach-calls`

In `src/pages/products/CogniReachSms.jsx`:
- Change hero title from `AI <span ...>Automated SMS</span>` to `<span className="text-blue-600">CogniReach</span> SMS`
- Update SEO meta url to `/products/cognireach-sms`

In `src/pages/products/CogniFlow.jsx`:
- Change hero title from `AI <span ...>Automation</span>` to `<span className="text-blue-600">CogniFlow</span>`
- Update SEO meta url to `/products/cogniflow`

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: rename product files to Cogni* brands and update hero titles"
```

---

### Task 2: Update App.jsx routes and redirects

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Read the current App.jsx file**

Read the full file to understand all lazy imports and routes.

- [ ] **Step 2: Update lazy imports**

Replace all old product lazy imports with new file paths. Add `Navigate` import. The full import section should become:

```jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'

// Lazy load all pages for better performance
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Pricing = lazy(() => import('./pages/Pricing'))

// Product Pages — Cogni* branded
const CogniVoice = lazy(() => import('./pages/products/CogniVoice'))
const CogniVoicePricing = lazy(() => import('./pages/products/CogniVoicePricing'))
const CogniChat = lazy(() => import('./pages/products/CogniChat'))
const CogniChatPricing = lazy(() => import('./pages/products/CogniChatPricing'))
const CogniReachCalls = lazy(() => import('./pages/products/CogniReachCalls'))
const CogniReachSms = lazy(() => import('./pages/products/CogniReachSms'))
const CogniFlow = lazy(() => import('./pages/products/CogniFlow'))
const CogniHub = lazy(() => import('./pages/products/CogniHub'))
const CogniHubPricing = lazy(() => import('./pages/products/CogniHubPricing'))

// Product Pages — Platform tools (unchanged names)
const SmsAgent = lazy(() => import('./pages/products/SmsAgent'))
const AiCrm = lazy(() => import('./pages/products/AiCrm'))
const SmartTickets = lazy(() => import('./pages/products/SmartTickets'))
const AiCalendar = lazy(() => import('./pages/products/AiCalendar'))
const Dashboards = lazy(() => import('./pages/products/Dashboards'))

// Industries Pages
const Healthcare = lazy(() => import('./pages/solutions/Healthcare'))
const LocalServices = lazy(() => import('./pages/solutions/LocalServices'))
const ProfessionalServices = lazy(() => import('./pages/solutions/ProfessionalServices'))
const CallCenters = lazy(() => import('./pages/solutions/CallCenters'))

// Resources Pages
const Blog = lazy(() => import('./pages/resources/Blog'))
const BlogPost = lazy(() => import('./pages/resources/BlogPost'))
const CaseStudies = lazy(() => import('./pages/resources/CaseStudies'))
const HelpCenter = lazy(() => import('./pages/resources/HelpCenter'))

// Legal Pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const SmsConsent = lazy(() => import('./pages/SmsConsent'))

// FAQ Page
const FAQPage = lazy(() => import('./pages/FAQ'))

// Integrations Page
const Integrations = lazy(() => import('./pages/Integrations'))

// Error Page
const NotFound = lazy(() => import('./pages/NotFound'))
```

- [ ] **Step 3: Update routes and add redirects**

Replace the `<Routes>` content with:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/pricing" element={<Pricing />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />

  {/* Product Routes — Cogni* branded */}
  <Route path="/products/cognivoice" element={<CogniVoice />} />
  <Route path="/products/cognivoice/pricing" element={<CogniVoicePricing />} />
  <Route path="/products/cognichat" element={<CogniChat />} />
  <Route path="/products/cognichat/pricing" element={<CogniChatPricing />} />
  <Route path="/products/cognireach-calls" element={<CogniReachCalls />} />
  <Route path="/products/cognireach-sms" element={<CogniReachSms />} />
  <Route path="/products/cogniflow" element={<CogniFlow />} />
  <Route path="/products/cognihub" element={<CogniHub />} />
  <Route path="/products/cognihub/pricing" element={<CogniHubPricing />} />

  {/* Product Routes — Platform tools */}
  <Route path="/products/sms-agent" element={<SmsAgent />} />
  <Route path="/products/ai-crm" element={<AiCrm />} />
  <Route path="/products/smart-ticketing" element={<SmartTickets />} />
  <Route path="/products/ai-calendar" element={<AiCalendar />} />
  <Route path="/products/dashboards" element={<Dashboards />} />

  {/* Legacy route redirects */}
  <Route path="/products/phone-receptionist" element={<Navigate to="/products/cognivoice" replace />} />
  <Route path="/products/phone-receptionist/pricing" element={<Navigate to="/products/cognivoice/pricing" replace />} />
  <Route path="/products/web-chatbot" element={<Navigate to="/products/cognichat" replace />} />
  <Route path="/products/web-chatbot/pricing" element={<Navigate to="/products/cognichat/pricing" replace />} />
  <Route path="/products/web-voicebot" element={<Navigate to="/products/cognivoice" replace />} />
  <Route path="/products/automated-calls" element={<Navigate to="/products/cognireach-calls" replace />} />
  <Route path="/products/automated-sms" element={<Navigate to="/products/cognireach-sms" replace />} />
  <Route path="/products/ai-automation" element={<Navigate to="/products/cogniflow" replace />} />
  <Route path="/products/multi-model-chat" element={<Navigate to="/products/cognihub" replace />} />

  {/* Industries Routes */}
  <Route path="/industries/healthcare" element={<Healthcare />} />
  <Route path="/industries/local-services" element={<LocalServices />} />
  <Route path="/industries/professional-services" element={<ProfessionalServices />} />
  <Route path="/industries/call-centers" element={<CallCenters />} />

  {/* Resources Routes */}
  <Route path="/resources/blog" element={<Blog />} />
  <Route path="/resources/blog/:slug" element={<BlogPost />} />
  <Route path="/resources/case-studies" element={<CaseStudies />} />
  <Route path="/resources/help-center" element={<HelpCenter />} />

  {/* Legal Routes */}
  <Route path="/privacy" element={<PrivacyPolicy />} />
  <Route path="/terms" element={<TermsOfService />} />
  <Route path="/sms-consent" element={<SmsConsent />} />

  {/* FAQ Route */}
  <Route path="/faq" element={<FAQPage />} />

  {/* Integrations Route */}
  <Route path="/integrations" element={<Integrations />} />

  {/* 404 Catch-all */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

- [ ] **Step 4: Verify dev server starts without errors**

```bash
# Kill any existing dev servers first
lsof -ti:3000 | xargs kill -9 2>/dev/null
npm run dev
```

Expected: Vite starts on port 3000 without import errors. CogniHub/CogniHubPricing imports will fail until Task 5-7 create those files — that's OK, Suspense handles the error gracefully for now.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: update App.jsx routes to Cogni* paths with legacy redirects"
```

---

### Task 3: Restructure Navbar

**Files:**
- Modify: `src/components/Navbar.jsx`

- [ ] **Step 1: Read the current Navbar.jsx file**

Read the full file to understand the complete component structure, including imports, state, and rendering logic.

- [ ] **Step 2: Update the productMega data structure**

Find the `productMega` object (around line 76) and replace it entirely. Also add any missing icon imports at the top of the file (e.g., `Sparkles`, `Workflow`, `UserCircle`, `Megaphone`). Check existing imports first — add only what's missing.

Replace the `productMega` object with:

```jsx
const productMega = {
  name: 'Products',
  path: '/products/cognivoice',
  mega: true,
  sections: [
    {
      title: 'AI Products',
      items: [
        { name: 'CogniVoice', description: 'AI voice receptionist for phone & web', path: '/products/cognivoice', icon: Phone, iconColor: 'bg-blue-100/70 text-blue-600' },
        { name: 'CogniChat', description: 'AI chatbot for websites & messaging', path: '/products/cognichat', icon: Bot, iconColor: 'bg-blue-100/70 text-blue-600' },
        { name: 'CogniReach Calls', description: 'AI-powered outbound calling campaigns', path: '/products/cognireach-calls', icon: PhoneCall, iconColor: 'bg-blue-100/70 text-blue-600' },
        { name: 'CogniReach SMS', description: 'AI-powered SMS outreach campaigns', path: '/products/cognireach-sms', icon: Smartphone, iconColor: 'bg-blue-100/70 text-blue-600' },
        { name: 'CogniHub', description: 'Multi-model AI workspace for teams', path: '/products/cognihub', icon: Sparkles, iconColor: 'bg-purple-100/70 text-purple-600' },
        { name: 'CogniFlow', description: 'AI workflow automation', path: '/products/cogniflow', icon: TrendingUp, iconColor: 'bg-blue-100/70 text-blue-600' },
        { name: 'CogniAvatar', description: 'AI digital human for engagement', path: '/contact', icon: UserCircle, iconColor: 'bg-purple-100/70 text-purple-600', badge: 'Coming Soon' },
      ]
    },
    {
      title: 'Platform',
      items: [
        { name: 'AI CRM', description: 'Centralizes all interactions and tracks every lead', path: '/products/ai-crm', icon: Database, iconColor: 'bg-blue-100/70 text-blue-600' },
        { name: 'Smart Ticketing', description: 'Auto-creates and routes tickets from every channel', path: '/products/smart-ticketing', icon: Ticket, iconColor: 'bg-blue-100/70 text-blue-600' },
        { name: 'AI Calendar', description: 'Smart scheduling and appointment management', path: '/products/ai-calendar', icon: Calendar, iconColor: 'bg-blue-100/70 text-blue-600' },
        { name: 'Dashboards', description: 'Analytics and reporting', path: '/products/dashboards', icon: BarChart3, iconColor: 'bg-blue-100/70 text-blue-600' },
        { name: 'SMS Agent', description: 'Two-way SMS conversations with leads', path: '/products/sms-agent', icon: MessageSquare, iconColor: 'bg-blue-100/70 text-blue-600' },
      ]
    }
  ]
}
```

- [ ] **Step 3: Add "Coming Soon" badge rendering**

Find where individual dropdown items are rendered (look for the `item.name` text rendering in the desktop mega dropdown). Add badge support. Find the element that renders the item name (it will be something like `<span className="...">{item.name}</span>`) and add after it:

```jsx
{item.badge && (
  <span className="ml-1.5 text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-semibold">
    {item.badge}
  </span>
)}
```

Do the same in the mobile menu rendering section (there will be a similar item name render in the mobile dropdown code).

- [ ] **Step 4: Update icon imports**

At the top of Navbar.jsx, check the existing icon imports from `lucide-react`. Add any missing ones. The new data structure uses: `Phone`, `Bot`, `PhoneCall`, `Smartphone`, `Sparkles`, `TrendingUp`, `UserCircle`, `Database`, `Ticket`, `Calendar`, `BarChart3`, `MessageSquare`. Add `Sparkles` and `UserCircle` if they aren't already imported. Remove `Mic` and `BrainCircuit` if no longer used.

- [ ] **Step 5: Verify the navbar renders correctly**

Open `http://localhost:3000` and hover over the Products dropdown. Verify:
- Two sections: "AI Products" (7 items) and "Platform" (5 items)
- CogniAvatar shows "Coming Soon" badge
- All links navigate to correct routes
- Mobile menu expands correctly

- [ ] **Step 6: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "refactor: restructure navbar into AI Products + Platform groups"
```

---

### Task 4: Update Footer and Home.jsx

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Update Footer product links**

In `src/components/Footer.jsx`, replace the `product` array inside `footerLinks` (lines 8-13) with:

```jsx
product: [
  { name: 'CogniVoice', path: '/products/cognivoice' },
  { name: 'CogniChat', path: '/products/cognichat' },
  { name: 'CogniHub', path: '/products/cognihub' },
  { name: 'CogniReach', path: '/products/cognireach-calls' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Demo', path: '/contact' },
],
```

- [ ] **Step 2: Update Home.jsx product links**

In `src/pages/Home.jsx`, update the 4 product path references:

- Line 783: Change `"/products/web-chatbot"` to `"/products/cognichat"`
- Line 993: Change `"/products/web-chatbot"` to `"/products/cognichat"`
- Lines 1086 and 1172: These link to `/products/ai-calendar` and `/products/dashboards` which stay unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx src/pages/Home.jsx
git commit -m "refactor: update Footer and Home.jsx to use Cogni* product paths"
```

---

### Task 5: Create CogniHub pricing data

**Files:**
- Create: `src/data/cognihubPricing.js`

- [ ] **Step 1: Create the pricing data file**

Create `src/data/cognihubPricing.js` following the exact structure from `src/data/cognichatPricing.js`:

```javascript
export const managedPlans = [
  {
    name: 'Starter',
    price: 69,
    annualPrice: 57,
    subtitle: 'For small teams getting started with multi-model AI',
    users: 3,
    actions: '1,000',
    actionsNum: 1000,
    modelAccess: 'Lite + Standard',
    supportLevel: 'Email (48-hour response)',
    popular: false,
    cta: 'Start Free Trial',
    ctaLink: '/contact',
    color: 'blue',
    features: [
      'Up to 3 team members',
      '1,000 AI actions per month',
      'GPT-4o, Claude Sonnet, Gemini Pro & Lite models',
      'Image generation',
      'Content studio',
      '1 knowledge base',
      '3 AI agents',
      'Full chat interface with model switching',
      '30+ language support',
      'Email support (48-hour response)',
    ],
  },
  {
    name: 'Growth',
    price: 129,
    annualPrice: 107,
    subtitle: 'For growing teams that need more power',
    users: 5,
    actions: '3,000',
    actionsNum: 3000,
    modelAccess: 'Lite + Standard',
    supportLevel: 'Email + chat (24-hour response)',
    popular: false,
    cta: 'Start Free Trial',
    ctaLink: '/contact',
    color: 'blue',
    features: [
      'Everything in Starter, plus:',
      'Up to 5 team members',
      '3,000 AI actions per month',
      '3 knowledge bases',
      '10 AI agents',
      'Code interpreter & artifacts',
      'MCP tool connections',
      'Email + chat support (24-hour response)',
    ],
  },
  {
    name: 'Pro',
    price: 249,
    annualPrice: 207,
    subtitle: 'Full power for teams that depend on AI daily',
    users: 10,
    actions: '10,000',
    actionsNum: 10000,
    modelAccess: 'All tiers (including Premium)',
    supportLevel: 'Priority email + chat (12-hour response)',
    popular: true,
    cta: 'Start Free Trial',
    ctaLink: '/contact',
    color: 'purple',
    features: [
      'Everything in Growth, plus:',
      'Up to 10 team members',
      '10,000 AI actions per month',
      'Premium models: Claude Opus, GPT-4.5, o3, Gemini Ultra',
      '10 knowledge bases',
      'Unlimited AI agents',
      'Share agents across your organization',
      'SSO / OAuth / LDAP authentication',
      'Priority support (12-hour response)',
    ],
  },
  {
    name: 'Business',
    price: 499,
    annualPrice: 415,
    subtitle: 'For organizations running AI at scale',
    users: 25,
    actions: '30,000',
    actionsNum: 30000,
    modelAccess: 'All tiers (including Premium)',
    supportLevel: 'Priority + phone (4-hour response)',
    popular: false,
    cta: 'Contact Sales',
    ctaLink: '/contact',
    color: 'blue',
    features: [
      'Everything in Pro, plus:',
      'Up to 25 team members',
      '30,000 AI actions per month',
      'Unlimited knowledge bases',
      'Advanced agent analytics',
      'Scheduled agent runs',
      'API triggers for agents',
      'Analytics dashboard',
      'Self-host option',
      'Priority + phone support (4-hour response)',
    ],
  },
]

export const byokPlans = [
  {
    name: 'Starter',
    price: 29,
    annualPrice: 24,
    subtitle: 'Bring your own API keys — full control',
    users: 3,
    actions: 'Unlimited',
    modelAccess: 'Lite + Standard',
    supportLevel: 'Email (48-hour response)',
    popular: false,
    cta: 'Start Free Trial',
    ctaLink: '/contact',
    color: 'blue',
    features: [
      'Up to 3 team members',
      'Unlimited AI usage (your API keys)',
      'GPT-4o, Claude Sonnet, Gemini Pro & Lite models',
      'Image generation',
      'Content studio',
      '1 knowledge base',
      '3 AI agents',
      'Full chat interface with model switching',
      '30+ language support',
      'Email support (48-hour response)',
    ],
  },
  {
    name: 'Growth',
    price: 49,
    annualPrice: 41,
    subtitle: 'More power, your keys, your costs',
    users: 5,
    actions: 'Unlimited',
    modelAccess: 'Lite + Standard',
    supportLevel: 'Email + chat (24-hour response)',
    popular: false,
    cta: 'Start Free Trial',
    ctaLink: '/contact',
    color: 'blue',
    features: [
      'Everything in Starter, plus:',
      'Up to 5 team members',
      '3 knowledge bases',
      '10 AI agents',
      'Code interpreter & artifacts',
      'MCP tool connections',
      'Email + chat support (24-hour response)',
    ],
  },
  {
    name: 'Pro',
    price: 99,
    annualPrice: 82,
    subtitle: 'Full platform, full control',
    users: 10,
    actions: 'Unlimited',
    modelAccess: 'All tiers (including Premium)',
    supportLevel: 'Priority email + chat (12-hour response)',
    popular: true,
    cta: 'Start Free Trial',
    ctaLink: '/contact',
    color: 'purple',
    features: [
      'Everything in Growth, plus:',
      'Up to 10 team members',
      'Premium models: Claude Opus, GPT-4.5, o3, Gemini Ultra',
      '10 knowledge bases',
      'Unlimited AI agents',
      'Share agents across your organization',
      'SSO / OAuth / LDAP authentication',
      'Priority support (12-hour response)',
    ],
  },
  {
    name: 'Business',
    price: 199,
    annualPrice: 165,
    subtitle: 'Enterprise platform, your infrastructure',
    users: 25,
    actions: 'Unlimited',
    modelAccess: 'All tiers (including Premium)',
    supportLevel: 'Priority + phone (4-hour response)',
    popular: false,
    cta: 'Contact Sales',
    ctaLink: '/contact',
    color: 'blue',
    features: [
      'Everything in Pro, plus:',
      'Up to 25 team members',
      'Unlimited knowledge bases',
      'Advanced agent analytics',
      'Scheduled agent runs',
      'API triggers for agents',
      'Analytics dashboard',
      'Self-host option',
      'Priority + phone support (4-hour response)',
    ],
  },
]

export const addOns = [
  { name: 'Extra users', price: '$5/user/mo', description: 'Add team members beyond your tier limit' },
  { name: 'Action top-up (100)', price: '$10', description: 'One-time pack of 100 AI actions (Managed only)' },
  { name: 'Action top-up (500)', price: '$40', description: 'One-time pack of 500 AI actions (Managed only)' },
  { name: 'Action top-up (2,500)', price: '$150', description: 'One-time pack of 2,500 AI actions (Managed only)' },
]

export const billingTerms = [
  'Monthly billing, billed at start of each period',
  'Annual billing saves 17% (pay for 10 months, get 12)',
  '14-day free trial, no credit card required',
  'Setup fee ($999) waived through summer 2026',
  'AI actions reset monthly, do not roll over (Managed)',
  'Upgrade instantly with prorated billing',
  'Cancel anytime on monthly plans',
]

export const faqs = [
  {
    question: 'What is the difference between Managed and BYOK?',
    answer: 'Managed means CogniDrift handles all AI infrastructure — you pay one bill and AI usage is included as "actions." BYOK (Bring Your Own Keys) means you plug in your own OpenAI/Anthropic/Google API keys and pay providers directly. CogniDrift charges only the platform fee.',
  },
  {
    question: 'What counts as an AI action?',
    answer: 'A standard text query to GPT-4o or Claude Sonnet costs 1 action. Lite models (GPT-4o-mini, Gemini Flash) cost 0.2 actions. Premium models (Claude Opus, GPT-4.5) cost 3 actions. Image generation costs 5 actions.',
  },
  {
    question: 'What happens when I run out of actions?',
    answer: 'Lite models stay available at overage rates so you are never locked out. Standard and Premium models lock until you upgrade or purchase a top-up pack.',
  },
  {
    question: 'Can I switch between Managed and BYOK?',
    answer: 'Yes, you can switch at any time. Your workspace, agents, and knowledge bases carry over. Only the billing model changes.',
  },
  {
    question: 'Which AI models are available?',
    answer: 'GPT-4o, GPT-4o-mini, Claude Sonnet, Claude Opus, Gemini Pro, Gemini Flash, Gemini Ultra, Mistral, Qwen, DeepSeek, and more. Premium models (Opus, GPT-4.5, o3, Gemini Ultra) are available on Pro and Business tiers.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes — 14 days free on any plan, no credit card required.',
  },
  {
    question: 'Can I self-host CogniHub?',
    answer: 'Self-hosting is available on the Business tier. Deploy on your own infrastructure for regulated industries and full data control.',
  },
  {
    question: 'How do AI agents work?',
    answer: 'Agents are custom AI workflows that execute multi-step tasks using tools, API actions, and your knowledge bases. Create agents on any tier — actions are consumed per agent run step.',
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/cognihubPricing.js
git commit -m "feat: add CogniHub pricing data with Managed and BYOK tracks"
```

---

### Task 6: Create CogniHub pricing cards component

**Files:**
- Create: `src/components/CogniHubPricingCards.jsx`

- [ ] **Step 1: Create the pricing cards component with Managed/BYOK toggle**

Create `src/components/CogniHubPricingCards.jsx`. This component follows the `CogniChatPricingCards.jsx` pattern but adds a Managed/BYOK toggle above the Monthly/Annual toggle:

```jsx
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { managedPlans, byokPlans } from '../data/cognihubPricing'

const colorSchemes = {
  blue: {
    bg: 'bg-blue-500',
    light: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    glow: 'shadow-blue-500/20',
  },
  purple: {
    bg: 'bg-purple-500',
    light: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    glow: 'shadow-purple-500/20',
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const CogniHubPricingCards = () => {
  const [pricingTrack, setPricingTrack] = useState('managed')
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  const plans = pricingTrack === 'managed' ? managedPlans : byokPlans

  return (
    <div>
      {/* Managed / BYOK Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-center mb-6"
      >
        <div className="inline-flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setPricingTrack('managed')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              pricingTrack === 'managed'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Managed (AI Included)
          </button>
          <button
            onClick={() => setPricingTrack('byok')}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              pricingTrack === 'byok'
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            BYOK (Your Keys)
          </button>
        </div>
      </motion.div>

      {/* Billing Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-4 mb-12"
      >
        <span className={`text-lg font-semibold transition-colors ${billingPeriod === 'monthly' ? 'text-primary-600' : 'text-text-muted'}`}>
          Monthly
        </span>
        <motion.button
          onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
          className={`relative w-16 h-8 rounded-full transition-colors ${
            billingPeriod === 'yearly' ? 'bg-primary-600' : 'bg-gray-300'
          }`}
        >
          <motion.div
            animate={{ x: billingPeriod === 'yearly' ? 32 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-lg"
          />
        </motion.button>
        <span className={`text-lg font-semibold transition-colors ${billingPeriod === 'yearly' ? 'text-primary-600' : 'text-text-muted'}`}>
          Annual
        </span>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: billingPeriod === 'yearly' ? 1 : 0 }}
          className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold"
        >
          Save 17%
        </motion.span>
      </motion.div>

      {/* Pricing Cards Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {plans.map((plan) => {
          const colors = colorSchemes[plan.color]
          const price = billingPeriod === 'yearly' ? plan.annualPrice : plan.price

          return (
            <motion.div
              key={`${pricingTrack}-${plan.name}`}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? `border-2 ${colors.border} ${colors.glow} shadow-2xl scale-[1.02]`
                  : 'border-2 border-neutral-border hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className={`${colors.bg} text-white text-center py-2.5 font-bold text-xs uppercase tracking-wider`}>
                  Most Popular
                </div>
              )}

              <div className={`p-6 ${plan.popular ? '' : 'pt-6'}`}>
                <h3 className="text-xl font-bold text-text-primary mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4">{plan.subtitle}</p>

                <div className="mb-4">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold text-text-primary">${price}</span>
                    <span className="text-text-secondary mb-1">/mo</span>
                  </div>
                  {billingPeriod === 'yearly' && (
                    <p className="text-xs text-green-600 font-semibold mt-1">
                      Billed annually, save ${(plan.price - plan.annualPrice) * 12}/yr
                    </p>
                  )}
                </div>

                <p className="text-sm font-semibold text-primary-600 mb-1">
                  Up to {plan.users} users
                </p>
                <p className="text-sm font-semibold text-primary-600 mb-4">
                  {typeof plan.actions === 'string' ? plan.actions + ' AI usage' : plan.actions + ' AI actions/mo'}
                </p>

                <Link to={plan.ctaLink} className="block mb-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2 ${
                      plan.popular
                        ? `${colors.bg} text-white hover:shadow-xl`
                        : 'bg-neutral-100 text-text-primary hover:bg-neutral-200'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>

                <div className="h-px bg-neutral-border mb-4"></div>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className={`flex-shrink-0 w-5 h-5 ${colors.light} rounded-full flex items-center justify-center mt-0.5`}>
                        <Check className={`w-3 h-3 ${colors.text}`} />
                      </div>
                      <span className="text-sm text-text-secondary leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gradient-to-t from-primary-100/40 to-transparent blur-2xl pointer-events-none"></div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default CogniHubPricingCards
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CogniHubPricingCards.jsx
git commit -m "feat: add CogniHub pricing cards component with Managed/BYOK toggle"
```

---

### Task 7: Create CogniHub product page

**Files:**
- Create: `src/pages/products/CogniHub.jsx`

- [ ] **Step 1: Create the full CogniHub product page**

Create `src/pages/products/CogniHub.jsx` following the exact WebChatbot.jsx (now CogniChat.jsx) pattern — same section layout, same card styles, same animation variants:

```jsx
import SEOMeta from '../../components/SEOMeta'
import { motion } from 'framer-motion'
import { Sparkles, Bot, Database, Code, Users, Zap, CheckCircle2, ArrowRight, Globe, BarChart3, Shield, Headphones } from 'lucide-react'
import { Link } from 'react-router-dom'
import CogniHubPricingCards from '../../components/CogniHubPricingCards'
import { usePageAnimation } from '../../utils/useFirstMount'

const CogniHub = () => {
  const { heroInitial, heroAnimate, iconInitial, iconAnimate } = usePageAnimation()

  const features = [
    {
      icon: Sparkles,
      title: 'Multi-Model Access',
      description: 'Access GPT-4o, Claude, Gemini, Mistral, and more. Switch models mid-conversation for the right AI on every task.'
    },
    {
      icon: Bot,
      title: 'AI Agents',
      description: 'Create agents that execute multi-step tasks with tools, API actions, and custom logic. Share across your organization.'
    },
    {
      icon: Database,
      title: 'Knowledge Base',
      description: 'Upload your docs, product info, and FAQs. AI answers grounded in your business data with RAG technology.'
    },
    {
      icon: Code,
      title: 'Code Interpreter',
      description: 'Run code, generate charts, and create interactive artifacts directly in chat. Full development environment built in.'
    }
  ]

  const benefits = [
    { icon: BarChart3, text: 'One bill replaces 3+ AI subscriptions' },
    { icon: Shield, text: 'Enterprise auth: SSO, OAuth, LDAP, 2FA' },
    { icon: Zap, text: 'Bring your own API keys for full control' },
    { icon: Users, text: 'Team workspaces with shared agents' },
    { icon: Globe, text: '30+ language support out of the box' },
    { icon: Headphones, text: 'Priority support with onboarding' }
  ]

  const stats = [
    { value: '10+', label: 'AI Models' },
    { value: '<1s', label: 'Response Time' },
    { value: '30+', label: 'Languages' },
    { value: '99.9%', label: 'Uptime' }
  ]

  const useCases = [
    {
      title: 'Small Teams',
      description: 'Stop paying for ChatGPT AND Claude AND Gemini separately. One platform, all models, one bill.',
      features: ['Multi-model access', 'Shared workspace', 'Simple billing']
    },
    {
      title: 'SaaS Companies',
      description: 'Build custom AI agents for support, onboarding, and internal workflows.',
      features: ['Agent builder', 'Knowledge bases', 'API integrations']
    },
    {
      title: 'Agencies',
      description: 'Give every client project the right AI model. Manage teams and usage from one dashboard.',
      features: ['Team management', 'Usage analytics', 'Client separation']
    },
    {
      title: 'Education',
      description: 'Access frontier models for research, teaching, and content creation at team-friendly pricing.',
      features: ['All model tiers', 'Code interpreter', 'Content studio']
    }
  ]

  return (
    <div className="min-h-screen">
      <SEOMeta
        title="CogniHub - Multi-Model AI Workspace for Teams"
        description="Access GPT, Claude, Gemini, Mistral and more in one workspace. AI agents, knowledge bases, code interpreter, and team management. Managed or BYOK."
        keywords="multi-model AI, AI workspace, GPT Claude Gemini, AI agents, knowledge base, team AI platform"
        url="/products/cognihub"
      />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={heroInitial}
            animate={heroAnimate}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
              <motion.div
                initial={iconInitial}
                animate={iconAnimate}
                transition={{ duration: 0.5, type: 'spring' }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100/70 rounded-xl flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
                <span className="text-purple-600">CogniHub</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Every AI model. One workspace. Your whole team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-neutral-offWhite border-y border-gray-100">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-text-secondary font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Powerful <span className="text-purple-600">Features</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Everything your team needs in one AI workspace
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const colorSchemes = [
                { lightBg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200', glow: 'shadow-blue-500/20', bg: 'bg-blue-500' },
                { lightBg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200', glow: 'shadow-purple-500/20', bg: 'bg-purple-500' },
                { lightBg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-200', glow: 'shadow-cyan-500/20', bg: 'bg-cyan-500' },
                { lightBg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-200', glow: 'shadow-teal-500/20', bg: 'bg-teal-500' },
              ]
              const colors = colorSchemes[index % colorSchemes.length]
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative h-full bg-white rounded-2xl p-6 sm:p-8 border-2 ${colors.border} overflow-hidden shadow-md hover:shadow-xl ${colors.glow} transition-all duration-500`}
                  >
                    <div className={`absolute inset-0 ${colors.lightBg} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                    <motion.div className={`absolute -top-10 -right-10 w-32 h-32 ${colors.bg} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className={`inline-flex w-12 h-12 ${colors.lightBg} rounded-xl items-center justify-center mb-4 shadow-md group-hover:shadow-xl transition-shadow`}
                      >
                        <Icon className={`w-6 h-6 ${colors.icon}`} />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 group-hover:text-primary-600 transition-colors">{feature.title}</h3>
                      <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                    </div>

                    <div className={`absolute bottom-0 right-0 w-16 h-16 ${colors.bg} opacity-5 rounded-tl-full transition-all duration-500 group-hover:w-24 group-hover:h-24`} />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Built for <span className="text-purple-600">Your Team</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              One AI platform for every team and workflow
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3">{useCase.title}</h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 border border-gray-100"
          >
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Why Teams Choose <span className="text-purple-600">CogniHub</span>
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
                One platform replaces multiple AI subscriptions
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-purple-50/50 hover:bg-purple-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-purple-100/70 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-text-primary font-medium">{benefit.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Simple, transparent <span className="text-purple-600">pricing</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Choose Managed for simplicity or BYOK for full control. Upgrade or cancel anytime.
            </p>
          </motion.div>

          <CogniHubPricingCards />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/products/cognihub/pricing"
              className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
            >
              Compare all plans in detail
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-primary-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 text-center relative overflow-hidden border-2 border-purple-100"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6 relative z-10 border border-purple-100">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Get Started</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 sm:mb-6 relative z-10">
              Ready to <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">Unify Your Team's AI?</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 relative z-10">
              Stop paying for multiple AI subscriptions. One platform, every model, your whole team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto btn-primary px-8 py-4 text-lg"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/resources/case-studies">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all duration-300"
                >
                  View Case Studies
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CogniHub
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/products/CogniHub.jsx
git commit -m "feat: add CogniHub product page with features, use cases, pricing, and CTA"
```

---

### Task 8: Create CogniHub detailed pricing page

**Files:**
- Create: `src/pages/products/CogniHubPricing.jsx`

- [ ] **Step 1: Read the existing CogniVoicePricing.jsx or CogniChatPricing.jsx for the pattern**

Read whichever of the detailed pricing pages exists to understand the layout: feature comparison table, add-ons section, FAQ accordion, CTA.

- [ ] **Step 2: Create the CogniHub detailed pricing page**

Create `src/pages/products/CogniHubPricing.jsx` following the same pattern as the existing pricing pages. This page includes:
- SEOMeta
- CogniHubPricingCards component at the top
- Feature comparison table (with Managed/BYOK toggle reused from the cards component or inline)
- Add-ons section
- Billing terms
- FAQ accordion
- CTA

The implementer should read the existing `CogniVoicePricing.jsx` (now `src/pages/products/CogniVoicePricing.jsx`) and follow the exact same layout, replacing CogniVoice-specific content with CogniHub content from `src/data/cognihubPricing.js`.

Key sections:
- Hero: "CogniHub Pricing" title
- Pricing cards: `<CogniHubPricingCards />`
- Add-ons: map over `addOns` from cognihubPricing.js
- Billing terms: map over `billingTerms` from cognihubPricing.js
- FAQ: map over `faqs` from cognihubPricing.js with expand/collapse state
- CTA: "Ready to get started?" with contact link

- [ ] **Step 3: Commit**

```bash
git add src/pages/products/CogniHubPricing.jsx
git commit -m "feat: add CogniHub detailed pricing page with comparison, add-ons, and FAQ"
```

---

### Task 9: Add "Deploy Anywhere" section to CogniVoice

**Files:**
- Modify: `src/pages/products/CogniVoice.jsx`

- [ ] **Step 1: Read the current CogniVoice.jsx file**

Read the full file to understand the section structure and find the right insertion point (between features and pricing sections).

- [ ] **Step 2: Add the "Deploy Anywhere" section**

Find the section boundary between the features section and the pricing/benefits section. Insert a new section between them:

```jsx
{/* Deploy Anywhere Section */}
<section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
  <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 sm:mb-16"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
        Deploy <span className="text-blue-600">Anywhere</span>
      </h2>
      <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
        One AI receptionist, two ways to connect with customers
      </p>
    </motion.div>

    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group"
      >
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative h-full bg-white rounded-2xl p-6 sm:p-8 border-2 border-blue-200 overflow-hidden shadow-md hover:shadow-xl shadow-blue-500/20 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-blue-50 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="relative z-10">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-12 h-12 bg-blue-50 rounded-xl items-center justify-center mb-4 shadow-md"
            >
              <Phone className="w-6 h-6 text-blue-600" />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">Phone Line</h3>
            <p className="text-text-secondary leading-relaxed mb-4">Your AI receptionist answers inbound calls 24/7. Customers call your business number and speak naturally with the AI.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                Toll-free or local numbers
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                Call recording & transcription
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                Transfer to live agents
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="group"
      >
        <motion.div
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative h-full bg-white rounded-2xl p-6 sm:p-8 border-2 border-purple-200 overflow-hidden shadow-md hover:shadow-xl shadow-purple-500/20 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-purple-50 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="relative z-10">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-12 h-12 bg-purple-50 rounded-xl items-center justify-center mb-4 shadow-md"
            >
              <Mic className="w-6 h-6 text-purple-600" />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3">Web Widget</h3>
            <p className="text-text-secondary leading-relaxed mb-4">Embed a voice-enabled widget on your website. Visitors click to speak with your AI directly in the browser.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                One-line embed code
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                Custom branding
              </li>
              <li className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                Works on mobile
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
</section>
```

Make sure `Phone`, `Mic`, and `CheckCircle2` are imported at the top of the file. Add any missing imports.

- [ ] **Step 3: Commit**

```bash
git add src/pages/products/CogniVoice.jsx
git commit -m "feat: add Deploy Anywhere section to CogniVoice (phone + web voice)"
```

---

### Task 10: Final verification

- [ ] **Step 1: Kill stale dev servers and start fresh**

```bash
lsof -ti:3000 -ti:3001 -ti:3002 | xargs kill -9 2>/dev/null
cd /Users/qratul/research_and_dev/cognidrift_website/frontend && npm run dev
```

- [ ] **Step 2: Verify all routes work**

Open each new route in the browser and verify no errors:
- `http://localhost:3000/products/cognivoice` — CogniVoice page loads, hero says "CogniVoice", "Deploy Anywhere" section visible
- `http://localhost:3000/products/cognichat` — CogniChat page loads
- `http://localhost:3000/products/cognireach-calls` — CogniReach Calls page loads
- `http://localhost:3000/products/cognireach-sms` — CogniReach SMS page loads
- `http://localhost:3000/products/cogniflow` — CogniFlow page loads
- `http://localhost:3000/products/cognihub` — CogniHub page loads with features, use cases, pricing toggle
- `http://localhost:3000/products/cognihub/pricing` — CogniHub pricing page loads

- [ ] **Step 3: Verify redirects work**

- `http://localhost:3000/products/phone-receptionist` → redirects to `/products/cognivoice`
- `http://localhost:3000/products/web-chatbot` → redirects to `/products/cognichat`
- `http://localhost:3000/products/multi-model-chat` → redirects to `/products/cognihub`

- [ ] **Step 4: Verify navbar**

- Hover Products dropdown: shows "AI Products" (7 items) and "Platform" (5 items)
- CogniAvatar shows "Coming Soon" badge
- All links navigate to correct new routes
- Mobile hamburger menu works with new structure

- [ ] **Step 5: Verify footer**

- Footer shows CogniVoice, CogniChat, CogniHub, CogniReach links
- All links navigate correctly

- [ ] **Step 6: Verify CogniHub pricing toggle**

- On CogniHub page, scroll to pricing
- Toggle Managed/BYOK — prices change (Starter: $69 ↔ $29)
- Toggle Monthly/Annual — prices change with "Save 17%" badge
- Pro card highlighted as "Most Popular"

- [ ] **Step 7: Commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address issues found during final verification"
```
