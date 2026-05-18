# Homepage Reorganization & Consistency Audit — Design Spec

## Goal

Reorder homepage sections, standardize product showcase layouts with alternating left/right demos, unify feature list styles across all sections, and audit the full site for link/style/color consistency.

## Section Order (New)

```
 1. Hero                                            (unchanged)
 2. CogniVoice  (TryNowSection)    demo RIGHT       bg-neutral-offWhite
 3. CogniChat                      demo LEFT         bg-white
 4. CogniHub                       demo RIGHT        bg-neutral-offWhite
 5. CogniAvatar (VideoShowcase)    demo LEFT         bg-white
 6. Monitor Live (Analytics)       demo RIGHT        bg-neutral-offWhite
 7. Smart Scheduling               demo LEFT         bg-white
 8. Powerful Features (Bento)      (no demo)          bg-neutral-offWhite
 9. Industry Solutions             (no demo)          bg-white
10. Integrations                   (no demo)          bg-neutral-offWhite
11. Statistics                     (no demo)          bg-white
12. CTA                            (no demo)          bg-neutral-offWhite
```

Background colors alternate offWhite / white for visual separation.

### What moved

| Section | From position | To position |
|---------|--------------|-------------|
| CogniAvatar | 3 (after CogniVoice) | 5 (after CogniHub) |
| CogniHub | 6 | 4 (before CogniAvatar) |
| Industry Solutions | 7 | 9 |
| Features Grid | 8 | 8 (stays) |
| Smart Scheduling | 9 | 7 |
| Monitor Live | 10 | 6 |

## Demo Side Alternation

True alternation — each section flips the demo to the opposite side from the previous:

| Section | Demo Side | Feature Side | Slide direction |
|---------|-----------|--------------|-----------------|
| CogniVoice | RIGHT | LEFT (CTA cards) | demo: x: 50→0 |
| CogniChat | LEFT | RIGHT | demo: x: -50→0 |
| CogniHub | RIGHT | LEFT | demo: x: 50→0 |
| CogniAvatar | LEFT | RIGHT | demo: x: -50→0 |
| Monitor Live | RIGHT | LEFT | demo: x: 50→0 |
| Smart Scheduling | LEFT | RIGHT | demo: x: -50→0 |

## Feature Side Style

### Standard icon+text list (all sections except CogniVoice)

```jsx
<div className="flex items-start gap-3">
  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100/70 flex items-center justify-center mt-0.5">
    <Icon className="w-5 h-5 text-blue-600" />
  </div>
  <div>
    <h4 className="text-base sm:text-lg font-semibold text-text-primary mb-1">{title}</h4>
    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{description}</p>
  </div>
</div>
```

- Icon container: `w-10 h-10 rounded-xl bg-blue-100/70`
- Icon: `w-5 h-5 text-blue-600`
- Title: `text-base sm:text-lg font-semibold`
- Description: `text-sm sm:text-base text-gray-700`
- 4 items per section
- CTA button below the list

### CogniVoice exception

Keeps its Call Now / Text Now CTA cards with the phone number — they are interactive.

### CogniHub model icon pills

Under the first feature item ("Multi-model access"), keep the row of 6 model icon pills (GPT, Claude, Gemini, Mistral, Llama, DeepSeek).

## Section-Specific Changes

### CogniChat (currently "How It Works")

- **Remove**: numbered workflow steps (4 items with step numbers)
- **Add**: icon+text feature list:
  1. `Bot` — **Instant AI Responses** — "Answer customer questions 24/7 with human-like accuracy"
  2. `Calendar` — **Smart Booking** — "Automatically schedule appointments from chat conversations"
  3. `MessageSquare` — **Multi-Channel** — "Deploy on website, WhatsApp, Facebook Messenger, and more"
  4. `Bell` — **Lead Capture** — "Collect contact info and qualify leads automatically"
- **Layout**: demo LEFT, features RIGHT
- **Background**: `bg-white`

### CogniHub

- **Remove**: 6 numbered workflow steps
- **Add**: icon+text feature list:
  1. `Sparkles` — **Multi-Model Access** — "GPT, Claude, Gemini, Mistral, and more in one workspace" (+ model icon pills below)
  2. `Bot` — **Custom AI Agents** — "Build agents tailored to your team's specific workflows"
  3. `Zap` — **Tool Integrations** — "Connect with Salesforce, HubSpot, Slack, and 100+ tools"
  4. `BarChart3` — **Rich Output** — "Charts, tables, files, and code — not just plain text"
- **Layout**: demo RIGHT, features LEFT
- **Background**: `bg-neutral-offWhite`

### CogniAvatar (VideoShowcaseSection)

- **Move**: from position 3 to position 5
- **Layout flip**: demo LEFT (currently LEFT, stays LEFT since it's now in a LEFT-demo position)
- **Background**: `bg-white`
- **Feature list already uses icon+text** — standardize icon container to `w-10 h-10 rounded-xl` (currently uses `w-10 h-10 rounded-xl`, already correct)
- **CTA**: currently "Get Started Today" → change to "Explore CogniAvatar" linking to `/contact` (no product page yet)

### Monitor Live (Analytics)

- **Layout**: demo RIGHT (currently RIGHT, stays)
- **Background**: `bg-neutral-offWhite`
- **Feature list**: already icon+text, standardize icon container to `w-10 h-10 rounded-xl` (currently `w-5 h-5` container — needs upgrade)
- **Section padding**: standardize to `py-16 sm:py-20 lg:py-28` (currently `py-16 sm:py-20 lg:py-32`)

### Smart Scheduling

- **Layout**: demo LEFT (currently LEFT, stays)
- **Background**: `bg-white`
- **Badge**: change from `bg-transparent border border-blue-200` to `bg-blue-50` (match all others)
- **Feature list**: already icon+text, standardize icon container to `w-10 h-10 rounded-xl` (currently `w-5 h-5` container — needs upgrade)
- **Section padding**: standardize to `py-16 sm:py-20 lg:py-28` (currently `py-10 sm:py-12 lg:py-16`)
- **Add title+description** to each feature item (currently just one-line text)

## Section Padding Standardization

All 2-column product/feature sections: `py-16 sm:py-20 lg:py-28`

| Section | Current | New |
|---------|---------|-----|
| CogniVoice | `py-14 lg:py-20` | `py-16 sm:py-20 lg:py-28` |
| CogniChat | `py-16 sm:py-20 lg:py-28` | unchanged |
| CogniHub | `py-16 sm:py-20 lg:py-28` | unchanged |
| CogniAvatar | `py-20 lg:py-28` | `py-16 sm:py-20 lg:py-28` |
| Monitor Live | `py-16 sm:py-20 lg:py-32` | `py-16 sm:py-20 lg:py-28` |
| Smart Scheduling | `py-10 sm:py-12 lg:py-16` | `py-16 sm:py-20 lg:py-28` |

## Background Color Assignments

Each section gets alternating background:

| # | Section | Background |
|---|---------|-----------|
| 1 | Hero | white (unchanged) |
| 2 | CogniVoice | `bg-neutral-offWhite` |
| 3 | CogniChat | `bg-white` |
| 4 | CogniHub | `bg-neutral-offWhite` |
| 5 | CogniAvatar | `bg-white` |
| 6 | Monitor Live | `bg-neutral-offWhite` |
| 7 | Smart Scheduling | `bg-white` |
| 8 | Features | `bg-neutral-offWhite` |
| 9 | Industry Solutions | `bg-white` |
| 10 | Integrations | `bg-neutral-offWhite` |
| 11 | Statistics | `bg-white` |
| 12 | CTA | `bg-neutral-offWhite` |

### Background changes needed

| Section | Current bg | New bg |
|---------|-----------|--------|
| CogniVoice (TryNowSection) | `bg-neutral-offWhite` | stays |
| CogniChat | `bg-neutral-offWhite` | `bg-white` |
| CogniHub | `bg-white` | `bg-neutral-offWhite` |
| CogniAvatar (VideoShowcaseSection) | `bg-white` | stays |
| Monitor Live | `bg-neutral-offWhite` | stays |
| Smart Scheduling | `bg-white` | stays |
| Features | `bg-neutral-offWhite` | stays |
| Industry Solutions | `bg-white` | stays |
| Integrations | `bg-white` | `bg-neutral-offWhite` |
| Statistics | `bg-neutral-offWhite` | `bg-white` |
| CTA | `bg-white` | `bg-neutral-offWhite` |

## Cleanup

- Delete commented-out Problem Section (~140 lines)
- Delete commented-out DemoCalls, ClientLogos, Testimonials, TrustBadges imports/references
- Verify all CTA links point to valid routes

## Full Site Audit Checklist

- [ ] All section badges use `bg-blue-50 text-blue-600` (not transparent/border)
- [ ] All product badges use "Product Type: Cogni**Name**" format with `text-fuchsia-500`
- [ ] All feature lists use standardized icon container (`w-10 h-10 rounded-xl bg-blue-100/70`)
- [ ] All section padding matches `py-16 sm:py-20 lg:py-28`
- [ ] All CTA buttons link to valid routes
- [ ] CogniAvatar CTA links to `/contact` (no product page yet)
- [ ] Navbar product links match available routes
- [ ] Footer product links match available routes
- [ ] No dead internal links across the site
- [ ] Background colors alternate correctly after reorder

## Files to Modify

- `src/pages/Home.jsx` — reorder sections, update CogniChat/CogniHub feature content, fix backgrounds, cleanup dead code
- `src/components/VideoShowcaseSection.jsx` — update background, standardize feature icon sizes, update CTA
- `src/components/TryNowSection.jsx` — update section padding, background
- `src/components/Navbar.jsx` — verify product links
- `src/components/Footer.jsx` — verify product links
