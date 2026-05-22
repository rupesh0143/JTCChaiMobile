# Project Summary: JTCChaiMobile

## Overview
A React Native CLI mobile application for JTC Chai (a tea e-commerce brand) with a focus on product browsing, authentication, and shopping cart functionality. The app is built with modern React Native best practices including TypeScript, Redux Toolkit, and React Navigation 7.x.

---

## App Information

| Property | Value |
|----------|-------|
| **Name** | JTCChaiMobile |
| **Package ID (Android)** | com.jtcchaimobile |
| **Bundle ID (iOS)** | Generated at build time |
| **Version** | 0.0.1 |
| **Minimum Node.js** | >= 22.11.0 |

---

## Tech Stack

### Core Framework
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.85.3 | Mobile framework |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.9.3 | Type safety |
| **Hermes** | Enabled | JavaScript engine (Android) |

### Navigation
| Library | Version | Purpose |
|---------|---------|---------|
| `@react-navigation/native` | 7.2.4 | Navigation core |
| `@react-navigation/native-stack` | 7.15.1 | Native stack navigator |
| `@react-navigation/bottom-tabs` | 7.16.1 | Tab navigator |
| `@react-navigation/drawer` | 10.2 | Drawer navigator |

### State Management
| Library | Version | Purpose |
|---------|---------|---------|
| `@reduxjs/toolkit` | 2.12.0 | Redux state management |
| `react-redux` | 9.3.0 | React bindings |
| `redux-persist` | 6.0.0 | Local storage persistence |

### UI & Animation
| Library | Version | Purpose |
|---------|---------|---------|
| `react-native-reanimated` | 4.3.1 | Smooth animations |
| `react-native-gesture-handler` | 2.31.2 | Gesture handling |
| `react-native-safe-area-context` | 5.8.0 | Safe area support |
| `react-native-screens` | 4.25.1 | Native navigation screens |
| `react-native-linear-gradient` | 2.8.3 | Gradient backgrounds |
| `react-native-vector-icons` | 10.3.0 | Icon library |
| `lottie-react-native` | 7.3.8 | Lottie animations |
| `react-native-shimmer-placeholder` | 2.0.9 | Loading skeletons |

### Forms & Validation
| Library | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | 7.76.0 | Form management |
| `@hookform/resolvers` | 5.2.2 | Form resolvers |
| `zod` | 4.4.3 | Schema validation |

### Backend & Services
| Library | Version | Purpose |
|---------|---------|---------|
| `axios` | 1.16.1 | HTTP client |
| `@sentry/react-native` | 8.12.0 | Crash reporting |
| `react-native-keychain` | 10.0.0 | Secure storage |
| `react-native-worklets` | 0.8.3 | UI thread worklets |

### Development Tools
| Library | Version | Purpose |
|---------|---------|---------|
| `reactotron-react-native` | 5.1.18 | Debugging tool |

---

## Project Structure

```
Re-JTC/
├── android/                          # Android native configuration
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml   # App permissions & declaration
│   │   │   ├── java/com/jtcchaimobile/
│   │   │   │   ├── MainActivity.kt   # Main activity entry point
│   │   │   │   └── MainApplication.kt # Application class
│   │   │   └── res/                  # Android resources
│   │   │       ├── drawable/
│   │   │       ├── layout/
│   │   │       ├── mipmap/
│   │   │       └── values/
│   │   ├── build.gradle              # App-level build config
│   │   └── debug.keystore            # Debug signing key
│   ├── build.gradle                  # Root build config
│   ├── gradle.properties             # Gradle settings (Hermes, New Arch)
│   ├── gradlew/gradlew.bat           # Android wrapper scripts
│   └── settings.gradle
│
├── ios/                              # iOS native configuration
│   ├── JTCChaiMobile.xcodeproj/      # Xcode project
│   ├── JTCChaiMobile/
│   │   ├── AppDelegate.swift         # App lifecycle
│   │   ├── Info.plist                # iOS configuration
│   │   ├── LaunchScreen.storyboard   # Splash screen
│   │   └── Images.xcassets/          # App icons & images
│   └── Podfile                       # CocoaPods dependencies
│
├── src/                              # Main source code
│   ├── api/                          # API service layer
│   │   ├── client.ts                 # Axios instance configuration
│   │   ├── authApi.ts                # Authentication endpoints
│   │   ├── productsApi.ts            # Products endpoints
│   │   └── cartApi.ts                # Cart endpoints
│   │
│   ├── assets/                       # Static assets
│   │   └── images/                   # Image files
│   │
│   ├── components/                   # Reusable UI components
│   │   └── common/
│   │       └── AnimatedInput.tsx     # Custom animated text input
│   │
│   ├── constants/                    # Application constants
│   │   ├── colors.ts                 # Color palette
│   │   ├── config.ts                 # Feature flags
│   │   ├── endpoints.ts              # API endpoints
│   │   ├── spacing.ts                # Spacing system
│   │   └── typography.ts             # Font styles
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAppDispatch.ts         # Typed Redux dispatch
│   │   ├── useAppSelector.ts         # Typed Redux selector
│   │   ├── useAuth.ts                # Auth context wrapper
│   │   ├── useDebounce.ts            # Debounce utility
│   │   ├── useNetworkStatus.ts       # Network status listener
│   │   └── useProducts.ts            # Product data hook
│   │
│   ├── navigation/                   # Navigation setup
│   │   ├── AuthNavigator.tsx         # Auth stack navigator
│   │   ├── DrawerNavigator.tsx       # Drawer wrapper
│   │   ├── MainTabNavigator.tsx      # Tab navigator
│   │   ├── RootNavigator.tsx         # Main routing logic
│   │   └── types.ts                  # Navigation type definitions
│   │
│   ├── screens/                      # Screen components
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx       # User login
│   │   │   └── SignUpScreen.tsx      # User registration
│   │   ├── home/
│   │   │   └── HomeScreen.tsx        # Dashboard home
│   │   ├── products/
│   │   │   └── ProductsScreen.tsx    # Product catalog
│   │   ├── cart/
│   │   │   └── CartScreen.tsx        # Shopping cart
│   │   └── SplashScreen.tsx          # App entry animation
│   │
│   ├── services/                     # External services
│   │   ├── authService.ts            # Auth business logic
│   │   ├── crashService.ts           # Sentry integration
│   │   └── analyticsService.ts       # Analytics tracking
│   │
│   ├── store/                        # Redux state management
│   │   ├── index.ts                  # Store configuration
│   │   ├── authSlice.ts              # Auth state reducer
│   │   ├── cartSlice.ts              # Cart state (empty)
│   │   └── productsSlice.ts          # Products state (empty)
│   │
│   ├── types/                        # TypeScript types
│   │   ├── api.types.ts              # API response types
│   │   ├── auth.types.ts             # Auth types
│   │   ├── cart.types.ts             # Cart types
│   │   ├── navigation.types.ts       # Navigation types
│   │   └── product.types.ts          # Product types
│   │
│   ├── utils/                        # Utility functions
│   │   ├── errorHandler.ts           # Error handling
│   │   ├── logger.ts                 # Logging utility
│   │   ├── sanitize.ts               # Input sanitization
│   │   ├── storage.ts                # Secure storage wrapper
│   │   └── validation.ts             # Zod validation schemas
│   │
│   └── declarations.d.ts             # TypeScript declarations
│
├── App.tsx                           # Root component
├── index.js                          # App entry point
├── app.json                          # App configuration
├── package.json                      # Dependencies & scripts
├── babel.config.js                   # Babel configuration
├── metro.config.js                   # Metro bundler config
├── __tests__/                        # Tests
│   └── App.test.tsx
├── .eslintrc.js                      # Linting rules
├── .prettierrc.js                    # Code formatting
├── jest.config.js                    # Jest configuration
└── README.md                         # Project documentation
```

---

## Navigation Architecture

```
RootNavigator (conditional based on auth state)
│
├── AuthNavigator (Stack) - When NOT authenticated
│   ├── LoginScreen
│   └── SignUpScreen
│
└── DrawerNavigator - When authenticated
    └── MainTabNavigator (Tabs)
        ├── HomeScreen
        ├── ProductsScreen
        └── CartScreen
```

### Navigation Flow

1. **SplashScreen** → App starts with animated splash
2. **RootNavigator** → Checks auth state
3. **If not authenticated** → AuthNavigator (Login/SignUp)
4. **If authenticated** → DrawerNavigator → MainTabNavigator

---

## Screens Overview

| Screen | Purpose | Key Features |
|--------|---------|--------------|
| **SplashScreen** | App entry animation | Animated gradient with steam/particle effects, 3s duration, dispatches `bootstrapAuth()` |
| **LoginScreen** | User authentication | Email/password validation with Zod, floating labels, forgot password modal, Google sign-in placeholder |
| **SignUpScreen** | User registration | Full name (split first/last), email, password + confirmation, Zod validation |
| **HomeScreen** | Dashboard home | Hero banner with tagline, "Shop Bestsellers" + "Explore Flavours" CTA buttons, value metrics |
| **ProductsScreen** | Product catalog | 2-column grid with skeleton loading, discount badges, wishlist toggle, "Add to cart" buttons |
| **CartScreen** | Shopping cart | Empty state UI (when no items), "Browse Products" CTA, drawer menu access |

---

## State Management (Redux)

### Store Configuration (`src/store/index.ts`)

```typescript
configureStore({
  reducer: {
    auth: authReducer,
  }
})
```

### Redux Slices

| Slice | State Shape | Key Actions |
|-------|-------------|-------------|
| `auth` | `isAuthenticated`, `isLoading`, `user` | `bootstrapAuth`, `loginSuccess`, `logout` |
| `cart` | Empty (placeholder) | - |
| `products` | Empty (placeholder) | - |

### Custom Redux Hooks

- `useAppDispatch()`: Typed `useDispatch` for Redux actions
- `useAppSelector()`: Typed `useSelector` for state access

---

## Services Layer

| Service | Purpose | Status |
|---------|---------|--------|
| `authService.ts` | Auth business logic | Empty stub |
| `crashService.ts` | Crash reporting setup | Empty stub |
| `analyticsService.ts` | Analytics tracking | Empty stub |
| `tokenService.ts` | Token management | Empty stub |
| `client.ts` | Axios instance | Empty stub |
| `authApi.ts` | Auth endpoints | Empty stub |
| `productsApi.ts` | Product endpoints | Empty stub |
| `cartApi.ts` | Cart endpoints | Empty stub |

---

## API Configuration

### Endpoints (`src/constants/endpoints.ts`)
Contains API base URLs and endpoint definitions (currently placeholder).

### Client Configuration (`src/api/client.ts`)
Axios instance setup with interceptors (currently placeholder).

---

## Validation Schemas (`src/utils/validation.ts`)

| Schema | Fields | Rules |
|--------|--------|-------|
| `loginSchema` | Email, Password | Email format, min 8 chars, uppercase, lowercase, number required |
| `signUpSchema` | Full name, Email, Password, ConfirmPassword | Name split into first/last, passwords must match |
| `forgotPasswordSchema` | Email | Email format only |

---

## Platform Configuration

### Android

| Setting | Value |
|---------|-------|
| **minSdkVersion** | 24 (Android 7.0) |
| **compileSdkVersion** | 36 |
| **targetSdkVersion** | 36 |
| **ndkVersion** | 27.1.12297006 |
| **kotlinVersion** | 2.1.20 |
| **Hermes** | Enabled |
| **New Architecture** | Enabled |
| **Architectures** | armeabi-v7a, arm64-v8a, x86, x86_64 |
| **Package ID** | com.jtcchaimobile |
| **Permissions** | Internet |

### iOS

| Setting | Value |
|---------|-------|
| **Minimum iOS** | From Podfile (latest supported) |
| **Orientation** | Portrait (iPad: all orientations) |
| **App Transport Security** | HTTP disabled, HTTPS enabled |
| **Local Networking** | Enabled |
| **Status Bar** | Controlled by app (not view controller) |

### CocoaPods (`ios/Podfile`)

- React Native 0.85.3 with native modules autolinking
- Uses `use_native_modules!` for automatic pod detection

---

## Color Palette (`src/constants/colors.ts`)

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary** | `#8C6D4A` | Gold/Bronze tea color |
| **Accent** | `#261F1A` | Dark brown |
| **Secondary** | `#706861` | Medium brown |
| **Background** | `#faf8f5` | Off-white page background |
| **Card** | `#FFFFFF` | White card background |
| **Success** | `#2E6B4E` | Cart green |
| **Warning** | `#9C7A53` | Teal/gold accent |
| **Error** | `#D32F2F` | Red error state |
| **Rating** | `#D4AF37` | Gold star |

---

## Build Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `start` | `react-native start` | Metro bundler server |
| `android` | `react-native run-android` | Build and run on Android |
| `ios` | `react-native run-ios` | Build and run on iOS |
| `lint` | `eslint .` | Run ESLint |
| `test` | `jest` | Run Jest tests |

---

## Implementation Status

### Completed

- Full UI navigation flow (Splash → Auth → Main App)
- Authentication screens with Zod validation
- Product catalog with 2-column grid layout
- Cart screen with empty state UI
- Home screen with hero banner and CTAs
- Animations (splash, floating labels, reanimated components)
- Redux auth state management with persist
- TypeScript type definitions
- Native configuration for Android and iOS

### Placeholder/Empty (Needs Implementation)

- All API service files (authApi, productsApi, cartApi, client)
- CartSlice and productsSlice reducers/actions
- Sentry crash reporting integration
- Analytics tracking integration
- Secure token storage service
- Product data fetching
- Backend API endpoints

---

## Key Dependencies Summary

### Runtime (18 packages)
- `react-native`, `react` - Core framework
- `@react-navigation/*` - Navigation (5 packages)
- `@reduxjs/toolkit` + `react-redux` - State management
- `axios` - HTTP client
- `react-hook-form` + `@hookform/resolvers` + `zod` - Forms
- `lottie-react-native` - Lottie animations
- `react-native-reanimated`, `react-native-gesture-handler` - Gestures/animations
- `react-native-safe-area-context`, `react-native-screens` - Platform support
- `react-native-linear-gradient`, `react-native-vector-icons` - UI enhancements
- `@sentry/react-native` - Crash reporting
- `react-native-worklets`, `react-native-keychain` - Specialized features
- `reactotron-react-native` - Debugging

### Dev Dependencies (18 packages)
- `@react-native/*` - React Native CLI and tooling
- `@babel/*` - Babel compiler and plugins
- `@types/*` - TypeScript type definitions
- `eslint`, `prettier`, `jest` - Code quality and testing

---

## Development Setup

1. **Install Node.js** >= 22.11.0
2. **Install dependencies**: `npm install`
3. **Android**: `npx react-native run-android`
4. **iOS**: `cd ios && pod install && cd .. && npx react-native run-ios`

---

## Notes

- The app is in an early/skeleton state with UI complete but API integration pending
- All service files are stubs waiting for backend API implementation
- The Redux store has auth slice implemented; cart and products slices are placeholders
- Navigation uses modern React Navigation 7.x with native-stack and drawer patterns
- The app follows a clean architecture with separation of concerns (api, services, store, screens)
