# Multi-Channel AI Conversation Showcase - Design Spec

> Fixes the AIConversationFlow layout instability (CLS) on the Homepage, adds multi-channel tab switching, updates the section header copy, and reuses the component on the CogniChat product page hero.

## Problem

The current `AIConversationFlow` component on the Homepage causes **Cumulative Layout Shift (CLS)**:
- Container uses `min-h-[280px]` with no max/fixed height
- Messages are added one at a time via character-by-character typing
- Each new message increases the container height by ~40-60px
- After 4 messages, the widget resets and shrinks back -- repeating the cycle
- Everything below the section (features, footer) jumps up and down

Additionally:
- The section header says "Your AI Web Widget" -- too narrow; CogniChat is multi-channel (web, SMS, WhatsApp, Slack, Teams)
- The widget only shows a web chat conversation -- doesn't reflect multi-channel capability

## Scope

Two locations, one reusable component:

1. **Homepage** -- "Your AI Web Widget" section (rename + fix widget)
2. **CogniChat product page** (`WebChatbot.jsx`) -- add showcase below hero CTAs

## What Changes

### 1. Section Header (Homepage only)

**Current:**
- Badge: `AI Chatting`
- Title: `Your AI Web Widget`
- Subtitle: `A simple, powerful process that transforms how you answer queries.`

**New:**
- Badge: `AI ASSISTANT`
- Title: `Every Customer Answered. Every Channel Covered.`
- Subtitle: `Your AI handles conversations on web chat, text, WhatsApp, and more -- capturing leads and booking appointments while you sleep.`

Update the left-column workflow steps to match multi-channel story:
1. **Customer Reaches Out** -- "On your website, SMS, WhatsApp, or Slack -- your AI is already there."
2. **AI Responds Instantly** -- "Answers questions, shares info, and sounds like your best employee."
3. **Captures & Qualifies** -- "Collects contact details, understands intent, and scores every lead."
4. **Resolves or Hands Off** -- "Books the appointment, answers the FAQ, or transfers to your team with full context."

### 2. AIConversationFlow Component Changes

Keep all existing visual design:
- GlowCard wrapper (purple glow)
- Glass-morphism container (`backdrop-blur-xl bg-gradient-to-br from-indigo-50/60 via-purple-50/60 to-pink-50/60`)
- All border/shadow/rounded styling
- Message bubble styles (indigo gradient for user, white/glass for AI)
- Bot avatar (BsRobot), user avatar (FaUserCircle)
- "Live Demo" pulsing badge

**Changes to the component:**

#### A. Fixed Height Container

Replace `min-h-[280px]` on the conversation container div (line 115) with a fixed height:
- Default: `h-[380px]` (homepage)
- Compact: `h-[300px]` (product page)
- Add `overflow-hidden` to prevent content from pushing layout

Accept a `compact` boolean prop to switch between these modes.

#### B. Channel Tab Bar

Add a horizontal tab bar **inside** the existing glass card, between the bot header row and the messages area.

Tabs:
- **Web Chat** -- icon: `MessageSquare` (lucide)
- **SMS** -- icon: `Smartphone` (lucide)
- **WhatsApp** -- icon: `SiWhatsapp` (react-icons/si)
- **Slack** -- icon: `SiSlack` (react-icons/si)

Visual style:
- Small pill-style tabs in a flex row, `gap-2`
- Inactive: `bg-white/30 text-gray-500 border border-white/30`
- Active: `bg-white/60 text-indigo-600 border border-indigo-200/50 shadow-sm`
- Smooth transition on switch (`transition-all duration-300`)
- `mb-4` spacing below tabs before messages area

The tab bar is clickable (manual switch) AND auto-cycles every 8 seconds. Clicking a tab resets the auto-cycle timer.

#### C. Animation Change -- Staggered Fade-In

Replace the character-by-character typing with a **staggered message fade-in**:

- When a channel becomes active, all of that channel's messages are rendered immediately but start with `opacity: 0, y: 12`
- Each message fades in with a stagger delay: message 0 at 0.3s, message 1 at 0.8s, message 2 at 1.4s, message 3 at 2.0s
- Between messages 1 and 2 (after the first AI response), show the typing indicator dots for 600ms before fading in the next user message
- Total animation cycle per channel: ~3 seconds
- After all messages are visible, hold for 4 seconds, then crossfade to the next channel tab

This approach:
- Renders all messages at their final positions from the start (no height growth)
- Still feels "live" thanks to staggered timing and typing indicator
- Is faster and snappier than character-by-character
- Zero CLS

#### D. Channel-Specific Conversations

Each channel gets its own conversation and subtle visual tweaks:

**Web Chat** (default):
- Header: `CogniDrift AI` with BsRobot icon, "Online" status
- Conversation:
  1. User: "Hi, I'd like to book a consultation"
  2. AI: "Of course! What service are you interested in?"
  3. User: "Dental cleaning"
  4. AI: "I have openings Thursday at 2pm and Friday at 10am. Which works better?"

**SMS:**
- Header: `CogniDrift AI` with Smartphone icon, "SMS" label instead of "Online"
- Message bubbles: same styling (keep consistent)
- Conversation:
  1. AI: "Hi Sarah! Quick reminder: your appointment is tomorrow at 2pm. Reply YES to confirm."
  2. User: "YES"
  3. AI: "Confirmed! See you tomorrow. Reply HELP if you need to reschedule."

**WhatsApp:**
- Header: `CogniDrift AI` with WhatsApp icon, "WhatsApp" label
- Add subtle double-check marks (two small Check icons, `w-3 h-3 text-blue-400`) below each AI message
- Conversation:
  1. User: "What are your pricing plans?"
  2. AI: "We have 3 plans starting at $29/mo. Would you like me to send the full comparison?"
  3. User: "Yes please"
  4. AI: "Here you go: cognidrift.com/pricing -- want me to schedule a quick walkthrough?"

**Slack:**
- Header: `CogniDrift AI` with Slack icon, `#customer-support` label
- Conversation:
  1. AI: "New lead from website chat: Sarah Johnson, interested in dental cleaning. Intent: High."
  2. AI: "Appointment booked: Thursday 2pm. Confirmation sent via SMS."
  3. User: "Thanks, I'll follow up with her tomorrow"
  4. AI: "Got it -- I've added a follow-up reminder to your calendar for tomorrow 9am."

#### E. Channel Switch Transition

When switching channels (auto-cycle or tab click):
- Current messages fade out: `opacity 1 -> 0` over 200ms
- Header label/icon updates
- New messages stagger in with the fade-in pattern described above
- Tab active indicator slides to the new tab

#### F. Component Props

```
MultiChannelShowcase (renamed from AIConversationFlow)
  compact: boolean (default false)
    - false: h-[380px], 4 channels, all workflow steps visible
    - true: h-[300px], 3 channels (Web Chat, SMS, WhatsApp -- no Slack), fewer messages
```

### 3. CogniChat Product Page (WebChatbot.jsx)

Add the `MultiChannelShowcase` component below the existing hero CTAs:

- Use `compact` mode
- Center it in the hero section, max-w-lg or max-w-xl
- Add `mt-10 sm:mt-12` spacing between CTAs and the showcase
- Keep the existing hero layout (icon, title, subtitle, CTAs) above it unchanged
- The showcase serves as a visual proof-point: "here's what CogniChat looks like in action"

### 4. Homepage Left Column Steps Update

Update the 4 workflow steps in the left column of the Homepage section to match:

| # | Title | Description |
|---|-------|-------------|
| 1 | Customer Reaches Out | On your website, SMS, WhatsApp, or Slack -- your AI is already there. |
| 2 | AI Responds Instantly | Answers questions, shares info, and sounds like your best employee. |
| 3 | Captures & Qualifies | Collects contact details, understands intent, and scores every lead. |
| 4 | Resolves or Hands Off | Books the appointment, answers the FAQ, or transfers to your team with full context. |

Keep the existing step card styling (icon circles, connectors, etc.).

## File Changes

| File | Action |
|------|--------|
| `src/components/AIConversationFlow.jsx` | Rename to `MultiChannelShowcase.jsx`. Fix height, add tabs, new animation, channel conversations |
| `src/data/showcaseConversations.js` | Create. All channel conversation scripts and config |
| `src/pages/Home.jsx` | Update import (AIConversationFlow -> MultiChannelShowcase), update section header text, update workflow step text |
| `src/pages/products/WebChatbot.jsx` | Add MultiChannelShowcase below hero CTAs with compact prop |

## What Does NOT Change

- GlowCard wrapper and its purple glow effect
- Glass-morphism container styling (gradient, backdrop-blur, border, shadow)
- Message bubble design (indigo gradient user, white/glass AI)
- Bot avatar icon (BsRobot) and user avatar (FaUserCircle)
- "Live Demo" pulsing badge
- Overall two-column grid layout on Homepage
- Step card visual styling on Homepage (icons, connectors, spacing)
- CogniChat hero section structure (icon, title, subtitle, CTAs)
