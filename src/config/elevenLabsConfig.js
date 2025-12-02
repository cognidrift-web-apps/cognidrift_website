// ElevenLabs Widget Configuration Guide
// This file is for reference only - not imported anywhere

/**
 * WIDGET CUSTOMIZATION OPTIONS
 * 
 * The widget can be customized through HTML attributes in index.html
 * or through CSS variables in index.css
 */

// HTML Attributes (add to <elevenlabs-convai> tag in index.html):
const widgetAttributes = {
  // Core Configuration
  'agent-id': 'agent_9601kbfw9fegejerg7nd5x6hqbcv', // Required
  
  // Visual Customization
  'avatar-url': 'https://yoursite.com/avatar.png',
  'avatar-orb-color-one': '#3b82f6',
  'avatar-orb-color-two': '#06b6d4',
  
  // Text Customization
  'call-to-action-text': 'Chat with our AI Agent',
  'first-message-text': 'Hello! How can I help you today?',
  
  // Runtime Configuration - Dynamic Variables
  'dynamic-variables': JSON.stringify({
    user_name: 'John Doe',
    account_type: 'premium'
  }),
  
  // Runtime Configuration - Overrides
  'override-language': 'en',
  'override-prompt': 'Custom system prompt',
  'override-first-message': 'Welcome! How can I assist you?',
  'override-voice-id': 'custom-voice-id'
}

/**
 * CLIENT TOOLS INTEGRATION
 * 
 * Client tools allow the agent to trigger actions on your website
 * Configure in: src/components/ElevenLabsWidget.jsx
 */

const clientToolsExample = {
  // Tool: Open external URL
  openExternalURL: ({ url }) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    return 'URL opened successfully'
  },
  
  // Tool: Navigate to internal page
  navigateToPage: ({ page }) => {
    window.location.href = page
    return 'Navigation initiated'
  },
  
  // Tool: Show alert/notification
  showNotification: ({ message, type }) => {
    alert(message)
    return 'Notification displayed'
  },
  
  // Tool: Send email (requires backend)
  sendEmail: async ({ to, subject, body }) => {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, body })
    })
    return response.ok ? 'Email sent' : 'Email failed'
  },
  
  // Tool: Get user data
  getUserData: () => {
    return {
      name: 'John Doe',
      email: 'john@example.com',
      accountType: 'premium'
    }
  }
}

/**
 * CSS CUSTOMIZATION
 * 
 * Customize widget appearance through CSS variables in src/index.css
 */

const cssVariables = {
  // Colors
  '--elevenlabs-widget-primary-color': '#0ea5e9',
  '--elevenlabs-widget-text-color': '#1f2937',
  '--elevenlabs-widget-secondary-text-color': '#6b7280',
  
  // Button
  '--elevenlabs-widget-button-background': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  '--elevenlabs-widget-button-hover-background': 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
  '--elevenlabs-widget-button-shadow': '0 10px 25px -5px rgba(14, 165, 233, 0.4)',
  
  // Window
  '--elevenlabs-widget-window-background': '#ffffff',
  '--elevenlabs-widget-border-radius': '16px',
  '--elevenlabs-widget-shadow': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Input
  '--elevenlabs-widget-input-background': '#f9fafb',
  '--elevenlabs-widget-input-border': '#e5e7eb',
  '--elevenlabs-widget-input-focus-border': '#0ea5e9',
  
  // Position
  '--elevenlabs-widget-bottom': '20px',
  '--elevenlabs-widget-right': '20px'
}

/**
 * EVENT LISTENERS
 * 
 * Available widget events you can listen to
 */

const widgetEvents = {
  'elevenlabs-convai:call': 'Triggered when widget initializes - set up client tools here',
  'elevenlabs-convai:connect': 'Triggered when agent connects',
  'elevenlabs-convai:disconnect': 'Triggered when agent disconnects',
  'elevenlabs-convai:message': 'Triggered when message is received',
  'elevenlabs-convai:error': 'Triggered when error occurs'
}

/**
 * SECURITY NOTES
 * 
 * - Never expose your API key in frontend code
 * - Use environment variables for sensitive data
 * - For private agents, handle authentication through backend
 * - Set up domain allowlist in ElevenLabs dashboard
 */

/**
 * USAGE EXAMPLE
 * 
 * The widget is already integrated in your app through:
 * 1. index.html - Widget embed code
 * 2. src/components/ElevenLabsWidget.jsx - React integration
 * 3. src/index.css - Custom styling
 * 4. src/App.jsx - Component integration
 */

export default {
  widgetAttributes,
  clientToolsExample,
  cssVariables,
  widgetEvents
}
