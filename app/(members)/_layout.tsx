import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function MembersLayout() {
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light']

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                },
                tabBarActiveTintColor: colors.tint,
                tabBarInactiveTintColor: colors.textSecondary,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="sessions"
                options={{
                    title: 'Sessions',
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="meal"
                options={{
                    title: 'Meals',
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="restaurant-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="progress"
                options={{
                    title: 'Progress',
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="trending-up-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}