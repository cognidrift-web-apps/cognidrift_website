# Copilot Instructions for CogniDrift AI Website

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a premium AI company website for CogniDrift AI Solutions, providing digital workforce services powered by AI. The website showcases AI agents, automated solutions, and premium business services.

## Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **3D Graphics**: Three.js (when needed)
- **Documentation**: TypeDoc
- **Deployment**: Vercel

## Architecture Principles
1. **Modular Design**: Each component/module should have single responsibility
2. **Low Coupling**: Minimal dependencies between modules
3. **High Cohesion**: Related functionality grouped together
4. **Type Safety**: Comprehensive TypeScript usage
5. **Scalability**: Easy to extend and maintain

## Code Standards
- Use TypeScript with strict type checking
- Follow functional programming patterns where possible
- Implement comprehensive error handling
- Write descriptive variable and function names
- Use consistent naming conventions (camelCase for variables, PascalCase for components)
- Prefer composition over inheritance
- Implement proper data validation with Zod schemas

## File Organization
```
├── src/
│   ├── app/                          # Next.js 14 App Router
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Homepage
│   │   ├── globals.css               # Global styles & glass effects
│   │   ├── solutions/
│   │   │   ├── page.tsx              # Solutions overview
│   │   │   ├── ai-agents/page.tsx    # AI Agents page
│   │   │   ├── receptionist/page.tsx # AI Receptionist page
│   │   │   ├── voice-ai/page.tsx     # Voice AI page
│   │   │   └── document-ai/page.tsx  # Document Analysis page
│   │   ├── demos/
│   │   │   ├── page.tsx              # Demos hub
│   │   │   └── [demo]/page.tsx       # Dynamic demo pages
│   │   ├── pricing/page.tsx          # Pricing page
│   │   ├── about/page.tsx            # About page
│   │   └── contact/page.tsx          # Contact page
│   │
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ... (other ui components)
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/                 # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Solutions.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── TrustBadges.tsx
│   │   ├── glass/                    # Glass morphism components
│   │   │   ├── GlassCard.tsx
│   │   │   ├── GlassButton.tsx
│   │   │   ├── GlassModal.tsx
│   │   │   └── GlassBackground.tsx
│   │   └── forms/                    # Form components
│   │       ├── ContactForm.tsx
│   │       ├── DemoRequestForm.tsx
│   │       └── NewsletterForm.tsx
│   │
│   ├── modules/                      # Demo modules (isolated)
│   │   ├── ai-agent-demo/            # AI Agent Demo Module
│   │   │   ├── components/
│   │   │   │   ├── AgentInterface.tsx
│   │   │   │   ├── ChatBubble.tsx
│   │   │   │   ├── MessageInput.tsx
│   │   │   │   └── AgentControls.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAgent.ts
│   │   │   │   └── useAgentState.ts
│   │   │   ├── types/
│   │   │   │   └── agent.types.ts
│   │   │   ├── utils/
│   │   │   │   ├── agentHelpers.ts
│   │   │   │   └── mockData.ts
│   │   │   ├── store/
│   │   │   │   └── agentStore.ts
│   │   │   ├── README.md
│   │   │   └── index.ts
│   │   │
│   │   ├── receptionist-demo/        # AI Receptionist Demo Module
│   │   │   ├── components/
│   │   │   │   ├── PhoneInterface.tsx
│   │   │   │   ├── CallSimulator.tsx
│   │   │   │   ├── AppointmentBooking.tsx
│   │   │   │   └── VisitorManagement.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useReceptionist.ts
│   │   │   │   └── useCallState.ts
│   │   │   ├── types/
│   │   │   │   └── receptionist.types.ts
│   │   │   ├── utils/
│   │   │   │   ├── callHelpers.ts
│   │   │   │   └── mockCalls.ts
│   │   │   ├── README.md
│   │   │   └── index.ts
│   │   │
│   │   ├── voice-agent-demo/         # Voice AI Demo Module
│   │   │   ├── components/
│   │   │   │   ├── VoiceInterface.tsx
│   │   │   │   ├── AudioPlayer.tsx
│   │   │   │   ├── TranscriptDisplay.tsx
│   │   │   │   └── SentimentAnalysis.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useVoiceAgent.ts
│   │   │   │   └── useAudioProcessing.ts
│   │   │   ├── types/
│   │   │   │   └── voice.types.ts
│   │   │   ├── utils/
│   │   │   │   ├── audioHelpers.ts
│   │   │   │   └── mockAudio.ts
│   │   │   ├── README.md
│   │   │   └── index.ts
│   │   │
│   │   ├── document-analysis-demo/   # Document Analysis Demo Module
│   │   │   ├── components/
│   │   │   │   ├── DocumentUploader.tsx
│   │   │   │   ├── AnalysisResults.tsx
│   │   │   │   ├── DataExtraction.tsx
│   │   │   │   └── ProcessingStatus.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useDocumentAnalysis.ts
│   │   │   │   └── useFileUpload.ts
│   │   │   ├── types/
│   │   │   │   └── document.types.ts
│   │   │   ├── utils/
│   │   │   │   ├── documentHelpers.ts
│   │   │   │   └── mockAnalysis.ts
│   │   │   ├── README.md
│   │   │   └── index.ts
│   │   │
│   │   ├── chatbot-demo/             # Website Chatbot Module
│   │   │   ├── components/
│   │   │   │   ├── ChatWidget.tsx
│   │   │   │   ├── ChatMessage.tsx
│   │   │   │   ├── ChatInput.tsx
│   │   │   │   └── ChatHeader.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useChatbot.ts
│   │   │   │   └── useChatState.ts
│   │   │   ├── types/
│   │   │   │   └── chatbot.types.ts
│   │   │   ├── utils/
│   │   │   │   ├── chatHelpers.ts
│   │   │   │   ├── conversationFlows.ts
│   │   │   │   └── mockResponses.ts
│   │   │   ├── README.md
│   │   │   └── index.ts
│   │   │
│   │   └── demo-core/                # Shared demo utilities
│   │       ├── components/
│   │       │   ├── DemoContainer.tsx
│   │       │   ├── DemoHeader.tsx
│   │       │   └── DemoMetrics.tsx
│   │       ├── hooks/
│   │       │   ├── useDemoAnalytics.ts
│   │       │   └── useDemoState.ts
│   │       ├── types/
│   │       │   └── demo-core.types.ts
│   │       ├── utils/
│   │       │   ├── demoHelpers.ts
│   │       │   └── analyticsHelpers.ts
│   │       └── index.ts
│   │
│   ├── lib/                          # Utilities & configurations
│   │   ├── utils.ts                  # General utility functions
│   │   ├── validations.ts            # Zod schemas
│   │   ├── constants.ts              # App constants
│   │   ├── seo.ts                    # SEO configurations
│   │   └── analytics.ts              # Analytics helpers
│   │
│   ├── hooks/                        # Global custom hooks
│   │   ├── useWindowSize.ts
│   │   ├── useScrollPosition.ts
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   │
│   ├── store/                        # Zustand stores
│   │   ├── globalStore.ts            # Global app state
│   │   ├── uiStore.ts                # UI state (modals, etc.)
│   │   └── analyticsStore.ts         # Analytics state
│   │
│   ├── types/                        # Global TypeScript definitions
│   │   ├── global.types.ts
│   │   ├── api.types.ts
│   │   └── seo.types.ts
│   │
│   └── content/                      # Static content
│       ├── homepage.ts               # Homepage content
│       ├── solutions.ts              # Solutions content
│       ├── testimonials.ts           # Testimonials data
│       └── metadata.ts               # SEO metadata
│
├── public/                           # Static assets
│   ├── images/
│   │   ├── hero/
│   │   ├── solutions/
│   │   ├── testimonials/
│   │   └── logos/
│   ├── icons/
│   └── videos/
│
├── docs/                             # Documentation
│   ├── README.md
│   ├── CONTRIBUTING.md
│   ├── ARCHITECTURE.md
│   └── API.md
│
├── .env.local                        # Environment variables
├── .env.example                      # Environment variables template
├── next.config.js                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── package.json                      # Dependencies
└── README.md                         # Project README
```

## Documentation Requirements
Every file must include a comprehensive header comment following this template:

```typescript
/**
 * @fileoverview [Brief description of file purpose]
 * @module [Module name]
 * @version 1.0.0
 * @author AI Development Team
 * @created [Date]
 * @modified [Date]
 * 
 * @description
 * Detailed description of the component/utility/page functionality.
 * Explain the main purpose, key features, and how it fits into the overall architecture.
 * 
 * @dependencies
 * List key dependencies
 * External libraries used
 * 
 * @usage
 * Basic usage example or import statement
 * 
 * @notes
 * Important implementation details
 * Known limitations or considerations
 * Future enhancement opportunities
 */
```

## Component Development Guidelines
1. **Props Interface**: Always define TypeScript interfaces for component props
2. **Default Props**: Use default parameters for optional props
3. **Error Boundaries**: Implement error boundaries for robust error handling
4. **Accessibility**: Follow WCAG 2.1 AA guidelines
5. **Performance**: Use React.memo, useMemo, useCallback appropriately
6. **Testing**: Write unit tests for all components

## State Management Guidelines
- Use Zustand for global state management
- Keep state as minimal as possible
- Implement proper state normalization
- Use immer for immutable updates when needed

## Styling Guidelines
- Use Tailwind CSS utility classes
- Implement consistent design tokens (colors, spacing, typography)
- Follow mobile-first responsive design
- Use CSS variables for dynamic theming
- Implement dark/light mode support

## Performance Standards
- Page load time: < 3 seconds
- Lighthouse score: 90+
- Core Web Vitals: All metrics in green
- Bundle size optimization
- Image optimization and lazy loading

## Business Context
CogniDrift AI provides:
- AI Agent Development
- Virtual Receptionists
- Voice AI Solutions
- Document Intelligence
- Chatbot Platforms
- Process Automation
- Workflow Automation
- Sales Automation
- AI Training & Webinars
- Strategic AI Consultation

Target audience: Enterprise and SMB businesses looking to implement AI-powered digital workforce solutions.

## Development Workflow
1. Create feature branches for each component/module
2. Implement comprehensive TypeScript types
3. Write unit tests before implementation (TDD approach)
4. Follow atomic commits with descriptive messages
5. Perform code reviews focusing on architecture and maintainability
6. Document all public APIs and components

## AI Agent Assistance
When generating code:
- Always include comprehensive JSDoc comments
- Implement proper TypeScript interfaces
- Follow the established file structure
- Include error handling and loading states
- Implement accessibility features
- Use semantic HTML elements
- Follow the design system patterns
- Consider performance implications
- Write self-documenting code with clear variable names
