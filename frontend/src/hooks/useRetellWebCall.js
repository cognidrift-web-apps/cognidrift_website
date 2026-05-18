import { useState, useRef, useCallback, useEffect } from 'react'
import { RetellWebClient } from 'retell-client-js-sdk'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cognidrift-send-and-receive-sms-production.up.railway.app'

export const useRetellWebCall = () => {
  const [callStatus, setCallStatus] = useState('idle') // 'idle' | 'connecting' | 'connected' | 'ended' | 'error'
  const [error, setError] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const retellClientRef = useRef(null)

  // Initialize Retell client
  const initializeClient = useCallback(() => {
    if (!retellClientRef.current) {
      retellClientRef.current = new RetellWebClient()

      // Set up event listeners
      retellClientRef.current.on('call_started', () => {
        console.log('Call started')
        setCallStatus('connected')
      })

      retellClientRef.current.on('call_ended', () => {
        console.log('Call ended')
        setCallStatus('ended')
        // Reset to idle after a short delay
        setTimeout(() => setCallStatus('idle'), 2000)
      })

      retellClientRef.current.on('agent_start_talking', () => {
        console.log('Agent started talking')
      })

      retellClientRef.current.on('agent_stop_talking', () => {
        console.log('Agent stopped talking')
      })

      retellClientRef.current.on('error', (err) => {
        console.error('Retell error:', err)
        setError(err.message || 'An error occurred during the call')
        setCallStatus('error')
        // Reset to idle after showing error
        setTimeout(() => {
          setCallStatus('idle')
          setError(null)
        }, 3000)
      })
    }
    return retellClientRef.current
  }, [])

  // Start a web call
  const startCall = useCallback(async () => {
    try {
      setCallStatus('connecting')
      setError(null)

      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true })

      // Get access token from backend
      const response = await fetch(`${API_BASE_URL}/api/create-web-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to create web call')
      }

      // Initialize client and start call
      const client = initializeClient()
      await client.startCall({
        accessToken: data.access_token,
        sampleRate: 24000,
        emitRawAudioSamples: false
      })

    } catch (err) {
      console.error('Error starting call:', err)

      let errorMessage = 'Failed to start call'
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Microphone access denied. Please allow microphone access to make a call.'
      } else if (err.message) {
        errorMessage = err.message
      }

      setError(errorMessage)
      setCallStatus('error')

      // Reset after showing error
      setTimeout(() => {
        setCallStatus('idle')
        setError(null)
      }, 4000)
    }
  }, [initializeClient])

  // End the call
  const endCall = useCallback(() => {
    if (retellClientRef.current) {
      retellClientRef.current.stopCall()
      setCallStatus('ended')
      setTimeout(() => setCallStatus('idle'), 2000)
    }
  }, [])

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (retellClientRef.current && callStatus === 'connected') {
      if (isMuted) {
        retellClientRef.current.unmute()
      } else {
        retellClientRef.current.mute()
      }
      setIsMuted(!isMuted)
    }
  }, [callStatus, isMuted])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retellClientRef.current) {
        retellClientRef.current.stopCall()
      }
    }
  }, [])

  return {
    callStatus,
    error,
    isMuted,
    startCall,
    endCall,
    toggleMute,
    isConnecting: callStatus === 'connecting',
    isConnected: callStatus === 'connected',
    isIdle: callStatus === 'idle'
  }
}

export default useRetellWebCall
