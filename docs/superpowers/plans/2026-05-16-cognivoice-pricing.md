# CogniVoice Pricing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add CogniVoice pricing cards to the Phone Receptionist product page and create a detailed pricing subpage with comparison tables, add-ons, FAQ, and billing terms.

**Architecture:** Shared data file (`src/data/cognivoicePricing.js`) feeds a reusable `CogniVoicePricingCards` component rendered on both the product page and a new detail page. The detail page adds comparison tables, add-ons, concierge setup, billing terms, and an FAQ accordion.

**Tech Stack:** React 18, Vite, Tailwind CSS 3, Framer Motion, Lucide React icons, React Router DOM 6

---

## File Structure

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/data/cognivoicePricing.js` | All pricing content: plans, universal features, comparison data, add-ons, billing terms, FAQ |
| Create | `src/components/CogniVoicePricingCards.jsx` | Reusable 4-tier pricing cards with monthly/annual toggle |
| Create | `src/pages/products/PhoneReceptionistPricing.jsx` | Detailed pricing page with tables, add-ons, FAQ |
| Modify | `src/pages/products/PhoneReceptionist.jsx` | Insert pricing section between Benefits and CTA |
| Modify | `src/App.jsx` | Add lazy import and route for the pricing detail page |

---

### Task 1: Create Pricing Data File

**Files:**
- Create: `frontend/src/data/cognivoicePricing.js`

- [ ] **Step 1: Create the data directory and file**

```bash
mkdir -p frontend/src/data
```

- [ ] **Step 2: Write the pricing data file**

Create `frontend/src/data/cognivoicePricing.js`:

```js
export const plans = [
  {
    name: 'Essentials',
    price: 69,
    annualPrice: 57,
    subtitle: 'For solo practitioners just getting started',
    callVolume: 'Handles roughly 5 calls per day',
    minutes: 100,
    phoneNumbers: 1,
    concurrentCalls: 1,
    supportLevel: 'Email (48-hour response)',
    overageRate: '$1.00/min',
    popular: false,
    cta: 'Start Free Trial',
    ctaLink: '/contact',
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
      'Email support (48-hour response)',
    ],
  },
  {
    name: 'Starter',
    price: 109,
    annualPrice: 91,
    subtitle: 'For small teams with steady call volume',
    callVolume: 'Handles roughly 8–10 calls per day',
    minutes: 200,
    phoneNumbers: 1,
    concurrentCalls: 1,
    supportLevel: 'Email and chat (24-hour response)',
    overageRate: '$1.00/min',
    popular: false,
    cta: 'Start Free Trial',
    ctaLink: '/contact',
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
    callVolume: 'Handles roughly 15–20 calls per day',
    minutes: 500,
    phoneNumbers: 2,
    concurrentCalls: 2,
    supportLevel: 'Priority (12-hour response)',
    overageRate: '$1.00/min',
    popular: true,
    cta: 'Start Free Trial',
    ctaLink: '/contact',
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
    price: null,
    annualPrice: null,
    startingFrom: 349,
    subtitle: 'For high-volume businesses',
    callVolume: '1,000+ minutes per month',
    minutes: '1,000+',
    phoneNumbers: 'Up to 3',
    concurrentCalls: 'Up to 3',
    supportLevel: 'Dedicated',
    overageRate: 'Custom',
    popular: false,
    cta: 'Talk to Sales',
    ctaLink: '/contact',
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

export const comparisonRows = [
  { label: 'Monthly price', values: ['$69', '$109', '$229', 'Custom'] },
  { label: 'AI call minutes', values: ['100', '200', '500', '1,000+'] },
  { label: 'Phone numbers', values: ['1', '1', '2', 'Up to 3'] },
  { label: 'Concurrent calls', values: ['1', '1', '2', 'Up to 3'] },
  { label: 'Custom greeting', values: [true, true, true, true] },
  { label: 'Calendar booking', values: [true, true, true, true] },
  { label: 'SMS confirmations', values: [true, true, true, true] },
  { label: 'Call recording (90 days)', values: [true, true, true, true] },
  { label: 'Transcripts and summaries', values: [true, true, true, true] },
  { label: 'Full analytics dashboard', values: [true, true, true, true] },
  { label: 'AI agent customization', values: [true, true, true, true] },
  { label: 'Smart call routing', values: [true, true, true, true] },
  { label: '10 languages', values: [true, true, true, true] },
  { label: 'Support', values: ['Email (48hr)', 'Email + chat (24hr)', 'Priority (12hr)', 'Dedicated'] },
  { label: 'Overage rate', values: ['$1.00/min', '$1.00/min', '$1.00/min', 'Custom'] },
]

export const addOns = [
  { name: 'Extra phone number', price: '$10/mo each', description: 'Add a local number in another city or area code' },
  { name: 'CRM integration', price: '$39/mo', description: 'Direct sync to HubSpot, Salesforce, or other CRM platforms' },
  { name: 'Custom AI voice', price: '$50/mo', description: 'Match the AI voice to your brand personality' },
  { name: 'Extended call archive', price: '$10/mo', description: 'Keep recordings for 1 year instead of 90 days' },
]

export const conciergeSetup = [
  'AI trained on your business (services, hours, team, FAQs)',
  'Phone number provisioned and tested',
  'Calendar integration connected and verified',
  'Custom greeting script written and reviewed with you',
  'SMS templates configured (appointment links, confirmations)',
  '30 days of post-launch tuning (we refine based on real calls)',
]

export const billingTerms = [
  { label: 'Free trial', value: '14 days. No credit card required. Full access to your selected plan.' },
  { label: 'Monthly billing', value: 'Billed at the start of each month. Cancel anytime.' },
  { label: 'Annual billing', value: 'Pay for 10 months, get 12. Save 17%.' },
  { label: 'Upgrade', value: 'Instant. Prorated billing for the current month.' },
  { label: 'Downgrade', value: 'Takes effect at the end of your current billing period.' },
  { label: 'Overages', value: '$1.00/min. Billed monthly in arrears. Alerts at 80%, 90%, 100%.' },
  { label: 'Cancellation', value: 'Monthly plans: cancel anytime. Annual plans: honored through term.' },
]

export const faqs = [
  {
    question: 'What happens if I go over my minutes?',
    answer: 'Calls keep coming through at $1.00 per extra minute. We never cut off your calls — your customers never hear a busy signal. We send alerts at 80%, 90%, and 100% usage so you can upgrade before overages add up.',
  },
  {
    question: 'Can I change my plan later?',
    answer: 'Yes. Upgrade instantly with prorated billing. Downgrade at the end of your current billing period.',
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No. Monthly plans can be cancelled anytime. Annual plans save you 17% and are honored through the term.',
  },
  {
    question: 'What does the 14-day trial include?',
    answer: 'Full access to your selected plan. We set up your AI, connect your calendar, and give you a dedicated phone number. If it is not for you, cancel before the trial ends — no charge.',
  },
  {
    question: 'What if my AI says something wrong?',
    answer: 'That is what the 30-day tuning period is for. We review your real calls and refine the AI responses. After 30 days, you can request adjustments anytime through support.',
  },
  {
    question: 'Do I need to be technical to use this?',
    answer: 'Not at all. We set everything up for you. Your dashboard lets you see calls, listen to recordings, read transcripts, check analytics, and customize your AI agent — no code or technical skills needed.',
  },
  {
    question: 'Can I keep my existing phone number?',
    answer: 'Yes. We can port your existing number or set up call forwarding so your current number rings through to CogniVoice.',
  },
  {
    question: 'Is my data secure?',
    answer: 'All calls are encrypted in transit and at rest. Recordings are stored securely and automatically deleted after your retention period (90 days standard, 1 year with extended archive). We never share your data with third parties.',
  },
  {
    question: 'Do you support multiple locations?',
    answer: 'Yes. Professional includes 2 phone numbers, and Enterprise includes up to 3. Need more? Add extra numbers at $10/month each — each location gets its own local number and customized greeting.',
  },
  {
    question: 'Can I connect my CRM?',
    answer: 'Every plan includes free webhook and Zapier integration — connect to any tool without extra cost. For direct CRM sync (HubSpot, Salesforce, and others), add our CRM integration for $39/month.',
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/data/cognivoicePricing.js
git commit -m "feat: add CogniVoice pricing data file"
```

---

### Task 2: Create CogniVoicePricingCards Component

**Files:**
- Create: `frontend/src/components/CogniVoicePricingCards.jsx`

- [ ] **Step 1: Create the pricing cards component**

Create `frontend/src/components/CogniVoicePricingCards.jsx`:

```jsx
import { motion } from 'framer-motion'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { plans } from '../data/cognivoicePricing'

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
  cyan: {
    bg: 'bg-cyan-500',
    light: 'bg-cyan-50',
    text: 'text-cyan-600',
    border: 'border-cyan-200',
    glow: 'shadow-cyan-500/20',
  },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const CogniVoicePricingCards = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  return (
    <div>
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
              key={plan.name}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? `border-2 ${colors.border} ${colors.glow} shadow-2xl scale-[1.02]`
                  : 'border-2 border-neutral-border hover:shadow-xl'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className={`${colors.bg} text-white text-center py-2.5 font-bold text-xs uppercase tracking-wider`}>
                  Most Popular
                </div>
              )}

              {/* Card Content */}
              <div className={`p-6 ${plan.popular ? '' : 'pt-6'}`}>
                {/* Plan Name */}
                <h3 className="text-xl font-bold text-text-primary mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div className="mb-4">
                  {price ? (
                    <>
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-bold text-text-primary">${price}</span>
                        <span className="text-text-secondary mb-1">/mo</span>
                      </div>
                      {billingPeriod === 'yearly' && (
                        <p className="text-xs text-green-600 font-semibold mt-1">
                          Billed annually — save ${(plan.price - plan.annualPrice) * 12}/yr
                        </p>
                      )}
                    </>
                  ) : (
                    <div>
                      <span className="text-2xl font-bold text-text-primary">Custom pricing</span>
                      <p className="text-sm text-text-secondary mt-1">Starting from ${plan.startingFrom}/mo</p>
                    </div>
                  )}
                </div>

                {/* Minutes */}
                <p className="text-sm font-semibold text-primary-600 mb-4">
                  {typeof plan.minutes === 'number' ? `${plan.minutes} AI call minutes included` : `${plan.minutes} AI call minutes`}
                </p>

                {/* CTA Button */}
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

                {/* Divider */}
                <div className="h-px bg-neutral-border mb-4"></div>

                {/* Features */}
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
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default CogniVoicePricingCards
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/components/CogniVoicePricingCards.jsx
git commit -m "feat: add CogniVoicePricingCards component"
```

---

### Task 3: Add Pricing Section to PhoneReceptionist Page

**Files:**
- Modify: `frontend/src/pages/products/PhoneReceptionist.jsx`

- [ ] **Step 1: Add import for the pricing cards component and Link update**

At the top of `PhoneReceptionist.jsx`, add the import:

```jsx
import CogniVoicePricingCards from '../../components/CogniVoicePricingCards'
```

- [ ] **Step 2: Update the "View Pricing" hero button to scroll to #pricing**

Replace this block (around line 118-125):
```jsx
<Link to="/pricing">
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-blue-600 bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
  >
    View Pricing
  </motion.button>
</Link>
```

With:
```jsx
<a href="#pricing">
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-blue-600 bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
  >
    View Pricing
  </motion.button>
</a>
```

- [ ] **Step 3: Insert pricing section between Benefits and CTA sections**

Insert this new section just before the final `{/* CTA Section */}` comment (before line 284):

```jsx
      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              CogniVoice <span className="text-blue-600">Pricing</span>
            </h2>
            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Simple, transparent pricing. No hidden fees. Every plan includes a dedicated phone number, AI call handling, appointment booking, and more.
            </p>
          </motion.div>

          <CogniVoicePricingCards />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/products/phone-receptionist/pricing"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Compare all plans in detail
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
```

Note: `ArrowRight` is already imported at the top of the file.

- [ ] **Step 4: Verify the app still compiles**

```bash
cd frontend && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/pages/products/PhoneReceptionist.jsx
git commit -m "feat: add CogniVoice pricing section to phone receptionist page"
```

---

### Task 4: Create Detailed Pricing Page

**Files:**
- Create: `frontend/src/pages/products/PhoneReceptionistPricing.jsx`

- [ ] **Step 1: Create the detailed pricing page**

Create `frontend/src/pages/products/PhoneReceptionistPricing.jsx`:

```jsx
import SEOMeta from '../../components/SEOMeta'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ChevronDown, Phone, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import CogniVoicePricingCards from '../../components/CogniVoicePricingCards'
import {
  plans,
  universalFeatures,
  comparisonRows,
  addOns,
  conciergeSetup,
  billingTerms,
  faqs,
} from '../../data/cognivoicePricing'

const PhoneReceptionistPricing = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const planNames = plans.map((p) => p.name)

  return (
    <div className="min-h-screen bg-white">
      <SEOMeta
        title="CogniVoice Pricing - AI Phone Receptionist Plans"
        description="Simple, transparent pricing for CogniVoice AI phone receptionist. Plans starting at $69/mo. 14-day free trial, no credit card required."
        keywords="AI receptionist pricing, CogniVoice plans, AI phone answering cost"
        url="/products/phone-receptionist/pricing"
      />

      {/* Hero Header */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-300 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-indigo rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-2 rounded-full mb-6"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">CogniVoice Pricing</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Simple, transparent{' '}
              <span className="text-gradient">pricing</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-4"
            >
              No hidden fees. Every plan includes a dedicated phone number, AI call handling, appointment booking, SMS confirmations, call recording, transcripts, full analytics dashboard, and custom greeting.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-base text-text-muted max-w-2xl mx-auto"
            >
              Pick the plan that fits your call volume. Upgrade or cancel anytime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 sm:pb-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <CogniVoicePricingCards />
        </div>
      </section>

      {/* Universal Features Table */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              What is included in <span className="text-gradient">every plan</span>
            </h2>
            <p className="text-text-secondary">No exceptions. Every feature below works on every plan.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-neutral-border overflow-hidden"
          >
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-5 gap-0 bg-primary-600 text-white font-bold text-sm">
              <div className="p-4">Feature</div>
              {planNames.map((name) => (
                <div key={name} className="p-4 text-center">{name}</div>
              ))}
            </div>

            {/* Table Rows */}
            {universalFeatures.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-5 gap-0 border-t border-neutral-border ${
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-offWhite'
                }`}
              >
                <div className="p-4 font-medium text-text-primary text-sm">{feature}</div>
                {planNames.map((name) => (
                  <div key={name} className="p-4 flex items-center justify-center md:justify-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span className="md:hidden ml-2 text-sm text-text-secondary">{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Compare plans <span className="text-gradient">at a glance</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <div className="min-w-[640px] bg-white rounded-2xl shadow-lg border border-neutral-border overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-5 gap-0 bg-primary-600 text-white font-bold text-sm">
                <div className="p-4"></div>
                {plans.map((plan) => (
                  <div key={plan.name} className="p-4 text-center">
                    {plan.name}
                    {plan.popular && <Star className="w-3.5 h-3.5 inline ml-1" />}
                  </div>
                ))}
              </div>

              {/* Rows */}
              {comparisonRows.map((row, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-5 gap-0 border-t border-neutral-border ${
                    index % 2 === 0 ? 'bg-white' : 'bg-neutral-offWhite'
                  }`}
                >
                  <div className="p-4 font-medium text-text-primary text-sm">{row.label}</div>
                  {row.values.map((value, vIndex) => (
                    <div key={vIndex} className="p-4 text-center text-sm text-text-secondary">
                      {value === true ? (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        </div>
                      ) : (
                        <span className="font-medium">{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Optional <span className="text-gradient">add-ons</span>
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              These are genuine upgrades — not missing features. Everything above works perfectly out of the box.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
          >
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-md border border-neutral-border hover:shadow-lg transition-shadow"
              >
                <p className="text-lg font-bold text-text-primary mb-1">{addon.name}</p>
                <p className="text-primary-600 font-bold text-sm mb-3">{addon.price}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{addon.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overage Info */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">
              Need more minutes? <span className="text-gradient">No surprises.</span>
            </h2>
            <div className="text-left bg-neutral-offWhite rounded-2xl p-6 sm:p-8 border border-neutral-border space-y-4 text-text-secondary leading-relaxed">
              <p>
                If you go over your included minutes, calls keep flowing at <span className="font-bold text-text-primary">$1.00 per extra minute</span>. Your AI never stops answering — your customers never hear a busy signal.
              </p>
              <p>
                We alert you at 80%, 90%, and 100% of your minutes so there are no surprises. If the math makes sense, we will recommend upgrading — it is usually cheaper.
              </p>
              <p>
                Want a hard cap instead? Set a monthly limit in your dashboard. When you hit it, calls route to voicemail or a backup number of your choice.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concierge Setup */}
      <section className="py-16 sm:py-20 bg-neutral-offWhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 sm:p-10 border-2 border-primary-100 shadow-lg"
          >
            <div className="text-center mb-8">
              <p className="text-sm font-bold text-primary-600 uppercase tracking-wider mb-2">Included Free</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
                Concierge Setup
              </h2>
              <p className="text-text-secondary">
                <span className="font-bold text-text-primary">$999 value</span> — waived for founding customers.
              </p>
              <p className="text-sm text-text-secondary mt-2">
                Our team configures your AI receptionist for you. No technical skills required. You are live in days, not weeks.
              </p>
            </div>

            <div className="space-y-3">
              {conciergeSetup.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-primary-600" />
                  </div>
                  <span className="text-text-secondary leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Billing and Terms */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary">
              Billing and <span className="text-gradient">terms</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg border border-neutral-border overflow-hidden"
          >
            {billingTerms.map((term, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 sm:grid-cols-3 gap-0 border-t border-neutral-border first:border-t-0 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-neutral-offWhite'
                }`}
              >
                <div className="p-4 sm:p-5 font-bold text-text-primary text-sm">{term.label}</div>
                <div className="p-4 sm:p-5 sm:col-span-2 text-sm text-text-secondary leading-relaxed">{term.value}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-offWhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Frequently asked <span className="text-gradient">questions</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <div
                    className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? 'border-primary-500 shadow-xl shadow-primary-500/10'
                        : 'border-neutral-border hover:border-primary-300 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                    >
                      <h3 className={`text-base sm:text-lg font-bold leading-tight transition-colors duration-200 ${
                        isOpen ? 'text-primary-600' : 'text-text-primary'
                      }`}>
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={`flex-shrink-0 ${isOpen ? 'text-primary-600' : 'text-text-muted'}`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5">
                            <div className="h-px bg-gradient-to-r from-primary-200 to-transparent mb-4"></div>
                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden border-2 border-primary-100"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                Ready to try <span className="text-gradient">CogniVoice</span>?
              </h2>
              <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto mb-8">
                Start your 14-day free trial. Concierge setup included. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary px-8 py-4 text-lg"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300"
                  >
                    Talk to Sales
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PhoneReceptionistPricing
```

- [ ] **Step 2: Commit**

```bash
git add frontend/src/pages/products/PhoneReceptionistPricing.jsx
git commit -m "feat: add detailed CogniVoice pricing page"
```

---

### Task 5: Add Route in App.jsx

**Files:**
- Modify: `frontend/src/App.jsx`

- [ ] **Step 1: Add lazy import**

After line 15 (`const PhoneReceptionist = lazy(...)`) add:

```jsx
const PhoneReceptionistPricing = lazy(() => import('./pages/products/PhoneReceptionistPricing'))
```

- [ ] **Step 2: Add route**

After line 79 (`<Route path="/products/phone-receptionist" element={<PhoneReceptionist />} />`), add:

```jsx
<Route path="/products/phone-receptionist/pricing" element={<PhoneReceptionistPricing />} />
```

- [ ] **Step 3: Verify build**

```bash
cd frontend && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/App.jsx
git commit -m "feat: add route for CogniVoice detailed pricing page"
```

---

### Task 6: Final Verification

- [ ] **Step 1: Run dev server and verify both pages**

```bash
cd frontend && npm run dev
```

Check in browser:
- `http://localhost:5173/products/phone-receptionist` — scroll down, pricing cards section visible with 4 tiers, "Compare all plans" link works
- `http://localhost:5173/products/phone-receptionist/pricing` — full detail page renders: cards, tables, add-ons, concierge, billing, FAQ, CTA
- Monthly/annual toggle works on both pages
- "View Pricing" hero button scrolls to #pricing section
- Enterprise card shows "Custom pricing / Starting from $349/mo"
- No emojis anywhere — all checkmarks are lucide Check icons

- [ ] **Step 2: Final commit (if any cleanup needed)**

```bash
git add -A && git commit -m "fix: pricing page cleanup"
```

Only if fixes were needed during verification.
