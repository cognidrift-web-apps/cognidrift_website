# CogniDrift AI Agent - Development Guidelines

## Project Overview
CogniDrift is an AI-powered receptionist and communication platform. This document provides guidelines for maintaining a lightweight, consistent, and reusable codebase.

---

## 1. Project Structure

```
frontend/src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI primitives (Button, Card, Badge, Input, Dialog)
│   ├── sections/        # Page section components (reusable across pages)
│   └── [feature].jsx    # Feature-specific components
├── pages/               # Route pages
│   ├── products/        # Product pages
│   ├── solutions/       # Industry solution pages
│   └── resources/       # Blog, Help, Case Studies
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── lib/                 # Third-party integrations
└── styles/              # Global styles (index.css)
```

---

## 2. Reusable Components

### 2.1 Section Header Component
Use consistent section headers across all pages. Standard pattern:

```jsx
// Badge + Title + Subtitle pattern
<motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6">
  <Icon className="w-4 h-4" />
  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">{label}</span>
</motion.div>

<motion.h2 variants={fadeInUp} className="section-title hero-display">
  {title} <span className="text-gradient">{highlight}</span>
</motion.h2>

<motion.p variants={fadeInUp} className="section-subtitle">
  {description}
</motion.p>
```

### 2.2 Color Scheme for Section Badges
Use transparent backgrounds with matching text/icon colors:

| Section Type | Background | Text/Icon |
|-------------|------------|-----------|
| How It Works | `bg-blue-50` | `text-blue-600` |
| Features | `bg-blue-50` | `text-blue-600` |
| Scheduling | `bg-blue-50` | `text-blue-600` |
| Analytics | `bg-blue-50` | `text-blue-600` |
| Integrations | `bg-blue-50` | `text-blue-600` |
| Industry | `bg-blue-50` | `text-blue-600` |

### 2.3 Card Components
Standard card patterns to reuse:

```jsx
// Feature Card
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="group relative bg-white border-2 border-neutral-border hover:border-primary-300 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
>
  {/* Hover background */}
  <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

  {/* Icon */}
  <motion.div
    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
    className="relative w-12 h-12 sm:w-14 sm:h-14 bg-{color}-50 rounded-xl flex items-center justify-center"
  >
    <Icon className="w-6 h-6 text-{color}-600" />
  </motion.div>

  {/* Content */}
  <h3 className="relative text-lg font-bold text-text-primary mb-2 group-hover:text-primary-600 transition-colors">
    {title}
  </h3>
  <p className="relative text-sm text-text-secondary">{description}</p>
</motion.div>
```

---

## 3. Animation System

### 3.1 Standard Animation Variants
Define once, use everywhere:

```jsx
// In utils/animations.js or at component top
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
}
```

### 3.2 Hover Animations
Consistent hover effects:

```jsx
// Cards: lift + scale
whileHover={{ y: -8, scale: 1.02 }}
transition={{ type: "spring", stiffness: 300 }}

// Icons: shake + scale
whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
transition={{ duration: 0.5 }}

// Buttons: scale
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

---

## 4. Design Tokens (CSS Variables)

### 4.1 Colors (defined in index.css)
```css
:root {
  /* Primary */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;

  /* Text */
  --text-primary: #1a1a2e;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;

  /* Neutral */
  --neutral-offWhite: #f8fafc;
  --neutral-border: #e2e8f0;
}
```

### 4.2 Typography Classes
```css
.section-title     { @apply text-3xl sm:text-4xl lg:text-5xl font-bold; }
.section-subtitle  { @apply text-base sm:text-lg text-text-secondary max-w-3xl mx-auto; }
.section-eyebrow   { @apply text-sm uppercase tracking-wider text-primary-600 font-bold; }
.hero-display      { font-family: 'Montserrat', sans-serif; }
.text-gradient     { @apply bg-gradient-to-r from-primary-500 to-accent-indigo bg-clip-text text-transparent; }
```

### 4.3 Spacing
- Section padding: `py-16 sm:py-20 lg:py-28`
- Content max-width: `max-w-content` or `max-w-7xl`
- Container padding: `px-4 sm:px-6 lg:px-8`

---

## 5. Component Reusability Guidelines

### 5.1 DRY Principles
- **Extract repeated JSX** into components when used 3+ times
- **Use props** for variations instead of duplicating components
- **Create HOCs or hooks** for shared logic

### 5.2 Recommended Reusable Components to Create

```
components/
├── ui/
│   ├── SectionHeader.jsx      # Badge + Title + Subtitle
│   ├── FeatureCard.jsx        # Standard feature card
│   ├── IndustryCard.jsx       # Industry solution card
│   ├── StepCard.jsx           # Workflow step card
│   ├── IntegrationCard.jsx    # Integration logo card
│   ├── StatItem.jsx           # Animated statistic
│   └── CTASection.jsx         # Call-to-action section
├── sections/
│   ├── HeroSection.jsx        # Page hero
│   ├── FeaturesGrid.jsx       # Bento grid features
│   ├── TestimonialsSection.jsx
│   └── IntegrationsSection.jsx
```

### 5.3 Props Pattern Example

```jsx
// SectionHeader.jsx
const SectionHeader = ({
  icon: Icon,
  label,
  title,
  highlight,
  subtitle,
  colorScheme = 'blue' // blue, purple, teal, indigo, etc.
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    className="section-header"
  >
    <motion.div
      variants={fadeInUp}
      className={`inline-flex items-center gap-2 bg-${colorScheme}-50 text-${colorScheme}-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">{label}</span>
    </motion.div>

    <motion.h2 variants={fadeInUp} className="section-title hero-display">
      {title} <span className="text-gradient">{highlight}</span>
    </motion.h2>

    <motion.p variants={fadeInUp} className="section-subtitle">
      {subtitle}
    </motion.p>
  </motion.div>
)
```

---

## 6. Icons & Images

### 6.1 Icons
- Primary: `lucide-react` for all icons
- Secondary: `react-icons` for brand icons (si* for brands)

```jsx
import { Phone, Calendar, Zap } from 'lucide-react'
import { SiSalesforce, SiHubspot } from 'react-icons/si'
```

### 6.2 Images
- Use `placehold.co` or `unsplash` for placeholders
- Store production images in `public/images/`
- Use WebP format for production

---

## 7. Performance Guidelines

### 7.1 Code Splitting
- Use `React.lazy()` for route-level code splitting
- Lazy load heavy components (charts, maps, animations)

### 7.2 Animation Performance
- Use `transform` and `opacity` only for animations
- Add `will-change` sparingly
- Use `viewport={{ once: true }}` for scroll animations

### 7.3 Bundle Size
- Import only needed icons: `import { Phone } from 'lucide-react'`
- Avoid importing entire libraries
- Use tree-shaking friendly imports

---

## 8. File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `SectionHeader.jsx` |
| Hooks | camelCase with `use` prefix | `useScrollAnimation.js` |
| Utils | camelCase | `animations.js` |
| Pages | PascalCase | `PhoneReceptionist.jsx` |
| CSS | kebab-case or component name | `index.css`, `ScrollStack.css` |

---

## 9. When Adding New Pages

1. **Check existing components** before creating new ones
2. **Use SectionHeader** for all section titles
3. **Follow the color scheme** (transparent badges)
4. **Reuse animation variants** from utils/animations.js
5. **Follow responsive patterns**: `text-sm sm:text-base lg:text-lg`

---

## 10. Design System Quick Reference

### Section Badge Pattern
```jsx
className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 sm:px-5 py-2 rounded-full mb-4 sm:mb-6"
```

### Section Container
```jsx
<section className="py-16 sm:py-20 lg:py-28 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* content */}
  </div>
</section>
```

### Responsive Text Sizes
```
Heading: text-3xl sm:text-4xl lg:text-5xl
Subtitle: text-base sm:text-lg md:text-xl
Body: text-sm sm:text-base
Small: text-xs sm:text-sm
```

---

## 11. Reusable Components Available

### GlowCard (`components/ui/GlowCard.jsx`)
Animated glow effect container with liquid glass styling. Use for showcasing important UI elements.

```jsx
import GlowCard from './ui/GlowCard'

<GlowCard
  glowColor="cyan-purple"  // 'cyan-purple' | 'blue' | 'purple' | 'green' | 'orange'
  glowSize="md"            // 'sm' | 'md' | 'lg'
  showCornerAccents={true} // Show corner border accents
  animate={true}           // Enable glow animation
  borderRadius="3xl"       // 'xl' | '2xl' | '3xl'
  padding="md"             // 'sm' | 'md' | 'lg'
>
  {/* Your content */}
</GlowCard>
```

**Used in:** VideoShowcaseSection, TryNowSection, AIConversationFlow, AnimatedCalendar, AnimatedDashboard

---

## 12. TODO: Components to Extract

Priority components to create for better reusability:

- [ ] `SectionHeader` - Unified section header component
- [ ] `FeatureCard` - Configurable feature card
- [ ] `StepCard` - Workflow/process step card
- [ ] `CTABanner` - Call-to-action banner section
- [ ] `AnimatedIcon` - Icon with standard hover animation
- [ ] `GradientText` - Text with gradient styling

---

## 13. Superdesign Workflow (for standalone designs)

When creating standalone HTML designs:
1. Layout design (ASCII wireframe)
2. Theme design (colors, fonts, spacing)
3. Animation design
4. Generate HTML file

Save all design files to `.superdesign/design_iterations/` folder.
