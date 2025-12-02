# CogniDrift - AI Agent Development Platform

A professional website for CogniDrift, showcasing AI agent development services with integrated ElevenLabs conversational AI.

## Features

- 🤖 **ElevenLabs AI Widget** - Interactive conversational AI agent
- 🎨 **Modern Design** - Clean, light theme with animated components
- 📱 **Responsive** - Works seamlessly on all devices
- ⚡ **Fast** - Built with Vite for optimal performance
- 🎭 **Animations** - Smooth transitions and eye-catching effects

## Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router DOM** - Navigation
- **React Icons** - Icon library
- **Axios** - HTTP client
- **ElevenLabs** - Conversational AI widget

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## ElevenLabs Widget

The ElevenLabs conversational AI widget is integrated into the site. It appears as a floating button in the bottom-right corner.

### Widget Features:
- Voice and text conversation
- Custom styling matching brand colors
- Client-side tools integration
- Responsive design

### Configuration

The widget is configured in:
- `index.html` - Widget embed code
- `src/components/ElevenLabsWidget.jsx` - React integration and client tools
- `src/index.css` - Custom styling

## Project Structure

```
cognidriftAgent/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ElevenLabsWidget.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Customization

### Colors
Primary colors are defined in `tailwind.config.js` and can be customized to match your brand.

### Widget Styling
Widget appearance is customized through CSS variables in `src/index.css`.

### Content
Update page content in the respective files in `src/pages/`.

## License

MIT
