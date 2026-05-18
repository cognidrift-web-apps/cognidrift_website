# Phase 1: Cogni* Product Rebrand + CogniHub Page

## Goal

Rename 5 existing website products to their Cogni* branded names, merge Web Voicebot into CogniVoice, reorganize the navbar into "AI Products" + "Platform" groups, and build a full CogniHub product page with dual-track pricing (Managed/BYOK toggle).

## Scope

- Rename products across navbar, routes, page titles, SEO meta, footer
- Reorganize navbar into 2 groups
- Build CogniHub product page, pricing page, pricing data, and pricing cards component
- Merge Web Voicebot content into CogniVoice page
- Add route redirects for old URLs
- CogniAvatar appears in navbar as "Coming Soon" (full page is Phase 2)

**Out of scope:** CogniAvatar full product page, pricing strategy changes, homepage redesign, platform tool renames (CRM, Calendar, etc. stay as-is).

---

## 1. Product Rename Map

| Current Name | New Name | Old Route | New Route |
|---|---|---|---|
| AI Receptionist | CogniVoice | `/products/phone-receptionist` | `/products/cognivoice` |
| AI Chatbot | CogniChat | `/products/web-chatbot` | `/products/cognichat` |
| AI Web Voicebot | *(merged into CogniVoice)* | `/products/web-voicebot` | redirect → `/products/cognivoice` |
| Automated Calls | CogniReach Calls | `/products/automated-calls` | `/products/cognireach-calls` |
| Automated SMS | CogniReach SMS | `/products/automated-sms` | `/products/cognireach-sms` |
| AI Automation | CogniFlow | `/products/ai-automation` | `/products/cogniflow` |
| Multi-Model AI Chat | CogniHub | `/products/multi-model-chat` | `/products/cognihub` |

**Pricing routes:**
- `/products/phone-receptionist/pricing` → `/products/cognivoice/pricing`
- `/products/web-chatbot/pricing` → `/products/cognichat/pricing`
- `/products/cognihub/pricing` (new)

---

## 2. File Changes

### 2.1 File Renames (src/pages/products/)

| Old File | New File |
|---|---|
| PhoneReceptionist.jsx | CogniVoice.jsx |
| PhoneReceptionistPricing.jsx | CogniVoicePricing.jsx |
| WebChatbot.jsx | CogniChat.jsx |
| WebChatbotPricing.jsx | CogniChatPricing.jsx |
| AutomatedCalls.jsx | CogniReachCalls.jsx |
| AutomatedSms.jsx | CogniReachSms.jsx |
| AiAutomation.jsx | CogniFlow.jsx |
| MultiModelChat.jsx | *(deleted, replaced by CogniHub.jsx)* |
| WebVoicebot.jsx | *(deleted, content merged into CogniVoice.jsx)* |

### 2.2 New Files

| File | Purpose |
|---|---|
| src/pages/products/CogniHub.jsx | Full product page |
| src/pages/products/CogniHubPricing.jsx | Detailed pricing comparison page |
| src/data/cognihubPricing.js | Pricing tiers, features, add-ons data |
| src/components/CogniHubPricingCards.jsx | Pricing cards with Managed/BYOK toggle |

### 2.3 Modified Files

| File | Changes |
|---|---|
| src/App.jsx | Update all lazy imports, new routes, add `<Navigate>` redirects for old URLs |
| src/components/Navbar.jsx | Restructure product groups, rename items, add CogniReach submenu, CogniAvatar "Coming Soon" |
| src/components/Footer.jsx | Update product link names and paths |
| src/pages/Home.jsx | Update any product name references |
| src/components/CogniVoicePricingCards.jsx | Update component name if needed |
| src/components/CogniChatPricingCards.jsx | Update component name if needed |

---

## 3. Navbar Structure

Two groups replacing the current four:

### AI Products
| Item | Description | Path | Icon |
|---|---|---|---|
| CogniVoice | AI voice receptionist (phone + web) | /products/cognivoice | Phone |
| CogniChat | AI chatbot for websites | /products/cognichat | Bot |
| CogniReach | AI outbound campaigns | *(hover submenu)* | Megaphone |
|   ↳ CogniReach Calls | AI-powered outbound calling | /products/cognireach-calls | PhoneOutgoing |
|   ↳ CogniReach SMS | AI SMS campaigns | /products/cognireach-sms | MessageSquare |
| CogniHub | Multi-model AI workspace | /products/cognihub | Brain/Sparkles |
| CogniFlow | AI workflow automation | /products/cogniflow | Workflow |
| CogniAvatar | AI digital human | /contact | UserCircle + "Coming Soon" badge |

### Platform
| Item | Description | Path | Icon |
|---|---|---|---|
| AI CRM | Centralizes all interactions | /products/ai-crm | Database |
| Smart Ticketing | Auto-creates and routes tickets | /products/smart-ticketing | Ticket |
| AI Calendar | Smart scheduling | /products/ai-calendar | Calendar |
| Dashboards | Analytics & reporting | /products/dashboards | BarChart3 |
| SMS Agent | Two-way SMS conversations | /products/sms-agent | MessageSquare |

**CogniReach submenu behavior:** On desktop, hovering CogniReach shows a small flyout with "Calls" and "SMS". On mobile, tapping CogniReach expands to show both sub-items inline.

**CogniAvatar "Coming Soon":** Styled with a small pill badge (e.g., `text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full`) next to the name. Links to `/contact` as a lead capture placeholder until Phase 2.

---

## 4. CogniHub Product Page

Follow the WebChatbot.jsx page pattern exactly for layout, spacing, card styles, and animations.

### 4.1 Hero Section
- Compact layout: inline icon (Sparkles or Brain) left of "CogniHub" title
- Subtitle: "Every AI model. One workspace. Your whole team."
- No CTA buttons in hero (matching CogniChat pattern)
- Below subtitle: a demo showcase area (max-w-2xl, bottom fade mask, opacity-90)
  - Reuse a simplified version showing model icons (GPT, Claude, Gemini logos) or skip demo for v1 and use a static illustration/gradient card

### 4.2 Stats Bar
Same pattern as CogniChat — 4 stats in a bordered section:
- `10+` Models Available
- `<1s` Response Time
- `30+` Languages
- `99.9%` Uptime

### 4.3 Features Section — "Powerful Features"
4 premium cards with the WebChatbot card style (colored borders, decorative circles, glow shadows, spring animations):

1. **Multi-Model Access** (blue scheme)
   - Icon: Sparkles
   - "Access GPT-4o, Claude, Gemini, Mistral, and more. Switch models mid-conversation for the right AI on every task."

2. **AI Agents** (purple scheme)
   - Icon: Bot
   - "Create agents that execute multi-step tasks with tools, API actions, and custom logic. Share across your organization."

3. **Knowledge Base** (cyan scheme)
   - Icon: Database
   - "Upload your docs, product info, and FAQs. AI answers grounded in your business data with RAG technology."

4. **Code Interpreter** (teal scheme)
   - Icon: Code
   - "Run code, generate charts, and create interactive artifacts directly in chat. Full development environment built in."

### 4.4 Use Cases Section — "Built for Your Team"
4 simple cards (same style as CogniChat "Built for Your Industry"):

1. **Small Teams (2-10)** — Stop paying for ChatGPT AND Claude AND Gemini separately. One platform, all models, one bill.
   - Features: Multi-model access, Shared workspace, Simple billing

2. **SaaS Companies** — Build custom AI agents for support, onboarding, and internal workflows.
   - Features: Agent builder, Knowledge bases, API integrations

3. **Agencies & Consultants** — Give every client project the right AI model. Manage teams and usage from one dashboard.
   - Features: Team management, Usage analytics, Client separation

4. **Education & Research** — Access frontier models for research, teaching, and content creation at team-friendly pricing.
   - Features: All model tiers, Code interpreter, Content studio

### 4.5 Benefits Section — "Why Teams Choose CogniHub"
6 items in the same card grid as CogniChat:

1. BarChart3 — "One bill replaces 3+ AI subscriptions"
2. Shield — "Enterprise auth: SSO, OAuth, LDAP, 2FA"
3. Zap — "Bring your own API keys for full control"
4. Users — "Team workspaces with shared agents"
5. Globe — "30+ language support out of the box"
6. Headphones — "Priority support with onboarding"

### 4.6 Pricing Section
- Section header: "Simple, transparent pricing"
- Subtitle: "Choose Managed for simplicity or BYOK for full control."
- `<CogniHubPricingCards />` component (see Section 5)
- "Compare all plans in detail" link → `/products/cognihub/pricing`

### 4.7 CTA Section
Same gradient CTA pattern as CogniChat:
- Badge: "Get Started"
- Title: "Ready to Unify Your Team's AI?"
- Subtitle: "Stop paying for multiple AI subscriptions. One platform, every model."
- Buttons: "Get Started Today" + "View Case Studies"

---

## 5. CogniHub Pricing

### 5.1 Pricing Data (src/data/cognihubPricing.js)

Two pricing tracks toggled by user:

**Managed Track (AI Included):**

| Tier | Price/mo | Annual/mo | Users | AI Actions |
|---|---|---|---|---|
| Starter | $69 | $57 | Up to 3 | 1,000 |
| Growth | $129 | $107 | Up to 5 | 3,000 |
| Pro (Popular) | $249 | $207 | Up to 10 | 10,000 |
| Business | $499 | $415 | Up to 25 | 30,000 |

**BYOK Track (Platform Only):**

| Tier | Price/mo | Annual/mo | Users | AI Actions |
|---|---|---|---|---|
| Starter | $29 | $24 | Up to 3 | Unlimited (your keys) |
| Growth | $49 | $41 | Up to 5 | Unlimited (your keys) |
| Pro (Popular) | $99 | $82 | Up to 10 | Unlimited (your keys) |
| Business | $199 | $165 | Up to 25 | Unlimited (your keys) |

**Feature gates per tier** (same for both tracks):

| Feature | Starter | Growth | Pro | Business |
|---|---|---|---|---|
| AI model access | Lite + Standard | Lite + Standard | All tiers | All tiers |
| Image generation | Yes | Yes | Yes | Yes |
| Content studio | Yes | Yes | Yes | Yes |
| Knowledge bases | 1 | 3 | 10 | Unlimited |
| Agent builder | 3 agents | 10 agents | Unlimited | Unlimited |
| Agent sharing | No | No | Yes | Yes |
| Code interpreter | No | Yes | Yes | Yes |
| MCP connections | No | Yes | Yes | Yes |
| SSO/OAuth/LDAP | No | No | Yes | Yes |
| Analytics dashboard | No | No | No | Yes |
| Self-host option | No | No | No | Yes |
| Priority support | No | No | Yes | Yes |

**Add-ons:**
- Extra users: $5/user/mo
- AI action top-up (Managed only): 100 for $10, 500 for $40, 2,500 for $150

**Billing terms:** 14-day free trial, annual saves 17%, setup $999 (waived through summer 2026).

### 5.2 Pricing Cards Component (src/components/CogniHubPricingCards.jsx)

- **Toggle at top:** Two-option pill toggle — "Managed (AI Included)" / "BYOK (Your Keys)"
  - Active state: filled background (blue-600 text-white)
  - Inactive: transparent with border
  - Animated slide indicator behind active option
- **Monthly/Annual toggle** below the Managed/BYOK toggle (same pattern as existing pricing cards)
- **4 tier cards** that update prices when toggling Managed↔BYOK
  - Pro tier highlighted as "Popular" with blue border + badge
  - Enterprise/Business shows "Contact Sales" button instead of price
  - Each card: tier name, price, billing period, user count, action count (Managed) or "Unlimited" (BYOK), feature checklist, CTA button

### 5.3 Detailed Pricing Page (src/pages/products/CogniHubPricing.jsx)

Follow the same pattern as CogniVoicePricing.jsx / CogniChatPricing.jsx:
- Full feature comparison table
- Managed/BYOK toggle at top
- Add-ons section
- FAQ section
- CTA at bottom

---

## 6. CogniVoice — Web Voice Merge

The renamed CogniVoice page (formerly PhoneReceptionist.jsx) gets a new section:

**"Deploy Anywhere" section** added between existing features and pricing:
- Two cards side by side:
  1. **Phone Line** — Icon: Phone — "Your AI receptionist answers inbound calls 24/7. Customers call your business number and speak naturally with the AI."
     - Bullets: Toll-free or local numbers, Call recording & transcription, Transfer to live agents
  2. **Web Widget** — Icon: Mic — "Embed a voice-enabled widget on your website. Visitors click to speak with your AI directly in the browser."
     - Bullets: One-line embed code, Custom branding, Works on mobile

Content from `WebVoicebot.jsx` is absorbed into these cards and bullets. The standalone WebVoicebot page is deleted.

---

## 7. Route Redirects

In App.jsx, add `<Navigate>` components for all old routes:

```jsx
import { Navigate } from 'react-router-dom'

// Old routes → new routes
<Route path="/products/phone-receptionist" element={<Navigate to="/products/cognivoice" replace />} />
<Route path="/products/phone-receptionist/pricing" element={<Navigate to="/products/cognivoice/pricing" replace />} />
<Route path="/products/web-chatbot" element={<Navigate to="/products/cognichat" replace />} />
<Route path="/products/web-chatbot/pricing" element={<Navigate to="/products/cognichat/pricing" replace />} />
<Route path="/products/web-voicebot" element={<Navigate to="/products/cognivoice" replace />} />
<Route path="/products/automated-calls" element={<Navigate to="/products/cognireach-calls" replace />} />
<Route path="/products/automated-sms" element={<Navigate to="/products/cognireach-sms" replace />} />
<Route path="/products/ai-automation" element={<Navigate to="/products/cogniflow" replace />} />
<Route path="/products/multi-model-chat" element={<Navigate to="/products/cognihub" replace />} />
```

---

## 8. Footer Updates

Update the Footer product links section to reflect new names and paths. Keep the same structure (Products, Industries, Resources, Company columns), just update the product entries.

---

## 9. Home.jsx Updates

Scan for any hardcoded product names in the homepage and update to Cogni* names. Key areas:
- Feature section cards (if they reference product names)
- Any "Learn More" links pointing to old routes
- CTA sections mentioning specific products

---

## 10. Style Reference

All new pages and components follow the WebChatbot.jsx premium card pattern:
- Feature cards: colored borders (`border-2 border-{color}-200`), decorative background circles (`absolute -top-10 -right-10 w-32 h-32 bg-{color} opacity-10 rounded-full blur-2xl`), glow shadows (`shadow-md hover:shadow-xl shadow-{color}-500/20`), spring hover animations (`whileHover={{ y: -6, scale: 1.02 }}`), background tint on hover
- Use case cards: simple white cards with shadow, checkmark feature lists
- Benefits section: wrapped in outer card with icon + text rows, blue-50 hover backgrounds
- Pricing cards: match existing CogniVoice/CogniChat card patterns with Popular badge highlight
