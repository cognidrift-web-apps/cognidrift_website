import axios from 'axios'

const AGENT_ID = import.meta.env.VITE_ELEVENLABS_AGENT_ID || 'agent_9601kbfw9fegejerg7nd5x6hqbcv'
const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY
const API_BASE_URL = 'https://api.elevenlabs.io/v1'

class ElevenLabsService {
  constructor() {
    this.conversationId = null
    this.ws = null
    this.onMessageCallback = null
    this.onErrorCallback = null
  }

  // Get signed URL for WebSocket connection
  async getSignedUrl() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`,
        {
          headers: {
            'xi-api-key': API_KEY
          }
        }
      )
      return response.data.signed_url
    } catch (error) {
      console.error('Error getting signed URL:', error.response?.data || error.message)
      throw error
    }
  }

  // Start conversation with agent
  async startConversation(onMessage, onError) {
    try {
      this.onMessageCallback = onMessage
      this.onErrorCallback = onError

      // Get signed URL for secure WebSocket connection
      const signedUrl = await this.getSignedUrl()
      console.log('Connecting to ElevenLabs...')
      
      this.ws = new WebSocket(signedUrl)
      
      this.ws.onopen = () => {
        console.log('WebSocket connection established with ElevenLabs')
        
        // Send conversation initiation data
        const initEvent = {
          type: 'conversation_initiation_client_data',
          custom_llm_extra_body: {},
          conversation_config_override: {},
          dynamic_variables: {}
        }
        this.ws.send(JSON.stringify(initEvent))
        
        if (this.onMessageCallback) {
          this.onMessageCallback({
            type: 'system',
            text: 'Connected to AI agent'
          })
        }
      }
      
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          console.log('Received from ElevenLabs:', data)
          
          // Handle different message types from ElevenLabs Conversational AI
          if (data.type === 'conversation_initiation_metadata') {
            this.conversationId = data.conversation_initiation_metadata_event?.conversation_id
            console.log('Conversation ID:', this.conversationId)
          } 
          else if (data.type === 'agent_response') {
            // Agent's text response
            if (this.onMessageCallback && data.agent_response_event?.agent_response) {
              this.onMessageCallback({
                type: 'bot',
                text: data.agent_response_event.agent_response
              })
            }
          }
          else if (data.type === 'audio') {
            // Audio chunk received
            console.log('Audio chunk received')
            // You can play audio here if needed
          }
          else if (data.type === 'interruption') {
            console.log('User interrupted')
          }
          else if (data.type === 'ping') {
            // Send pong response
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
              this.ws.send(JSON.stringify({
                type: 'pong',
                event_id: data.ping_event?.event_id
              }))
            }
          }
          else if (data.type === 'user_transcript') {
            // User's speech was transcribed
            console.log('User said:', data.user_transcription_event?.user_transcript)
          }
        } catch (error) {
          console.error('Error parsing message:', error, event.data)
        }
      }
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        if (this.onErrorCallback) {
          this.onErrorCallback('Connection error. Please try again.')
        }
      }
      
      this.ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason)
        if (this.onMessageCallback) {
          this.onMessageCallback({
            type: 'system',
            text: 'Disconnected from AI agent'
          })
        }
      }
      
      return true
    } catch (error) {
      console.error('Error starting conversation:', error)
      if (this.onErrorCallback) {
        this.onErrorCallback('Failed to connect. Please check your API key and agent ID.')
      }
      throw error
    }
  }

  // Send text message
  async sendMessage(text) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected')
      if (this.onErrorCallback) {
        this.onErrorCallback('Not connected. Please try again.')
      }
      return
    }

    try {
      const message = {
        type: 'user_message',
        text: text
      }
      
      this.ws.send(JSON.stringify(message))
      console.log('Sent message to ElevenLabs:', text)
    } catch (error) {
      console.error('Error sending message:', error)
      if (this.onErrorCallback) {
        this.onErrorCallback('Failed to send message.')
      }
      throw error
    }
  }

  // Send audio data
  async sendAudio(audioBlob) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected')
      return
    }

    try {
      const arrayBuffer = await audioBlob.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64Audio = buffer.toString('base64')
      
      const message = {
        user_audio_chunk: base64Audio
      }
      
      this.ws.send(JSON.stringify(message))
      console.log('Sent audio to ElevenLabs')
    } catch (error) {
      console.error('Error sending audio:', error)
      throw error
    }
  }

  // End conversation
  endConversation() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.conversationId = null
    this.onMessageCallback = null
    this.onErrorCallback = null
  }

  // Check if connected
  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN
  }
}

export default new ElevenLabsService()
