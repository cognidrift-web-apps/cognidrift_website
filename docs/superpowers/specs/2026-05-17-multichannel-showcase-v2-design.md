# Multi-Channel Showcase v2 + CogniChat Page Redesign - Design Spec

> Redesigns the MultiChannelShowcase component (message alignment, scrolling stream, rich content, glow animations) and upgrades the CogniChat product page hero + features section.

## Scope

Two concerns, tightly coupled:

1. **MultiChannelShowcase component** -- redesign message layout, animation, and content
2. **CogniChat product page** (`WebChatbot.jsx`) -- compact hero, blended showcase, premium feature cards

## What Changes

### 1. MultiChannelShowcase Component

#### A. Message Side Flip

- **AI (CogniDrift)**: RIGHT side, purple gradient bubbles (`bg-gradient-to-br from-indigo-500 to-purple-600 text-white`), BsRobot avatar on the right
- **Customer**: LEFT side, white/glass bubbles (`bg-white/50 backdrop-blur-sm text-gray-800 border border-white/40`), FaUserCircle avatar on the left

This matches the convention where the "sender" (the product being demoed) is on the right.

#### B. AI Glow Animation

When an AI message appears, it gets a brief glow pulse:
- Initial: `box-shadow: 0 0 0px rgba(139,92,246,0)`
- Animate to: `box-shadow: 0 0 20px rgba(139,92,246,0.4)` over 0.3s
- Then fade back to: `box-shadow: 0 0 8px rgba(139,92,246,0.1)` over 0.5s

Use Framer Motion's `animate` with a keyframe sequence on `boxShadow`.

#### C. Continuous Scrolling Stream

- Each channel has 6-8 messages (longer conversations)
- Messages appear one at a time with ~1s stagger between each
- The message container has `overflow-hidden` with a CSS gradient mask at the top:
  ```css
  mask-image: linear-gradient(to bottom, transparent 0%, black 15%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%);
  ```
- As new messages appear at the bottom, the container auto-scrolls using a ref + `scrollTo({ top: scrollHeight, behavior: 'smooth' })`
- Older messages naturally scroll behind the top gradient mask and disappear
- After the last message appears, hold 3s, then crossfade to the next channel tab
- Fixed height container remains (`h-[380px]` / `h-[300px]` compact) -- no CLS

#### D. Remove Slack, Keep 3 Channels

Channels: Web Chat, SMS, WhatsApp only. Remove Slack from data and component logic. The `compact` prop no longer changes channel count (always 3). Compact only affects height.

#### E. Center-Aligned Header

Change the header from `flex items-center justify-between` to `flex flex-col items-center text-center`. Stack: channel icon, title, status dot + label, all centered. Move "Live Demo" badge to a small inline tag next to the title or remove it entirely (the animation already communicates "live").

#### F. Rich Content Messages

Messages can have an optional `richContent` field. When present, render a styled card inside the bubble area instead of plain text.

Rich content types:

**`pricingCard`** -- mini 3-column pricing display:
- Rounded container with subtle border
- 3 plan columns: name + price (e.g., "Starter $29/mo", "Pro $69/mo", "Enterprise $149/mo")
- A small "View Full Pricing →" link at bottom
- Compact: fits within the chat bubble width

**`appointmentButton`** -- styled CTA inside bubble:
- Calendar icon + "Book a Free Demo" text
- Rounded, bg-white with indigo border, looks clickable
- Small and inline, not full-width

**`calendarCard`** -- appointment confirmation:
- Date/time display (e.g., "Today, 3:00 PM")
- Status: "Confirmed ✓"
- Small "Add to Calendar" link below

**`confirmationCard`** -- service booking confirmation:
- Service name + date/time
- Address or location line
- "Get Directions" link

These render as small styled elements below the AI message text. They have slightly different styling from the message bubble itself (inner card with its own border/background).

#### G. New Conversation Scripts

**Web Chat** (8 messages):
1. Customer: "Hey, do you offer any plans for small businesses?"
2. AI: "Absolutely! Here's a quick look at our plans:"
3. AI: [pricingCard: Starter $29/mo, Pro $69/mo, Enterprise $149/mo]
4. Customer: "The Pro plan looks good. Can I book a demo?"
5. AI: "Of course! Pick a time that works:"
6. AI: [appointmentButton: "Book a Free Demo"]
7. Customer: "Done! Booked for Thursday"
8. AI: "See you Thursday! I've sent a confirmation to your email."

**SMS** (8 messages):
1. AI: "Hi Mike! We noticed you missed your 10am appointment today. Would you like to reschedule?"
2. Customer: "Yeah sorry, got held up. Are you still open today?"
3. AI: "No problem! We're open until 6pm today."
4. Customer: "Can I come in at 3?"
5. AI: "3pm works! I've reserved a spot for you:"
6. AI: [calendarCard: "Today, 3:00 PM - Confirmed" + "Add to Calendar"]
7. Customer: "Perfect, see you then"
8. AI: "See you at 3! Text HELP anytime if plans change."

**WhatsApp** (8 messages):
1. Customer: "Hi, I need an emergency plumbing repair"
2. AI: "I can help! What's the issue?"
3. Customer: "Leaking pipe under the kitchen sink"
4. AI: "Got it. We have a technician available today at 2pm. Sound good?"
5. Customer: "Yes please!"
6. AI: "Booked! Here's your appointment details:"
7. AI: [confirmationCard: "Plumbing Repair - Today 2:00 PM" + address + "Get Directions"]
8. Customer: "Thanks so much!"

### 2. CogniChat Product Page Hero

#### A. Title Change

- Old: `AI <span class="text-blue-600">Web Chatbot</span>`
- New: `<span class="text-blue-600">CogniChat</span>` (single word, branded)

#### B. Icon Position

- Old: Icon centered above title in a large 20x20/24x24 rounded box
- New: Icon inline LEFT of title. Small icon (w-10 h-10) in a rounded-xl box, flexed with the h1 in a row: `flex items-center justify-center gap-4`

#### C. Subtitle

- Old: "Capture, qualify, and convert website visitors in real time with an intelligent chatbot that never sleeps."
- New: "Every customer answered. Every channel covered." (matches homepage)

#### D. Remove CTA Buttons

Remove the "Schedule a Demo" and "View Pricing" buttons entirely. The showcase IS the call to action (visual proof), and pricing is immediately below.

#### E. Blended Showcase

- Wider: `max-w-2xl` instead of `max-w-xl`
- Add a bottom fade: wrapper div with `mask-image: linear-gradient(to bottom, black 60%, transparent 100%)` so the bottom 40% fades to white
- Reduce opacity slightly: `opacity-90` on the showcase wrapper
- Reduce top margin: `mt-6 sm:mt-8` (was `mt-10 sm:mt-12`)
- This makes the hero compact -- title/subtitle/showcase are tight, and the content below (stats, features) peeks through the fade

#### F. Reduce Hero Padding

- Old: `pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20`
- New: `pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-10` (reduce bottom padding since showcase fades into next section)

### 3. Features Section Card Upgrade

Replace the current flat card style with the "Everything You Need" card style from Home.jsx:

**Current card:**
```
bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl border border-gray-100
```

**New card style:**
- Colored border: `border-2 border-{color}-200` (cycle through blue, purple, cyan, teal)
- Light background overlay: `absolute inset-0 bg-{color}-50 opacity-40 group-hover:opacity-60`
- Decorative blur circle: `absolute -top-10 -right-10 w-32 h-32 bg-{color}-500 opacity-10 rounded-full blur-2xl group-hover:scale-150`
- Corner accent: `absolute bottom-0 right-0 w-16 h-16 bg-{color}-500 opacity-5 rounded-tl-full`
- Glow shadow on hover: `shadow-md hover:shadow-xl shadow-{color}-500/20`
- Icon with colored background: `w-10 h-10 sm:w-12 sm:h-12 bg-{color}-50 rounded-xl`
- Spring hover animation: `whileHover={{ y: -6, scale: 1.02 }}` with `type: "spring", stiffness: 300`
- Icon shake on hover: `whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}`

Keep the existing 2-column grid layout (`grid sm:grid-cols-2 gap-6 sm:gap-8`).

Color assignments for the 4 feature cards:
1. Real-Time Visitor Engagement → blue
2. Lead Capture & Qualification → purple
3. Multi-Language Support → cyan
4. Instant Handoff to Agents → teal

## What Does NOT Change

- GlowCard wrapper and purple glow effect on showcase
- Glass-morphism container (gradient backdrop-blur border shadow)
- Channel tab bar styling (pill buttons, active/inactive states)
- Typing indicator dots animation
- `usePageAnimation` hook usage for page transitions
- Stats section, Use Cases section, Benefits section, Pricing section on WebChatbot page
- Homepage usage of MultiChannelShowcase (same component, will get all the showcase improvements)
- WhatsApp double-check marks on AI messages

## File Changes

| File | Action |
|------|--------|
| `src/data/showcaseConversations.js` | Rewrite: remove Slack, add 8 messages per channel with richContent fields |
| `src/components/MultiChannelShowcase.jsx` | Rewrite: flip sides, glow animation, scrolling stream, rich content rendering, center header |
| `src/pages/products/WebChatbot.jsx` | Modify: hero title/icon/subtitle, remove CTAs, widen+fade showcase, upgrade feature cards |
