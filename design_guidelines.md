# Puppy Transformation App - Design Guidelines

## Architecture Decisions

### Authentication
**No authentication required** - This is a single-user utility app with local photo processing.

**Profile/Settings Screen Required:**
- User-customizable avatar (1 preset: playful dog silhouette icon)
- Display name field (placeholder: "Dog Lover")
- App preferences:
  - Theme toggle (Light/Dark)
  - Save to gallery automatically (toggle)
  - Image quality preference (Standard/High)

### Navigation Architecture
**Stack-only navigation** with modal overlays for settings.

**Information Architecture:**
1. Main Flow (Stack):
   - Home/Upload Screen (root)
   - Processing Screen
   - Results Screen (Before/After comparison)
2. Modal Screens:
   - Settings/Profile (presented modally from home header)
   - Image Source Picker (action sheet)

## Screen Specifications

### 1. Home/Upload Screen
**Purpose:** Primary entry point for photo upload and app introduction

**Layout:**
- Header: Custom transparent header
  - Right button: Settings icon (gear)
  - No left button
  - No search bar
- Main content: Scrollable view
  - Top safe area inset: `insets.top + Spacing.xl`
  - Bottom safe area inset: `insets.bottom + Spacing.xl`
- Floating elements: Large CTA button at bottom

**Content Structure:**
- App logo/icon at top center (custom puppy paw illustration)
- Headline: "Turn Back Time" (Typography.heading1)
- Subheadline: "See what your adult dog looked like as a puppy" (Typography.body, muted color)
- Large floating action button: "Choose Photo" with camera icon
  - Position: Bottom center
  - Bottom inset: `insets.bottom + Spacing.xl`
  - Drop shadow: shadowOffset {width: 0, height: 2}, shadowOpacity: 0.10, shadowRadius: 2
- Secondary text link below: "How it works" → scrolls to explanation section

**Action Sheet Trigger:**
Tapping "Choose Photo" presents native action sheet with:
- Take Photo
- Choose from Library
- Cancel

### 2. Processing Screen
**Purpose:** Display progress while AI transforms the image

**Layout:**
- Header: Default navigation header (non-transparent)
  - Title: "Creating Magic..."
  - Left button: Cancel (dismisses to home)
  - No right button
- Main content: Non-scrollable centered view
  - Top inset: `Spacing.xl`
  - Bottom inset: `insets.bottom + Spacing.xl`

**Content Structure:**
- Uploaded dog photo thumbnail (rounded corners, centered)
- Animated loading indicator (custom paw print animation or spinner)
- Progress text: "Transforming your pup..." (Typography.body)
- Estimated time: "This usually takes 10-15 seconds" (Typography.caption, muted)

### 3. Results/Before-After Screen
**Purpose:** Display transformed puppy image with comparison tools

**Layout:**
- Header: Default navigation header (non-transparent)
  - Title: "Your Puppy"
  - Left button: Back arrow (returns to home)
  - Right button: Share icon
- Main content: Scrollable view with horizontal swipe interaction
  - Top inset: `Spacing.xl`
  - Bottom inset: `insets.bottom + Spacing.xl`

**Content Structure:**
- Toggle pills at top: "Before" / "After" (segmented control style)
- Large image display area (switches between original and transformed)
- Alternative layout option: Side-by-side comparison with divider slider
- Action buttons below image:
  - "Save to Photos" (primary button)
  - "Try Another Photo" (secondary button)
- Small disclaimer text at bottom: "AI-generated image may vary from actual puppy appearance"

### 4. Settings/Profile Screen (Modal)
**Purpose:** User preferences and app information

**Layout:**
- Header: Default modal header
  - Title: "Settings"
  - Left button: Close (X icon)
  - No right button
- Main content: Scrollable form
  - Top inset: `Spacing.xl`
  - Bottom inset: `insets.bottom + Spacing.xl`

**Content Structure:**
- Profile section:
  - Avatar picker (circular, 80px, centered)
  - Name text field below avatar
- Preferences section:
  - Theme toggle row
  - Auto-save toggle row
  - Quality preference selector
- About section:
  - Privacy Policy link
  - Terms of Service link
  - App version number

## Design System

### Color Palette
**Warm & Pet-Friendly Theme:**
- Primary: Warm amber/orange (#F59E0B) - represents playfulness
- Primary Dark: Deep amber (#D97706)
- Background Light: Soft cream (#FFFBF5)
- Background Dark: Charcoal (#1F2937)
- Surface: White (#FFFFFF) / Dark gray (#374151)
- Text Primary: Near-black (#111827) / Off-white (#F9FAFB)
- Text Secondary: Warm gray (#6B7280)
- Success: Soft green (#10B981) - for save confirmations
- Error: Coral red (#EF4444) - for processing errors

### Typography
- Heading1: 32px, Bold, tight letter spacing
- Heading2: 24px, Semibold
- Body: 16px, Regular, comfortable line height (1.5)
- Caption: 14px, Regular, muted color
- Button: 16px, Semibold

### Visual Design Principles
- **Icons:** Use Feather icons from @expo/vector-icons for all UI actions (camera, settings, share, back, close)
- **Buttons:** 
  - Primary: Filled with Primary color, white text, rounded corners (12px)
  - Secondary: Outlined with Primary color, Primary text
  - All buttons have subtle press state (opacity 0.7)
- **Images:** Rounded corners (16px) for all dog photos
- **Cards:** Minimal use, white background with subtle border (1px, warm gray)
- **Spacing:** Use consistent padding (Spacing.xl = 24px, Spacing.lg = 16px, Spacing.md = 12px)

### Critical Assets
1. **App Logo/Icon:** Custom puppy paw print illustration (warm amber color on cream background)
2. **Profile Avatar:** Playful dog silhouette icon (generated, single option, warm color scheme)
3. **Empty State Illustration:** Simple line drawing of adult dog with dotted outline of puppy (used on home screen explanation)
4. **Loading Animation:** Custom animated paw prints (or use system spinner as fallback)

### Interaction Design
- **Photo Upload:** Haptic feedback on button press
- **Image Comparison:** Smooth fade transition between before/after (300ms)
- **Save Success:** Brief toast notification "Saved to Photos!" with checkmark
- **Error States:** Alert dialog with friendly message and retry option
- **Processing:** Prevent user from leaving screen accidentally (confirm dialog on cancel)

### Accessibility
- All images have descriptive alt text ("Original dog photo", "AI-generated puppy transformation")
- Minimum touch target: 44x44px for all interactive elements
- Support Dynamic Type for all text
- High contrast mode support (ensure text meets WCAG AA standards)
- VoiceOver labels for all icons and buttons
- Loading states announced to screen readers