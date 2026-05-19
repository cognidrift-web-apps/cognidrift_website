# Contact Page Redesign

## Goal
Clean up Contact.jsx: remove dead code, broaden copy to cover all CogniDrift products (not just CogniVoice), add phone number field to form, display both company and personal phone numbers, and polish the layout.

## Scope
Single file: `src/pages/Contact.jsx`

## Changes

### Hero Section
- Eyebrow: "Get Started"
- Title: "Let's Build Your AI-Powered Business" with "AI-Powered" as gradient text
- Subtitle: "See how CogniDrift automates calls, chats, and workflows so your team can focus on what matters."
- No em dashes anywhere

### Contact Form (left column)
- Heading: "Get in Touch"
- Fields:
  - Name (required)
  - Email (required)
  - Phone number (optional, new field)
  - Company name (optional)
  - Industry dropdown (optional, using the existing industries array: Healthcare, Insurance, Real Estate, Professional Services, Other)
  - Message textarea with broadened placeholder: "Tell us about your business and what you are looking to automate."
- Submit button: "Send Message"
- Success/error states remain the same
- Add `phone` and `industry` to formData state and POST body

### Cal.com Booking Widget (right column)
- Heading: "Or Book a Demo"
- Subtitle: "Pick a time that works for you"
- Keep Cal.com inline embed as-is
- Fix duplicate useEffect (remove lines 42-51, keep 139-151)

### Contact Info Strip (below two columns)
- Three cards in a horizontal row:
  1. Email: contact@cognidrift.com, "We respond within 24 hours"
  2. Company: +1 (844) 584-1083, "Mon to Fri, 9am to 6pm EST"
  3. Direct: +1 (575) 418-1944, "Call or text anytime"
- Response time badge below: "Average response time: under 2 hours during business hours"

### Code Cleanup
- Remove unused imports: MapPin, ArrowRight, Building2, Stethoscope, HomeIcon, Briefcase (if not used for dropdown), MessageSquare, LiveSupportVisualization, GlobalAvailabilityMap
- Remove unused `benefits` array
- Remove unused `contactInfo` array (replaced by inline contact strip)
- Remove duplicate Cal.com useEffect
- Keep industries array only if adding dropdown

## Constraints
- No em dashes anywhere in copy
- Follow existing site patterns (fadeInUp, staggerContainer, section-title, hero-display, text-gradient)
- Consistent with CLAUDE.md design tokens
