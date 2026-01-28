import { useState } from 'react'
import { useConversation } from '@elevenlabs/react'

function CustomAIWidget() {
  const [isOpen, setIsOpen] = useState(false)

  // Get signed URL from ElevenLabs API
  async function getSignedUrl() {
    const AGENT_ID = import.meta.env.VITE_ELEVENLABS_AGENT_ID
    const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY
    
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`,
        {
          method: 'GET',
          headers: {
            'xi-api-key': API_KEY
          }
        }
      )
      
      if (!response.ok) {
        throw new Error('Failed to get signed URL')
      }
      
      const data = await response.json()
      return data.signed_url
    } catch (error) {
      console.error('Error getting signed URL:', error)
      throw error
    }
  }

  // Use the official ElevenLabs React hook
  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to AI agent')
    },
    onDisconnect: () => {
      console.log('Disconnected from AI agent')
    },
    onMessage: (message) => {
      console.log('Message:', message)
    },
    onError: (error) => {
      console.error('Conversation error:', error)
    }
  })

  // Start conversation
  const startConversation = async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true })
      const signedUrl = await getSignedUrl()
      await conversation.startSession({ signedUrl })
    } catch (error) {
      console.error('Failed to start conversation:', error)
      alert('Microphone permission required')
    }
  }

  // Stop conversation
  const stopConversation = async () => {
    try {
      await conversation.endSession()
    } catch (error) {
      console.error('Failed to stop conversation:', error)
    }
  }

  // Handle widget open/close
  const handleToggle = async () => {
    if (!isOpen) {
      setIsOpen(true)
      await startConversation()
    } else {
      await stopConversation()
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="group relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary-600 text-white shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-110 animate-float"
        >
          <div className="absolute inset-0 rounded-full bg-primary-600 opacity-75 group-hover:opacity-100 blur-xl animate-glow"></div>
          <div className="relative flex items-center justify-center w-full h-full">
            <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-20 md:right-6 bg-slate-900 md:rounded-2xl shadow-2xl w-full h-full md:w-96 md:h-[600px] flex flex-col overflow-hidden border-0 md:border md:border-primary-500/20 animate-scale-in">
          {/* Header */}
          <div className="bg-primary-600 p-4 md:p-4 flex justify-between items-center shadow-glow">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${conversation.status === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <div>
                <h3 className="text-white font-bold text-base md:text-lg">AI Assistant</h3>
                <p className="text-white/80 text-xs">
                  {conversation.status === 'connected' 
                    ? (conversation.isSpeaking ? '🎤 Speaking...' : '👂 Listening') 
                    : '🔴 Disconnected'}
                </p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main Content - Voice Conversation */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 bg-slate-800">
            <div className="text-center space-y-4 md:space-y-6">
              {/* Animated Orb */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
                <div className={`absolute inset-0 rounded-full bg-primary-600 shadow-glow ${conversation.isSpeaking ? 'animate-pulse' : ''}`}></div>
                <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">
                  <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {conversation.isSpeaking ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    )}
                  </svg>
                </div>
              </div>

              {/* Status Text */}
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {conversation.status === 'connected' 
                    ? (conversation.isSpeaking ? 'AI is speaking...' : 'Start talking') 
                    : 'Starting conversation...'}
                </h3>
                <p className="text-slate-400 text-xs md:text-sm px-4">
                  {conversation.status === 'connected'
                    ? 'Your microphone is active. Just speak naturally.'
                    : 'Connecting to AI agent...'}
                </p>
              </div>

              {/* Connection Info */}
              {conversation.status === 'connected' && (
                <div className="mt-6 md:mt-8 p-3 md:p-4 bg-slate-700/50 rounded-xl max-w-xs mx-auto">
                  <p className="text-slate-300 text-xs md:text-sm">
                    ✓ Voice chat is active<br />
                    ✓ Real-time conversation<br />
                    ✓ Natural speech recognition
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomAIWidget
