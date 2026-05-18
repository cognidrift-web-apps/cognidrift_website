# CogniHub Showcase Redesign — Design Spec

## Goal

Rewrite the CogniHub homepage demo (`CogniHubShowcase.jsx`) from a multi-model cycling demo with clickable UI into a single-flow, non-interactive marketing showcase with typing animation, rich visual content, and real brand icons.

## Context

The current CogniHub demo has several issues:
- Dropdown and input are clickable (should be purely visual)
- Typing indicator uses bouncing dots instead of animated typing in the input field
- Rich content (charts, tables) is too small and basic
- Claude and Gemini use letter badges instead of real brand icons
- Auto-cycles through 3 separate model conversations (unnecessary complexity)

The user wants a single polished conversation flow that demonstrates workspace capability, with model breadth shown as a logo grid in the left-column workflow steps.

## Architecture

### Section Layout (Home.jsx — unchanged structure)

```
[Centered Header: badge + title + subtitle]

[Left Column: 4 workflow steps]     [Right Column: CogniHubShowcase]
  1. Pick Your Model (+ icon grid)     ┌─────────────────────────┐
  2. Ask Anything                      │ [GPT-4o badge] Connected│
  3. Get Rich Output                   │                         │
  4. Share With Your Team              │  single conversation    │
                                       │  with rich content      │
                                       │  (chart + table)        │
                                       │                         │
[Centered CTA: "Explore CogniHub"]     │ [typing animation bar]  │
                                       └─────────────────────────┘
```

Grid: `grid-cols-1 lg:grid-cols-2` (50/50 split, matching other homepage sections).

### Component: CogniHubShowcase.jsx (full rewrite)

**Container:**
- GlowCard wrapper with `glowColor="cyan-purple" glowSize="md"`
- Inner panel: `h-[420px]`, glass-morphism background
- All child elements: `pointer-events-none` (nothing clickable)

**Top bar:**
- Static model badge: OpenAI icon + "GPT-4o" label (no dropdown, no chevron)
- Green pulse dot + "Connected" text
- Non-interactive

**Conversation flow (single, auto-looping):**

| Step | Type | Content |
|------|------|---------|
| 1 | User typing | Text types char-by-char in input field, then animates up as sent bubble |
| 2 | AI text | "Here's your Q1 regional sales analysis:" |
| 3 | AI rich: chart | Bar chart — 4 regions (West, East, North, South) with animated bars, value labels, axis labels |
| 4 | AI rich: table | Summary table — 3 rows (Total Revenue, QoQ Growth, Top Region) with header row |
| 5 | User typing | Second message types in input, sends |
| 6 | AI text | Recommendation response |
| 7 | Hold | 4 seconds, then reset and loop from step 1 |

**Typing animation mechanic:**
1. Input field shows placeholder "Ask anything..."
2. When user turn starts: placeholder disappears, text appears character-by-character (40ms per char)
3. After full text is typed, brief pause (300ms)
4. Text clears from input, message appears as a sent bubble (slide up + fade in)
5. Input reverts to placeholder

**Input bar:**
- Static during AI turns (shows "Ask anything..." placeholder)
- Animated during user turns (typing effect)
- Send button: decorative, no hover/tap effects, no pointer events

**Message bubbles:**
- User: right-aligned, white/glass background, rounded corners
- AI: left-aligned, indigo-to-blue gradient with subtle glow, rounded corners
- AI avatar: small OpenAI icon in colored circle
- User avatar: FaUserCircle gray icon

**Rich content components:**

*BarChart (upgraded):*
- 4 bars: West ($2.1M, 85%), East ($1.5M, 62%), North ($1.1M, 45%), South ($1.8M, 72%)
- Animated bar growth on appear (staggered)
- Value labels above each bar
- Region labels below
- Title row: chart icon + "Q1 Revenue by Region"
- Subtle horizontal grid lines at 25/50/75% marks
- Clean white card with blue-tinted border

*SummaryTable (new):*
- 3 columns: Metric, Value, Change
- 3 rows:
  - Total Revenue | $6.5M | +18%
  - QoQ Growth | 18.2% | +4.1pp
  - Top Region | West | +34%
- Header row with light gray background
- Positive change values in green
- Clean bordered table with rounded corners
- Title row: table icon + "Performance Summary"

**Conversation messages:**

First user message: "Analyze our Q1 sales and show regional breakdown"
AI response 1 (text): "Here's your Q1 regional sales analysis:"
AI response 2 (chart): Bar chart component
AI response 3 (table): Summary table component
Second user message: "Which region should we focus on next quarter?"
AI response 4 (text): "West region shows the strongest momentum at +34% growth. I'd recommend increasing investment there while investigating the North region's decline."

### Home.jsx Changes

**Section description update:**
```
"One workspace for every AI model. Build custom agents, share with your team, and unify your AI costs."
```

**"Pick Your Model" step enhancement:**
- Below the step description, add a row of 6 small model icon pills
- Models: GPT (OpenAI green), Claude (Anthropic tan), Gemini (Google blue), Mistral (orange), Llama (Meta blue), DeepSeek (blue-purple)
- Each pill: 28px wide, colored circle with brand icon/mark inside
- Flex row with small gap, wrapping on mobile

### Model Icons

- **GPT**: `SiOpenai` from react-icons (already installed)
- **Claude**: Inline SVG — Anthropic's mark (simplified "A" or spark shape), color `#d4a27f`
- **Gemini**: Inline SVG — Google's 4-pointed star, color `#4285f4`
- **Mistral**: Inline SVG — "M" lettermark, color `#f97316` (orange)
- **Llama**: `SiMeta` from react-icons, color `#0668E1`
- **DeepSeek**: Inline SVG — "DS" lettermark, color `#7c3aed`

All icons are small (12-14px) inside 24-28px colored circles. Non-interactive.

## Removed Elements

- Model dropdown (button, chevron, dropdown panel, click-outside handler)
- `CONVERSATIONS` array (3 separate flows)
- `MODELS` array (replaced by static single-model badge)
- `convIndex` state and cycling logic
- `dropdownOpen` state and ref
- `TypingIndicator` component (bouncing dots)
- All `onClick`, `whileHover`, `whileTap` on non-CTA elements
- `EmailPreview` and `InsightsCard` rich content components (only chart + table needed)
- `FileCard` component

## New Elements

- `TypewriterInput` animation logic (char-by-char in input field)
- `SummaryTable` component
- Upgraded `BarChart` with grid lines and better typography
- Model icon pills in Home.jsx "Pick Your Model" step
- Inline SVG components for Claude, Gemini, Mistral, DeepSeek marks

## Technical Notes

- All demo elements use `pointer-events-none` on the outer container
- Animation timers managed via single `useRef` timer chain (same pattern as current)
- `useCallback` + `useRef` for timer cleanup on unmount
- No state for dropdown (removed)
- Single `visibleCount` + `typingText` state for the conversation sequence
- Height fixed at 420px to match between compact CogniChat (360px) and current (460px)
- Lazy loaded via `React.lazy()` in Home.jsx (already in place)
