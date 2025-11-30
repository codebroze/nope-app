# Nope App

A small Expo app that generates short, witty declines in different tones. It uses OpenRouter for live responses and falls back to bundled examples when offline.

## Features
- Tone picker with emoji, haptics, and a reusable tone grid
- Account sheet shortcut from the header
- Generate button with haptic feedback and loading state
- Result modal with tone label, copy/share, and “try another” actions

## Getting Started
1) Install dependencies:
```bash
npm install
```
2) Create a `.env` file (kept out of git) for API access:
```bash
EXPO_PUBLIC_OPENROUTER_API_KEY=your_openrouter_key
```
3) Run the app:
```bash
npm start
# or
npm run ios
npm run android
npm run web
```

## Notes
- Environment variables must be prefixed with `EXPO_PUBLIC_` to be available in the client bundle (see `src/constants/config.ts`).
- `.env` is ignored by git; keep your keys there locally. Configure real secrets in your CI/deploy environment instead of checking them in. 
