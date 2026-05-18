# CogniVoice Split-Panel Sections

## Goal

Replace the current "Deploy Anywhere" section in CogniVoice.jsx with two alternating split-panel sections — Phone Line (visual left, text right) and Web Widget (text left, visual right).

## Scope

- Modify: `src/pages/products/CogniVoice.jsx` — replace lines 215-422 (Deploy Anywhere section) with two new sections
- No new files needed. Orb component already exists at `src/components/ui/Orb.jsx`.

---

## Section 1: Phone Line

**Background:** `bg-white`
**Layout:** `grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`, `max-w-6xl mx-auto`

### Left Column — Phone Visual (~45%)

Fresh static phone mockup (NOT TryNowSection — that stays in the hero).

**Phone frame:**
- Outer: `bg-white rounded-[2rem] shadow-xl shadow-blue-200/40 border border-blue-100/30 p-[3px]`
- Inner: `bg-gradient-to-b from-blue-50 to-white rounded-[1.85rem] overflow-hidden`
- Width: `w-[220px] sm:w-[250px]` centered in column
- Behind frame: pulsing blue glow — `motion.div` with `animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.08, 0.2] }}`, `bg-blue-400/30 blur-2xl rounded-full -z-10`

**Phone content (top to bottom):**
1. Header bar: `bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3` with white text "AI Receptionist" + green dot + "Active"
2. Chat transcript (5 messages):
   - AI (blue bg, white text, `rounded-xl rounded-tl-sm`): "Good morning! How can I help you today?"
   - User (gray-100 bg, gray-800 text, `rounded-xl rounded-tr-sm`): "I need to see Dr. Chen"
   - AI: "Dr. Chen has an opening tomorrow at 2 PM. Want me to book it?"
   - User: "Yes, please"
   - Success card: `bg-green-50 border border-green-200 rounded-lg` with CheckCircle2 green icon + "Appointment booked — SMS confirmation sent"
3. Bottom bar: subtle `border-t border-gray-100` with a mic icon and "AI is listening..." text

### Right Column — Text Content (~55%)

1. **Overline badge:** `inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full` with Phone icon + "PHONE LINE" label (`text-xs font-bold uppercase tracking-wider`)
2. **Heading:** `text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary` — "Your AI Receptionist, **24/7**" (24/7 in `text-blue-600`)
3. **Subtitle:** `text-base sm:text-lg text-text-secondary mt-4 mb-8 leading-relaxed` — "Your AI answers every inbound call with a natural voice. It greets callers, books appointments, and routes conversations — so your team focuses on what matters."
4. **Feature list:** `space-y-4`, each item:
   - `flex items-start gap-3`
   - Icon: `w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0` (CheckCircle2)
   - Text: `text-text-primary font-medium` for label, could include brief detail

   Items:
   - Toll-free or local phone numbers
   - Call recording & full transcription
   - Smart transfer to live agents
   - 50+ languages supported
   - Calendar integration & auto-booking

**Animation:** Section uses `whileInView` fade-in. Left column fades from left (`x: -30`), right column fades from right (`x: 30`).

---

## Section 2: Web Voice Widget

**Background:** `bg-neutral-offWhite`
**Layout:** Same grid but columns reversed — text left, visual right.

### Left Column — Text Content (~55%)

Same structure as Section 1 but purple scheme:

1. **Overline badge:** `bg-purple-50 text-purple-600` with Mic icon + "WEB WIDGET"
2. **Heading:** "Voice AI on **Your Website**" ("Your Website" in `text-purple-600`)
3. **Subtitle:** "Add a voice-enabled widget to any page. Visitors click to speak with your AI directly in the browser — no downloads, no phone calls needed."
4. **Feature list** (purple CheckCircle2 icons):
   - One-line embed code
   - Custom branding & voice
   - Works on all devices
   - Real-time voice transcription
   - Multilingual support

### Right Column — Browser + Orb Visual (~45%)

**Browser frame:**
- Outer: `bg-white rounded-xl overflow-hidden shadow-xl shadow-purple-200/40 border border-purple-100/30`
- Width: `w-[280px] sm:w-[320px]` centered

**Browser chrome:**
- `bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2`
- macOS dots: 3 circles (`w-[8px] h-[8px] rounded-full`) in #ff5f57, #febc2e, #28c840
- Address bar: `flex-1 bg-white rounded px-2 py-0.5 text-[9px] text-gray-400 font-mono border border-gray-100` showing "yourbusiness.com"

**Page content area:**
- `relative h-[200px] sm:h-[240px] bg-gradient-to-br from-slate-50 via-white to-purple-50/30 p-4`
- Top-left: 3-4 placeholder content lines (`h-2 w-24 bg-gray-200/60 rounded`, etc.)
- Bottom-right: The voice widget cluster:
  1. **Chat popup** (appears offset above-left of FAB): `bg-white rounded-xl shadow-lg px-3 py-2.5 border border-purple-100/60 max-w-[140px]`
     - Header: small Mic icon in purple circle + "Voice Assistant" label (`text-[8px] font-semibold text-purple-600`)
     - Text: "How can I help you today?" (`text-[9px] text-gray-600`)
     - Waveform: 12 bars, `w-[2px] bg-gradient-to-t from-purple-400 to-indigo-400 rounded-full`, animated height `[2, 4+random*4, 2]`
  2. **Orb FAB:** `w-[60px] h-[60px] rounded-full overflow-hidden` containing the `<Orb>` component with `forceHoverState={true}`, `hue={270}` (purple range), wrapped in a shadow container `shadow-lg shadow-purple-400/30`

**Animation:** Left column fades from left (`x: -30`), right column fades from right (`x: 30`).

---

## Mobile Behavior

On screens below `lg` (< 1024px):
- Single column stack
- Section 1: Phone visual on top, text below
- Section 2: Browser+Orb visual on top, text below
- Visuals centered with `mx-auto`

---

## Removed

- The current "Deploy Anywhere" section (lines 215-422) with its section header, 2-card grid, inline phone mockup, and inline browser mockup — all replaced by the two split-panel sections above.
