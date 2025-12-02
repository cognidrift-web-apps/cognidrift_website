# ElevenLabs Widget Integration Guide

## ✅ Widget Successfully Integrated!

Your CogniDrift website now has a fully functional ElevenLabs conversational AI widget.

---

## 🎯 What's Been Added

### 1. **Widget Embed** (`index.html`)
```html
<elevenlabs-convai agent-id="agent_9601kbfw9fegejerg7nd5x6hqbcv"></elevenlabs-convai>
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
```

### 2. **React Integration** (`src/components/ElevenLabsWidget.jsx`)
- Event listeners for widget initialization
- Client tools configuration
- Connection status monitoring

### 3. **Custom Styling** (`src/index.css`)
- Matches your brand colors (blue gradient)
- Animated pulse effect
- Responsive positioning
- Custom hover effects

### 4. **Environment Configuration** (`.env`)
- Agent ID stored securely
- Easy to update configuration

---

## 🎨 Widget Features

### Visual Features:
- ✨ **Animated Button** - Pulsing glow effect in bottom-right corner
- 🎨 **Brand Colors** - Blue to cyan gradient matching your site
- 📱 **Responsive** - Adapts to mobile and desktop
- 🌊 **Smooth Animations** - Professional hover and transition effects

### Functional Features:
- 🗣️ **Voice & Text** - Supports both conversation modes
- 🛠️ **Client Tools** - Can trigger actions on your website
- 🔄 **Real-time** - Instant communication with AI agent
- 📊 **Event Tracking** - Monitor connections and interactions

---

## 🔧 Client Tools Available

The widget can trigger these actions on your website:

1. **openExternalURL** - Opens URLs in new tab
2. **navigateToPage** - Navigate to internal pages
3. **showNotification** - Display notifications to users

### Adding More Client Tools:

Edit `src/components/ElevenLabsWidget.jsx`:

```javascript
widget.addEventListener('elevenlabs-convai:call', (event) => {
  event.detail.config.clientTools = {
    yourCustomTool: ({ param1, param2 }) => {
      // Your custom logic here
      return 'Success message'
    }
  }
})
```

**Important**: Create matching tools in ElevenLabs dashboard with same name!

---

## 🎨 Customization Options

### Change Widget Position:
Edit in `src/index.css`:
```css
elevenlabs-convai {
  --elevenlabs-widget-bottom: 20px; /* Distance from bottom */
  --elevenlabs-widget-right: 20px;  /* Distance from right */
}
```

### Change Widget Colors:
```css
elevenlabs-convai {
  --elevenlabs-widget-primary-color: #0ea5e9;
  --elevenlabs-widget-button-background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
}
```

### Change First Message:
In `index.html`:
```html
<elevenlabs-convai 
  agent-id="agent_9601kbfw9fegejerg7nd5x6hqbcv"
  override-first-message="Welcome to CogniDrift! How can I help you?">
</elevenlabs-convai>
```

---

## 📱 How Users Interact

1. **Click the floating button** in bottom-right corner
2. **Widget opens** with chat interface
3. **Talk or type** to communicate with AI agent
4. **Agent responds** with voice and/or text
5. **Close** when done - conversation is saved

---

## 🔒 Security Notes

- ✅ API key is NOT exposed in frontend (good practice)
- ✅ Agent ID is public (required for widget)
- ✅ For private agents, set up authentication in ElevenLabs dashboard
- ✅ Add your domain to allowlist in ElevenLabs settings

---

## 🧪 Testing the Widget

1. **Open your site**: http://localhost:3000
2. **Look for floating button** in bottom-right corner
3. **Click to open** widget
4. **Try voice or text** conversation
5. **Check browser console** for connection logs

---

## 📊 Widget Events

Monitor widget activity by checking browser console:
- "ElevenLabs widget is ready"
- "Widget connected"
- "Widget disconnected"

---

## 🚀 Production Deployment

Before deploying:

1. **Domain Allowlist**: Add your production domain in ElevenLabs dashboard
2. **Test on Production**: Verify widget works on live site
3. **Monitor Usage**: Check ElevenLabs dashboard for analytics

---

## 📞 Widget Locations

The widget appears on **all pages**:
- ✅ Home
- ✅ Services
- ✅ About
- ✅ Contact

---

## 🎓 Advanced Features

### Dynamic Variables
Pass user data to agent:
```html
<elevenlabs-convai 
  agent-id="your-agent-id"
  dynamic-variables='{"user_name": "John", "plan": "premium"}'>
</elevenlabs-convai>
```

### Custom Voice
Override voice in widget:
```html
<elevenlabs-convai 
  agent-id="your-agent-id"
  override-voice-id="your-custom-voice-id">
</elevenlabs-convai>
```

---

## 📚 Resources

- [ElevenLabs Docs](https://elevenlabs.io/docs/agents-platform)
- [Widget Customization](https://elevenlabs.io/docs/agents-platform/customization/widget)
- [React SDK](https://elevenlabs.io/docs/agents-platform/libraries/react)

---

## ✨ Your Website is Ready!

Visit **http://localhost:3000** to see your AI-powered website in action!

The ElevenLabs widget is fully integrated and styled to match your brand. 🎉
