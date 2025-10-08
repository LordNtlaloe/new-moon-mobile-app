import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.error("Missing Clerk publishable key")
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  // const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    // Simple redirect logic
    if (isSignedIn) {
      console.log('User is signed in, redirecting to members');
      router.replace('/(members)');
    } else {
      console.log('User is not signed in, redirecting to auth');
      router.replace('/(auth)/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading state
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={{ color: colors.text, marginTop: 16 }}>Loading authentication...</Text>
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  if (!publishableKey) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>
          Missing Clerk publishable key.{'\n'}Check your .env file.
        </Text>
      </View>
    );
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={publishableKey}
    >
      <ClerkLoaded>
        <RootLayoutNav />
      </ClerkLoaded>
    </ClerkProvider>
  );
}