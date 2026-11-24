/**
 * Vercel Serverless Function: create a Retell web call for the homepage voice orb.
 * Keeps RETELL_API_KEY on the server; the browser only receives a short-lived access token.
 * Uses Retell's v3 endpoint (v2 was deprecated on 2026-10-18).
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const apiKey = process.env.RETELL_API_KEY
  const agentId = process.env.RETELL_AGENT_ID

  if (!apiKey || !agentId) {
    console.error('create-web-call: RETELL_API_KEY or RETELL_AGENT_ID is not set')
    return res.status(500).json({ success: false, error: 'Voice agent is not configured' })
  }

  try {
    const response = await fetch('https://api.retellai.com/v3/create-web-call', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: agentId,
        metadata: {
          source: 'website',
          initiated_from: 'web_widget',
          timestamp: new Date().toISOString()
        },
        retell_llm_dynamic_variables: {
          customer_name: 'Website Visitor'
        }
      })
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      console.error('create-web-call: Retell error', response.status, data)
      return res.status(502).json({ success: false, error: data.message || 'Failed to create web call' })
    }

    return res.status(200).json({
      success: true,
      access_token: data.access_token,
      call_id: data.call_id,
      transport: data.transport,
      ice_servers: data.ice_servers
    })
  } catch (error) {
    console.error('create-web-call: request failed', error)
    return res.status(500).json({ success: false, error: 'Failed to create web call' })
  }
}
