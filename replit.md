# PuppyTime - AI Dog Photo Transformation App

## Overview

PuppyTime is a React Native mobile application built with Expo that transforms photos of adult dogs into puppy versions using OpenAI's image editing API. The app allows users to upload dog photos, automatically detect the breed, and generate age-regressed puppy versions with customizable age settings (2-6 months). It features a gallery to store transformations, user preferences for image quality and auto-save functionality, and a clean, accessible interface with light/dark theme support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React Native with Expo SDK 54
- Uses Expo's managed workflow for cross-platform development (iOS, Android, Web)
- New Architecture enabled for improved performance
- React 19.1.0 with functional components and hooks

**Navigation**:
- Stack-based navigation using `@react-navigation/native-stack`
- Modal presentation for Settings and Gallery screens
- No tab navigation - linear flow with modal overlays
- Screens: Home (upload), Processing (transformation progress), Results (before/after), Settings, Gallery

**State Management**:
- Context API for global settings management (`SettingsContext`)
- Local component state with React hooks
- AsyncStorage for data persistence

**UI Components**:
- Custom themed components (`ThemedView`, `ThemedText`) for consistent styling
- Reusable layouts (`ScreenScrollView`, `ScreenKeyboardAwareScrollView`, `ScreenFlatList`)
- Animated components using `react-native-reanimated` for smooth interactions
- Gesture handling via `react-native-gesture-handler`

**Theming System**:
- Light/dark mode support with system preference detection
- Centralized theme constants in `constants/theme.ts`
- Color palettes, spacing scale, typography definitions
- Theme context via custom `useTheme` hook

**Platform-Specific Handling**:
- Web compatibility layer for keyboard-aware components
- Conditional blur effects based on platform capabilities
- Platform-specific header configurations

### Data Storage

**Local Storage**: AsyncStorage for persistent data
- User settings (display name, theme preference, auto-save toggle, image quality)
- Transformation history (original/transformed image URIs, timestamps)
- No remote database or cloud sync

**Media Storage**:
- Local image URIs managed through Expo's ImagePicker and MediaLibrary
- Optional auto-save to device photo library
- No server-side image storage

### External Dependencies

**OpenAI Integration**:
- Uses OpenAI's DALL-E image editing API (`/v1/images/edits`)
- Requires `EXPO_PUBLIC_OPENAI_API_KEY` environment variable
- Two API calls per transformation:
  1. GPT-4o-mini for breed detection via vision API
  2. DALL-E for puppy transformation with breed-specific prompts
- Image quality options: 512x512 (standard) or 1024x1024 (high)

**Expo Services**:
- `expo-image-picker`: Camera and photo library access
- `expo-media-library`: Saving images to device gallery
- `expo-haptics`: Tactile feedback
- `expo-splash-screen`: Custom splash screen
- `expo-status-bar`: Status bar styling
- `expo-blur`: Blur effects for headers (iOS)
- `expo-system-ui`: System UI customization

**UI Libraries**:
- `@expo/vector-icons` (Feather icons): Icon set
- `react-native-safe-area-context`: Safe area handling
- `react-native-keyboard-controller`: Keyboard behavior management
- `react-native-reanimated`: High-performance animations

**Key Design Decisions**:

1. **No Authentication**: Single-user utility app with local-only data
2. **Client-Side Processing**: All transformations happen via direct OpenAI API calls from the client
3. **Stateless Architecture**: No backend server - purely client-to-API communication
4. **Local-First Data**: All user data and transformation history stored on device
5. **Progressive Enhancement**: Graceful degradation when API keys are missing or breed detection fails