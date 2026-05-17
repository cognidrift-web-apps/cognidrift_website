# TryNowSection Conversation Flow Redesign — Design Spec

## Goal

Replace the current TryNowSection (static phone mockup with floating notification bubbles) with an animated AI receptionist conversation flow inside a premium holographic phone frame. The section keeps the live demo phone number on the left. The right side shows a tall phone mockup cycling through stages: incoming call → AI answers → scrolling transcript with waveform → action cards (appointment, SMS, DB lookup) → call complete → loop.

## Architecture

Single component rewrite of `TryNowSection.jsx` (~400 lines). A small companion Canvas 2D component (`VoiceWaveform.jsx`, ~80 lines) renders the circular pulsing waveform. No new dependencies — uses Canvas 2D for waveform, Framer Motion for UI transitions. The existing GlowCard component is removed from the phone frame in favor of a custom CSS holographic border.

## Tech Stack

React + Framer Motion (existing) + Canvas 2D (vanilla) + Tailwind CSS

---

## 1. Layout

Two-column grid (same as current):
- **Left column:** Live demo CTA cards — Call Now + Text Now (unchanged from current)
- **Right column:** Phone mockup with animated conversation flow (full rewrite)

Section header stays centered above the grid. Badge changes from "Try It Live" to "Experience AI Live". Title: "See Our AI **In Action**" (gradient on "In Action"). Subtitle: "Watch how our AI receptionist handles a real call — then try it yourself."

## 2. Phone Frame — Holographic Bright Design

The phone frame is a tall rounded rectangle (~iPhone 15 proportions, `aspect-[9/19]`).

### Frame Body
- **Background:** White/near-white (`bg-white`)
- **Border:** 3px with animated holographic gradient — `conic-gradient` rotating slowly (cyan → blue → purple → pink → cyan). Achieved with a pseudo-element `::before` using `@keyframes holo-spin` rotating a conic gradient 360° over 4s
- **Outer glow:** `box-shadow` with multi-layered colored shadows — subtle cyan + purple + pink at different spread values, pulsing gently
- **Notch:** Small pill shape at top center, light gray (`bg-gray-200`), contains a tiny dot for camera
- **Status bar:** Time (9:41), battery icon, signal bars — all in dark gray text on the white background
- **Sizing:** `w-[260px] sm:w-[280px] lg:w-[300px]`

### Holographic Border CSS
```css
@keyframes holo-spin {
  from { --holo-angle: 0deg; }
  to { --holo-angle: 360deg; }
}

.phone-holo-border {
  position: relative;
  border-radius: 2.5rem;
  padding: 3px;
  background: conic-gradient(
    from var(--holo-angle, 0deg),
    #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4
  );
  animation: holo-spin 4s linear infinite;
}
```

Since CSS `@property` for `--holo-angle` may not work everywhere, the actual implementation uses a rotating `background-position` or a pseudo-element with `transform: rotate()` behind a white inset.

**Fallback approach:** A `::before` pseudo-element slightly larger than the phone, with `conic-gradient` background and `animation: spin 4s linear infinite` (`transform: rotate(360deg)`). The phone body sits on top with white background and `border-radius`, creating the holographic border illusion.

## 3. Conversation Stages

The animation cycles through 5 stages in a loop. Each stage auto-advances after its duration.

### Stage 1 — Incoming Call (4s)
- **Screen:** White background with soft blue-50 gradient
- **Top:** "Incoming Call" label in gray
- **Center:** Caller avatar circle (gradient blue-to-cyan) with a phone icon inside, animated pulse rings expanding outward (3 rings, staggered)
- **Below avatar:** "Sarah Mitchell" (bold), "+1 (555) 867-5309" (gray)
- **Bottom:** Two buttons — red Decline (small) and green Accept (larger, pulsing glow)
- **Transition to Stage 2:** Accept button "pressed" (scale down, green flash), then crossfade

### Stage 2 — AI Connected + Waveform (4s)
- **Screen:** White background
- **Top bar:** Green dot + "Connected" + call timer counting up (0:01, 0:02...)
- **Center:** `VoiceWaveform` Canvas component — circular pulsing rings (cyan-to-purple gradient), 3-4 concentric circles breathing in/out
- **Below waveform:** "CogniDrift AI" (bold) + "Speaking..." (gray, with animated ellipsis)
- **Timer:** Increments every second via `setInterval`

### Stage 3 — Conversation Transcript (10s)
- **Screen:** White background, scrollable area
- **Top bar:** Same green connected bar with timer continuing
- **Waveform:** Shrinks to small indicator (24x24) in top-right corner of the chat area, pulses when AI messages appear
- **Messages appear sequentially** (each after 2s delay):

  1. **Caller bubble** (left, gray-100 bg, rounded): "Hi, I'd like to book an appointment for next Tuesday"
  2. **AI bubble** (right, white bg, soft cyan/blue left-border, faint blue shadow): "Of course! Let me check Dr. Chen's availability..." _(waveform pulses)_
  3. **Action card** (centered, full-width pill): Calendar icon + "Checking schedule..." shimmer → resolves to "✓ Tuesday 2:00 PM — Available" (green check)
  4. **AI bubble:** "I've booked you for Tuesday at 2:00 PM with Dr. Chen"
  5. **Action card:** MessageSquare icon + "Sending confirmation SMS..." → "✓ SMS sent to (555) 867-5309"

### Stage 4 — Database Lookup (5s)
Continues from Stage 3 (transcript keeps scrolling, auto-scrolls down):

  6. **Caller bubble:** "Can you check if my insurance is on file?"
  7. **AI bubble:** "Let me look that up..."
  8. **Action card:** Search icon + "Checking patient records..." → "✓ Blue Cross PPO — Active"
  9. **AI bubble:** "Your Blue Cross PPO is active and on file"

### Stage 5 — Call Complete (3s)
  10. **AI bubble:** "You're all set! You'll get a reminder 24 hours before"
  - Connected bar changes to "Call Ended · 1:24" with a red dot
  - Brief pause (2s), then fade to Stage 1 (loop restarts)

### Message Styling

| Type | Alignment | Background | Border | Text |
|------|-----------|------------|--------|------|
| Caller | Left | `bg-gray-100` | none | `text-gray-900`, `text-xs` |
| AI | Right | `bg-white` | `border-l-2 border-cyan-400` | `text-gray-900`, `text-xs` |
| Action card | Center (full width) | `bg-gray-50` | `border border-gray-200` | Icon + label, `text-[10px]` |
| Action resolved | Center | `bg-green-50` | `border border-green-200` | Green check + result |

All messages use `text-xs` (12px) inside the small phone screen. Action cards use `text-[10px]`.

## 4. VoiceWaveform Component (Canvas 2D)

A small, self-contained Canvas 2D component that renders a circular pulsing waveform.

### Props
- `size`: number (default 120) — canvas size in CSS pixels
- `active`: boolean — whether to animate (pauses when inactive)
- `intensity`: number 0-1 (default 0.8) — how much the rings move

### Rendering
- 4 concentric circles, each a different radius
- Colors: gradient from cyan (#06b6d4) → blue (#3b82f6) → purple (#8b5cf6)
- Each ring oscillates radius using `sin(time * speed + offset)` — breathing effect
- Ring stroke width: 2px, with opacity decreasing for outer rings (0.8, 0.6, 0.4, 0.2)
- Uses `requestAnimationFrame`, renders on 2D canvas context
- ~60fps, cancels on unmount
- DPR-aware (same pattern as SiriWaveBackground)

### Small Indicator Mode
When used as the small 24x24 indicator during transcript stages, `size={24}` and only 2 rings are drawn.

## 5. Conversation Data Structure

```js
const STAGES = [
  { type: 'incoming', duration: 4000 },
  { type: 'connected', duration: 4000 },
  { type: 'transcript', duration: 15000 },
  { type: 'complete', duration: 3000 },
]

const MESSAGES = [
  { role: 'caller', text: "Hi, I'd like to book an appointment for next Tuesday" },
  { role: 'ai', text: "Of course! Let me check Dr. Chen's availability for Tuesday..." },
  { role: 'action', icon: 'Calendar', loading: 'Checking schedule...', resolved: 'Tuesday 2:00 PM — Available' },
  { role: 'ai', text: "I've booked you for Tuesday at 2:00 PM with Dr. Chen" },
  { role: 'action', icon: 'MessageSquare', loading: 'Sending confirmation SMS...', resolved: 'SMS sent to (555) 867-5309' },
  { role: 'caller', text: 'Can you check if my insurance is on file?' },
  { role: 'ai', text: 'Let me look that up for you...' },
  { role: 'action', icon: 'Search', loading: 'Checking patient records...', resolved: 'Blue Cross PPO — Active' },
  { role: 'ai', text: 'Your Blue Cross PPO is active and on file' },
  { role: 'ai', text: "You're all set! You'll receive a reminder 24 hours before your appointment" },
]
```

## 6. Timer / State Machine

A single `useEffect` drives the stage machine:

```
state = { stage: 0..3, messageIndex: -1, timer: 0 }
```

- **Stage 0 (incoming):** 4s, then auto-advance to stage 1
- **Stage 1 (connected):** 4s of waveform, timer ticks up every 1s, then advance to stage 2
- **Stage 2 (transcript):** Messages appear one every ~1.5s. Action cards show "loading" for 1s then resolve. Timer keeps ticking. After all 10 messages shown, advance to stage 3 after 1s pause.
- **Stage 3 (complete):** 3s pause, then reset to stage 0

The call timer starts at 0:00 in stage 1 and runs continuously through stages 1-3. It resets when looping back to stage 0.

Auto-scroll: During transcript stage, the message container scrolls to bottom whenever a new message appears (`scrollIntoView({ behavior: 'smooth' })`).

## 7. Left Column (Unchanged)

The Call Now and Text Now CTA cards remain exactly as they are in the current implementation. No changes to their styling, animations, or functionality.

## 8. Responsiveness

- Phone frame scales down on mobile: `w-[240px] sm:w-[260px] lg:w-[300px]`
- On mobile (`< lg`), the grid stacks vertically — phone mockup below the CTA cards
- Message text stays at `text-xs` across all breakpoints (phone screen is self-contained)
- Section padding: `py-14 lg:py-20` (same as current)

## 9. Performance

- VoiceWaveform uses Canvas 2D with `requestAnimationFrame` — cancels on unmount
- Waveform canvas is small (120x120 max) — negligible GPU cost
- Framer Motion animations use `opacity` and `transform` only
- Messages are rendered incrementally (not all at once) — minimal DOM churn
- Stage timer uses a single `useEffect` with cleanup
- Component is lazy-loaded (already wrapped in `React.lazy` in Home.jsx)

## 10. Files

| Action | File | Description |
|--------|------|-------------|
| Create | `src/components/VoiceWaveform.jsx` | Canvas 2D circular pulsing waveform (~80 lines) |
| Rewrite | `src/components/TryNowSection.jsx` | Full rewrite with conversation flow stages (~400 lines) |
| No change | `src/pages/Home.jsx` | Already lazy-loads TryNowSection — no changes needed |
| No change | `src/components/ui/GlowCard.jsx` | No longer used by TryNowSection, but used elsewhere — keep as-is |

## 11. What's Removed

- GlowCard wrapper on phone frame (replaced by custom holo border)
- Floating notification bubbles (the left/right bubble overlays)
- `phoneFrame` state toggling between call and voice orb
- `scenarios` array and `currentStep` rotation
- `colorMap` object
- `glowStyles` keyframe injection
- All the `<style>` tag injection

## 12. What's Kept

- Section ID `try-it-live` for scroll anchoring
- Section header pattern (badge + title + subtitle)
- Left column CTA cards (Call Now + Text Now) — completely unchanged
- Framer Motion entrance animations
- Two-column `lg:grid-cols-2` layout
- `fadeInUp` and `staggerContainer` animation variants
