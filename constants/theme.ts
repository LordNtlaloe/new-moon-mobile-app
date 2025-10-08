/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Primary colors - Black and Red theme
const primaryBlack = '#000000';
const primaryRed = '#dc2626'; // A strong, vibrant red

// Shades of black/gray
const blackShades = {
  50: '#fafafa',
  100: '#f4f4f5',
  200: '#e4e4e7',
  300: '#d4d4d8',
  400: '#a1a1aa',
  500: '#71717a',
  600: '#52525b',
  700: '#3f3f46',
  800: '#27272a',
  900: '#18181b',
};

// Shades of red
const redShades = {
  50: '#fef2f2',
  100: '#fee2e2',
  200: '#fecaca',
  300: '#fca5a5',
  400: '#f87171',
  500: '#ef4444',
  600: '#dc2626',
  700: '#b91c1c',
  800: '#991b1b',
  900: '#7f1d1d',
};

export const Colors = {
  light: {
    text: blackShades[900],
    textSecondary: blackShades[600],
    background: '#ffffff',
    backgroundSecondary: blackShades[50],
    tint: primaryRed,
    icon: blackShades[600],
    tabIconDefault: blackShades[400],
    tabIconSelected: primaryRed,
    border: blackShades[200],
    inputBackground: blackShades[50],
    buttonBackground: primaryRed,
    buttonText: '#ffffff',
    error: redShades[600],
    success: '#16a34a',
    warning: '#d97706',

    // Semantic colors
    primary: primaryBlack,
    secondary: primaryRed,
    card: '#ffffff',
    notification: primaryRed,
  },
  dark: {
    text: '#ffffff',
    textSecondary: blackShades[300],
    background: blackShades[900],
    backgroundSecondary: blackShades[800],
    tint: redShades[400],
    icon: blackShades[300],
    tabIconDefault: blackShades[500],
    tabIconSelected: redShades[400],
    border: blackShades[700],
    inputBackground: blackShades[800],
    buttonBackground: redShades[600],
    buttonText: '#ffffff',
    error: redShades[400],
    success: '#22c55e',
    warning: '#f59e0b',

    // Semantic colors
    primary: '#ffffff',
    secondary: redShades[400],
    card: blackShades[800],
    notification: redShades[400],
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});