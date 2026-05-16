# CogniVoice Pricing Page Design

## Overview

Add per-product pricing for the CogniVoice (AI Phone Receptionist) product across two surfaces:

1. **Pricing cards section** on the existing `/products/phone-receptionist` page
2. **Detailed pricing page** at `/products/phone-receptionist/pricing`

A shared data file ensures both pages stay in sync. The existing `/pricing` page remains untouched for now.

---

## Architecture

### Files to create

- `src/data/cognivoicePricing.js` — Single source of truth for all pricing data (plans, features, add-ons, FAQ)
- `src/pages/products/PhoneReceptionistPricing.jsx` — Detailed pricing page
- `src/components/CogniVoicePricingCards.jsx` — Reusable pricing cards component (used on both pages)

### Files to modify

- `src/pages/products/PhoneReceptionist.jsx` — Add pricing section between Benefits and CTA
- `src/App.jsx` — Add route for `/products/phone-receptionist/pricing`

---

## Data Structure (`src/data/cognivoicePricing.js`)

```js
export const plans = [
  {
    name: 'Essentials',
    price: 69,
    annualPrice: 57, // ~17% discount (10 months for 12)
    subtitle: 'For solo practitioners just getting started',
    callVolume: 'Handles roughly 5 calls per day',
    minutes: 100,
    phoneNumbers: 1,
    concurrentCalls: 1,
    supportLevel: 'Email (48-hour response)',
    popular: false,
    cta: 'Start Free Trial',
    color: 'blue',
    features: [
      'AI receptionist answers every call, 24/7',
      'Custom greeting script',
      'Books appointments to your calendar automatically',
      'Sends confirmation texts and appointment links',
      'Call recordings and transcripts (90 days)',
      'Full analytics dashboard (call volume, outcomes, trends)',
      'Customize your AI agent anytime from your dashboard',
      'Smart call routing by intent or time of day',
      '10 languages included',
    ],
  },
  {
    name: 'Starter',
    price: 109,
    annualPrice: 91,
    subtitle: 'For small teams with steady call volume',
    callVolume: 'Handles roughly 8-10 calls per day',
    minutes: 200,
    phoneNumbers: 1,
    concurrentCalls: 1,
    supportLevel: 'Email and chat (24-hour response)',
    popular: false,
    cta: 'Start Free Trial',
    color: 'blue',
    features: [
      'Everything in Essentials, plus:',
      'Email and chat support (24-hour response)',
    ],
  },
  {
    name: 'Professional',
    price: 229,
    annualPrice: 191,
    subtitle: 'For growing businesses and busy practices',
    callVolume: 'Handles roughly 15-20 calls per day',
    minutes: 500,
    phoneNumbers: 2,
    concurrentCalls: 2,
    supportLevel: 'Priority (12-hour response)',
    popular: true,
    cta: 'Start Free Trial',
    color: 'purple',
    features: [
      'Everything in Starter, plus:',
      '2 phone numbers (main line + second location or after-hours)',
      '2 concurrent calls (handle two callers at once)',
      'Priority support (12-hour response)',
    ],
  },
  {
    name: 'Enterprise',
    price: null, // Custom
    annualPrice: null,
    startingFrom: 349,
    subtitle: 'For high-volume businesses',
    callVolume: '1,000+ minutes per month',
    minutes: '1,000+',
    phoneNumbers: 'Up to 3',
    concurrentCalls: 'Up to 3',
    supportLevel: 'Dedicated',
    popular: false,
    cta: 'Talk to Sales',
    color: 'cyan',
    features: [
      'Everything in Professional, plus:',
      'Custom minute allocation based on your volume',
      'Up to 3 phone numbers',
      'Up to 3 concurrent calls',
      'Dedicated onboarding specialist',
      'Dedicated account manager',
      'Custom SLA',
    ],
  },
]

export const universalFeatures = [
  'AI answers every call, 24/7',
  'Dedicated phone number',
  'Custom greeting script',
  'Books appointments to your calendar',
  'Sends confirmation texts to callers',
  'Call recordings (90 days)',
  'Call transcripts and AI summaries',
  'Full analytics dashboard',
  'Customize your AI agent from dashboard',
  'Smart call routing',
  '10 languages',
  'Compliance built in (TCPA, DNC)',
  'Concierge setup (we build it for you)',
  '14-day free trial',
]

export const addOns = [
  { name: 'Extra phone number', price: '$10/mo each', description: 'Add a local number in another city or area code' },
  { name: 'CRM integration', price: '$39/mo', description: 'Direct sync to HubSpot, Salesforce, or other CRM platforms' },
  { name: 'Custom AI voice', price: '$50/mo', description: 'Match the AI voice to your brand personality' },
  { name: 'Extended call archive', price: '$10/mo', description: 'Keep recordings for 1 year instead of 90 days' },
]

export const faqs = [
  { question: 'What happens if I go over my minutes?', answer: '...' },
  { question: 'Can I change my plan later?', answer: '...' },
  // ... all 10 FAQ items
]
```

---

## Pricing Cards Component (`CogniVoicePricingCards.jsx`)

- Accepts `plans` data as prop (or imports from data file)
- Monthly/Annual toggle with "Save 17%" badge
- 4-column responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`)
- Card style matches existing `/pricing` page:
  - `rounded-3xl`, `shadow-lg`, `border-2`
  - Popular card: purple border, "Most Popular" badge, slight `scale-105`
  - Framer Motion `whileHover={{ y: -8 }}`
  - Lucide `Check` icon for feature list items (no emojis)
- Each card shows: plan name, subtitle, price (or "Custom"), minutes included, 4-5 key features, CTA button
- Enterprise shows "Starting from $349/mo"

---

## Phone Receptionist Page Changes

**New section** inserted between "Benefits" and "CTA":

```
<section id="pricing">
  Section header: "CogniVoice Pricing" + subtitle
  <CogniVoicePricingCards />
  Link: "Compare all plans in detail →" → /products/phone-receptionist/pricing
</section>
```

**Hero button update:** "View Pricing" button scrolls to `#pricing` section instead of linking to `/pricing`.

---

## Detailed Pricing Page (`PhoneReceptionistPricing.jsx`)

Route: `/products/phone-receptionist/pricing`

### Page sections (top to bottom):

1. **Hero header** — Title, subtitle, "Every plan includes..." paragraph, monthly/annual toggle
2. **Pricing cards** — `<CogniVoicePricingCards />` (reused component)
3. **Universal features table** — "What is included in every plan" — all 4 columns show checkmarks. Alternating row backgrounds (`bg-neutral-offWhite` / `bg-white`). Checkmark: `Check` icon from lucide in a small colored circle.
4. **Comparison table** — "Compare plans at a glance" — differentiators: price, minutes, phone numbers, concurrent calls, support, overage rate. Same table style.
5. **Add-ons section** — Grid of 4 cards showing name, price, description.
6. **Overage info** — Text section: $1.00/min, alerts at 80/90/100%, hard-cap option.
7. **Concierge setup** — Highlighted card/box: "$999 value — waived for founding customers." Bullet list of inclusions.
8. **Billing and terms** — Clean grid/table with trial, billing, upgrade/downgrade, overages, cancellation info.
9. **FAQ** — Accordion with AnimatePresence + ChevronDown (matching existing FAQ pattern). All 10 questions.
10. **CTA** — "Ready to try CogniVoice?" + two buttons (Start Free Trial, Talk to Sales)

### Visual style:

- White background with subtle blue gradient blobs (matching existing page patterns)
- Section spacing: `py-16 sm:py-20 lg:py-24`
- Tables: responsive (horizontal scroll on mobile or stacked cards)
- All text uses existing font system (Montserrat for headings, Inter for body)
- No emojis anywhere — checkmarks via lucide `Check` icon

---

## Routing

In `App.jsx`, add lazy import and route:

```jsx
const PhoneReceptionistPricing = lazy(() => import('./pages/products/PhoneReceptionistPricing'))
// ...
<Route path="/products/phone-receptionist/pricing" element={<PhoneReceptionistPricing />} />
```

---

## Design decisions

- **No emojis:** All checkmarks/indicators use lucide-react `Check` icon in small colored circles
- **Shared data:** Single `cognivoicePricing.js` file prevents content drift between the two pages
- **Reusable pattern:** This approach (cards on product page + detail subpage) can be replicated for other products
- **Annual pricing:** 17% discount (pay 10 months, get 12) as specified in user content
- **Tables on mobile:** Horizontal scroll with sticky first column, or collapse to stacked cards on small screens
