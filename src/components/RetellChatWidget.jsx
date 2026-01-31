import { useEffect, useState, useRef } from 'react'

function RetellChatWidget() {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const scriptRef = useRef(null)
  const hasShownPopup = useRef(false)

  const publicKey = import.meta.env.VITE_RETELL_PUBLIC_KEY
  const agentId = import.meta.env.VITE_RETELL_AGENT_ID

  // Function to clear Retell chat history from localStorage/sessionStorage
  const clearRetellChatHistory = () => {
    try {
      // Clear localStorage items related to Retell
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.includes('retell') || key.includes('Retell') || key.includes('chat') || key.includes('conversation')) {
          localStorage.removeItem(key)
        }
      })

      // Clear sessionStorage items related to Retell
      const sessionKeys = Object.keys(sessionStorage)
      sessionKeys.forEach(key => {
        if (key.includes('retell') || key.includes('Retell') || key.includes('chat') || key.includes('conversation')) {
          sessionStorage.removeItem(key)
        }
      })

      console.log('✅ Retell chat history cleared - starting fresh session')
    } catch (error) {
      console.error('Error clearing Retell chat history:', error)
    }
  }

  useEffect(() => {
    // Show welcome popup after 3 seconds (only once)
    const popupTimer = setTimeout(() => {
      if (!hasShownPopup.current && publicKey && agentId) {
        setShowPopup(true)
        hasShownPopup.current = true

        // Auto-hide popup after 8 seconds
        setTimeout(() => setShowPopup(false), 8000)
      }
    }, 3000)

    return () => clearTimeout(popupTimer)
  }, [publicKey, agentId])

  useEffect(() => {
    // Don't load if credentials are missing
    if (!publicKey || !agentId) {
      console.warn('Retell credentials missing. Please add VITE_RETELL_PUBLIC_KEY and VITE_RETELL_AGENT_ID to your .env file')
      return
    }

    // Clear Retell chat history on every page load to start fresh
    clearRetellChatHistory()

    // Check if script already exists
    if (document.getElementById('retell-widget')) {
      setIsWidgetLoaded(true)
      return
    }

    // Create and inject the Retell widget script
    const script = document.createElement('script')
    script.id = 'retell-widget'
    script.src = 'https://dashboard.retellai.com/retell-widget.js'
    script.type = 'module'

    // Required attributes
    script.setAttribute('data-public-key', publicKey)
    script.setAttribute('data-agent-id', agentId)

    // Customization attributes - matching CogniDrift brand (Blue theme)
    script.setAttribute('data-title', 'CogniDrift AI')
    script.setAttribute('data-bot-name', 'CogniDrift Assistant')
    script.setAttribute('data-color', '#3B82F6') // Primary blue matching brand
    script.setAttribute('data-popup-message', '')
    script.setAttribute('data-show-ai-popup', 'false')
    script.setAttribute('data-auto-open', 'false')

    script.onload = () => {
      setIsWidgetLoaded(true)
      // Inject custom styles for the Retell widget
      injectCustomStyles()
      // Clear any existing chat state after widget loads
      setTimeout(() => clearRetellChatHistory(), 500)
    }

    script.onerror = () => {
      console.error('Failed to load Retell widget')
    }

    document.head.appendChild(script)
    scriptRef.current = script

    return () => {
      // Cleanup on unmount
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current)
      }
      // Remove custom styles
      const customStyles = document.getElementById('retell-custom-styles')
      if (customStyles) {
        customStyles.remove()
      }
    }
  }, [publicKey, agentId])

  // Inject custom CSS to enhance Retell widget appearance
  const injectCustomStyles = () => {
    if (document.getElementById('retell-custom-styles')) return

    const style = document.createElement('style')
    style.id = 'retell-custom-styles'
    style.textContent = `
      /* Custom styling for Retell Chat Widget - CogniDrift Brand */
      :root {
        --retell-primary: #3B82F6;
        --retell-primary-hover: #2563EB;
        --retell-primary-dark: #1D4ED8;
        --retell-bg-dark: #0F172A;
        --retell-bg-light: #1E293B;
        --retell-text: #F1F5F9;
        --retell-text-muted: #94A3B8;
      }

      /* Widget button customization */
      [data-retell-widget] button,
      .retell-widget-button {
        background: linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%) !important;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.2) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        animation: retell-float 3s ease-in-out infinite !important;
      }

      [data-retell-widget] button:hover,
      .retell-widget-button:hover {
        transform: scale(1.1) !important;
        box-shadow: 0 6px 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3) !important;
      }

      /* Chat window customization */
      [data-retell-widget] .chat-window,
      .retell-chat-window {
        border-radius: 20px !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
        border: 1px solid rgba(59, 130, 246, 0.2) !important;
        backdrop-filter: blur(10px) !important;
      }

      /* Floating animation */
      @keyframes retell-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }

      /* Glow pulse animation */
      @keyframes retell-glow-pulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4); }
        50% { box-shadow: 0 4px 30px rgba(59, 130, 246, 0.6), 0 0 50px rgba(59, 130, 246, 0.3); }
      }
    `
    document.head.appendChild(style)
  }

  // Function to handle "New Chat" button click
  const handleNewChat = () => {
    clearRetellChatHistory()
    
    // Force reload the Retell widget to start fresh
    const retellWidget = document.querySelector('[data-retell-widget]')
    if (retellWidget) {
      // Trigger widget close and reset
      const closeButton = retellWidget.querySelector('[data-close-button]')
      if (closeButton) closeButton.click()
      
      // Wait a moment then clear again
      setTimeout(() => {
        clearRetellChatHistory()
        // Reload the page to ensure complete reset
        window.location.reload()
      }, 100)
    } else {
      // If widget not found, just reload
      window.location.reload()
    }
  }

  // Credentials missing - show configuration message
  if (!publicKey || !agentId) {
    return (
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <div className="group relative">
          {/* Animated glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>

          {/* Main card */}
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl shadow-2xl border border-primary-500/20 max-w-xs">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-glow">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">AI Chat Widget</p>
                <p className="text-xs text-slate-400 mt-1">Configure Retell credentials in .env to enable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* New Chat Button - Floating */}
      {isWidgetLoaded && (
        <button
          onClick={handleNewChat}
          className="fixed bottom-28 right-4 md:bottom-32 md:right-6 z-40 
                     bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700
                     text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl 
                     transition-all duration-300 flex items-center gap-2 text-sm font-semibold
                     hover:scale-105 group"
          title="Start a new conversation"
        >
          <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
      )}

      {/* Custom Welcome Popup */}
      {showPopup && (
        <div className="fixed bottom-24 right-4 md:bottom-28 md:right-6 z-50 animate-fade-in-up">
          <div className="relative max-w-xs">
            {/* Popup card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 shadow-2xl border border-primary-500/30">
              {/* Close button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0 relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
                </div>

                {/* Message */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">CogniDrift AI</p>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Hi there! Need help with AI voice agents? I'm here to answer your questions!
                  </p>
                </div>
              </div>

              {/* CTA indicator */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-xs text-slate-400">Click the chat button to start</span>
              </div>
            </div>

            {/* Arrow pointing to widget button */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-slate-800 rotate-45 border-r border-b border-primary-500/30"></div>
          </div>
        </div>
      )}

      {/* Custom animation styles */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  )
}

export default RetellChatWidget
