# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nope is an Expo React Native app that generates witty, tone-specific declines to requests. It uses OpenRouter API (with Grok model) for AI-generated responses and falls back to bundled example responses when offline or when the API key is missing.

## Commands

```bash
npm install          # Install dependencies
npm start            # Start Expo dev server
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
npm run web          # Run in web browser
```

## Architecture

**Entry point:** `index.ts` → `App.tsx`

**Main state lives in App.tsx:**
- `context` - user's input text describing the request to decline
- `selectedTone` / `toneUsed` - which tone style to use for generation
- `result` - the generated decline text
- Response generation happens in `generateResponse()` which calls OpenRouter API or falls back to local responses

**Component structure (`src/components/`):**
- `HeaderBar` - app title + account button
- `RequestSection` - text input for the incoming request (12 char minimum)
- `ToneGrid` - 2-column grid of tone options with haptic feedback
- `GenerateButton` - triggers generation with loading state
- `ResultModal` - bottom sheet showing result with copy/share actions
- `AccountSheet` - bottom sheet for account settings, privacy/terms links

**Data (`src/constants/`):**
- `data.ts` - `TONES` array (tone definitions with emoji, colors) and `RESPONSES` object (fallback responses per tone)
- `config.ts` - environment variables and URLs (API key accessed via `EXPO_PUBLIC_OPENROUTER_API_KEY`)

**Styles:** `src/styles/appStyles.ts` - shared layout styles; components define their own StyleSheet

## Environment Variables

Create a `.env` file (gitignored) with:
```
EXPO_PUBLIC_OPENROUTER_API_KEY=your_key_here
```
The `EXPO_PUBLIC_` prefix is required for client-side access in Expo.

## Key Patterns

- Haptic feedback via `expo-haptics` on most interactive elements
- Bottom sheets use `react-native-modal` with slide animations
- Icons from `lucide-react-native`
- Gradients via `expo-linear-gradient`
- TypeScript with strict mode enabled
