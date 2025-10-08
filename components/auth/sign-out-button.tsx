// components/auth/sign-out-button.tsx
import { useAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface SignOutButtonProps extends TouchableOpacityProps {
    children: React.ReactNode
}

export function SignOutButton({ children, ...props }: SignOutButtonProps) {
    const { signOut } = useAuth()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            await signOut()
            router.replace('/(auth)/sign-in')
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return (
        <TouchableOpacity onPress={handleSignOut} {...props}>
            {children}
        </TouchableOpacity>
    )
}