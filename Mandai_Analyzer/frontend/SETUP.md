# Mandi Analyzer Frontend - Build & Run Guide

## Installation

```bash
npm install
```

## Development Server

```bash
npm run dev
```

Opens at `http://localhost:3000` with hot reload enabled.

## Production Build

```bash
npm run build
```

Creates optimized build in `dist/` folder.

## Deployment

### Vercel (Recommended for React)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## Key Files

- `src/App.jsx` - Main application component
- `src/components/Dashboard.jsx` - Results display
- `src/components/PriceTrendChart.jsx` - Recharts visualization
- `index.html` - HTML entry point
- `tailwind.config.js` - Styling configuration

## Environment Variables

The app proxies API calls to `http://localhost:5000` (Flask backend).
Configured in `vite.config.js`.

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- --port 3001
```

**Backend not responding?**
- Ensure Flask is running on port 5000
- Check CORS is enabled in Flask app

**Missing dependencies?**
```bash
npm install
npm audit fix
```
