import { useState, useRef, useCallback, useEffect } from 'react'
import { RetellWebClient } from 'retell-client-js-sdk'

// Web calls are created by the Vercel function in frontend/api/create-web-call.js (same origin)
const CREATE_WEB_CALL_URL = '/api/create-web-call'

// Friendly message shown to visitors instead of raw technical errors
const MAINTENANCE_MESSAGE = "Down for maintenance. We're making a few quick updates to improve your experience."

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
        setError(MAINTENANCE_MESSAGE)
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
      const response = await fetch(CREATE_WEB_CALL_URL, {
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
      // v3 create-web-call returns connection details that must be passed through
      await client.startCall({
        accessToken: data.access_token,
        callId: data.call_id,
        transport: data.transport,
        iceServers: data.ice_servers,
        sampleRate: 24000,
        emitRawAudioSamples: false
      })

    } catch (err) {
      console.error('Error starting call:', err)

      // Keep the mic message (the visitor can fix that); hide everything else
      // behind the maintenance notice. The real error is still in the console.
      let errorMessage = MAINTENANCE_MESSAGE
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Microphone access denied. Please allow microphone access to make a call.'
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
