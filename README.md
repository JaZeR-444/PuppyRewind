# 🐕 PuppyRewind

> Transform your adult dog photos into adorable puppy versions using AI magic ✨

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.23-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📖 Overview

**PuppyRewind** is a React Native mobile application that uses advanced AI image transformation to "rewind" your adult dog photos back to their puppy days. Simply upload a photo of your furry friend, and watch as our AI creates an adorable puppy version!

Perfect for dog lovers who want to imagine what their rescue pup looked like as a puppy, or reminisce about younger days.

### ✨ Key Features

- 📸 **Photo Upload** - Take a new photo or choose from your gallery
- 🤖 **AI-Powered Transformation** - Advanced breed detection and age transformation
- 🎨 **Before/After Comparison** - Toggle between original and puppy versions
- 📱 **Gallery View** - Browse all your saved transformations
- ⚙️ **Customizable Settings** - Adjust age, save preferences, and more
- 💾 **Auto-Save** - Automatically save results to your device
- 🌓 **Theme Support** - Light and dark mode

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JaZeR-444/PuppyRewind.git
   cd PuppyRewind
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - For iOS: Press `i` or scan the QR code with the Expo Go app
   - For Android: Press `a` or scan the QR code with the Expo Go app
   - For Web: Press `w`

## 📱 Usage

1. **Launch the app** and tap "Choose Photo"
2. **Select a photo** of your adult dog from your camera or gallery
3. **Wait for processing** - The AI will analyze and transform your photo (10-15 seconds)
4. **View results** - Toggle between before/after or view side-by-side
5. **Adjust age** - Use the slider to fine-tune the puppy age (2-6 months)
6. **Save & share** - Save to your gallery or share with friends
7. **Browse history** - Access all your transformations in the Gallery tab

## 🏗️ Architecture

### Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation (Stack Navigator)
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **AI Integration**: OpenAI API (GPT-4 Vision & DALL-E)
- **UI Components**: Custom themed components
- **Styling**: StyleSheet API with custom theme system

### Project Structure

```
PuppyRewind/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── ThemedText.tsx
│   └── ...
├── screens/            # Main application screens
│   ├── HomeScreen.tsx
│   ├── ProcessingScreen.tsx
│   ├── ResultsScreen.tsx
│   ├── GalleryScreen.tsx
│   └── SettingsScreen.tsx
├── navigation/         # Navigation configuration
│   ├── RootStackNavigator.tsx
│   └── screenOptions.ts
├── contexts/          # React Context providers
│   └── SettingsContext.tsx
├── hooks/             # Custom React hooks
│   ├── useTheme.ts
│   ├── useColorScheme.ts
│   └── ...
├── utils/             # Utility functions
│   ├── openai.ts      # AI transformation logic
│   ├── breedDetection.ts
│   └── storage.ts
├── constants/         # App constants and theme
│   └── theme.ts
└── assets/           # Images and static assets

```

## 🎨 Design Philosophy

PuppyRewind follows a clean, modern design approach with:

- **Minimalist UI** - Focus on the photos, not the interface
- **Smooth Animations** - Delightful transitions and interactions
- **Accessible** - Clear contrast ratios and readable typography
- **Responsive** - Adapts to different screen sizes and orientations
- **Themed** - Consistent color palette supporting light/dark modes

See [design_guidelines.md](design_guidelines.md) for detailed design specifications.

## 🔧 Configuration

### Theme Customization

Edit `constants/theme.ts` to customize colors, spacing, typography, and more:

```typescript
export const Colors = {
  light: {
    primary: '#007AFF',
    background: '#FFFFFF',
    // ...
  },
  dark: {
    primary: '#0A84FF',
    background: '#000000',
    // ...
  }
};
```

### Settings

Users can customize:
- **Display Name** - Personalize the app experience
- **Profile Avatar** - Choose from preset dog silhouettes
- **Theme** - Light or dark mode
- **Auto-Save** - Automatically save transformations to gallery
- **Image Quality** - Standard or high quality outputs
- **Default Age** - Preferred puppy age for transformations

## 🤖 AI Features

### Breed Detection

The app uses OpenAI's GPT-4 Vision to:
- Identify dog breed(s) in the photo
- Analyze key physical characteristics
- Determine appropriate puppy features

### Image Transformation

Using DALL-E 3, the app:
- Generates realistic puppy versions
- Maintains breed-specific characteristics
- Preserves unique markings and coat patterns
- Adjusts for different puppy ages (2-6 months)

## 📦 Scripts

```bash
npm start          # Start Expo development server
npm run dev        # Start with Replit-specific configuration
npm run android    # Run on Android device/emulator
npm run ios        # Run on iOS device/simulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## 🧪 Testing

The app includes error boundaries and fallback UI for graceful error handling. Future additions will include:
- Unit tests with Jest
- Integration tests with React Native Testing Library
- E2E tests with Detox

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:
- Follows the existing code style
- Includes proper TypeScript types
- Has been tested on both iOS and Android
- Follows the design guidelines

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for the powerful GPT-4 Vision and DALL-E APIs
- Expo team for the excellent development platform
- React Native community for the amazing ecosystem
- All dog lovers who inspired this project 🐾

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on [GitHub Issues](https://github.com/JaZeR-444/PuppyRewind/issues)
- Contact: [Your contact information]

## 🗺️ Roadmap

- [ ] Add multiple puppy age presets
- [ ] Batch processing for multiple photos
- [ ] Social sharing integration
- [ ] Puppy progression timeline
- [ ] Video transformation support
- [ ] Community gallery (optional)

---

Made with ❤️ for dog lovers everywhere