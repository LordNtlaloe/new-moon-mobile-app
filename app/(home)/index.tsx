import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

export default function Index() {
    const { isSignedIn, isLoaded } = useAuth()
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light']

    if (!isLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={colors.tint} />
            </View>
        )
    }

    return <Redirect href={isSignedIn ? "/(members)" : "/(auth)/sign-in"} />
}