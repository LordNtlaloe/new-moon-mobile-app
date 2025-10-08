import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useTheme } from '../../hooks/use-color-scheme'

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()
    const theme = useTheme()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    const onSignInPress = async () => {
        if (!isLoaded) return

        setIsLoading(true)
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        } finally {
            setIsLoading(false)
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        inner: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 24,
        },
        header: {
            alignItems: 'center',
            marginBottom: 48,
        },
        logoContainer: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: theme.backgroundSecondary,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
            borderWidth: 1,
            borderColor: theme.border,
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 8,
        },
        subtitle: {
            fontSize: 16,
            color: theme.textSecondary,
        },
        form: {
            width: '100%',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.inputBackground,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            marginBottom: 16,
            paddingHorizontal: 16,
            height: 56,
        },
        inputIcon: {
            marginRight: 12,
            color: theme.textSecondary,
        },
        input: {
            flex: 1,
            fontSize: 16,
            color: theme.text,
            height: '100%',
        },
        passwordToggle: {
            padding: 4,
        },
        button: {
            backgroundColor: theme.buttonBackground,
            borderRadius: 12,
            height: 56,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 8,
            shadowColor: theme.tint,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
        },
        buttonDisabled: {
            backgroundColor: theme.border,
            shadowOpacity: 0,
            elevation: 0,
        },
        buttonText: {
            color: theme.buttonText,
            fontSize: 16,
            fontWeight: '600',
        },
        divider: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 32,
        },
        dividerLine: {
            flex: 1,
            height: 1,
            backgroundColor: theme.border,
        },
        dividerText: {
            color: theme.textSecondary,
            paddingHorizontal: 16,
            fontSize: 14,
        },
        signUpContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        signUpText: {
            color: theme.textSecondary,
            fontSize: 14,
        },
        signUpLink: {
            color: theme.tint,
            fontSize: 14,
            fontWeight: '600',
        },
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Ionicons name="lock-closed" size={40} color={theme.tint} />
                        </View>
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>Sign in to your account</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                autoComplete="email"
                                keyboardType="email-address"
                                value={emailAddress}
                                placeholder="Enter your email"
                                placeholderTextColor={theme.textSecondary}
                                onChangeText={setEmailAddress}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={password}
                                placeholder="Enter your password"
                                placeholderTextColor={theme.textSecondary}
                                secureTextEntry={!showPassword}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                style={styles.passwordToggle}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color={theme.textSecondary}
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.button,
                                (!emailAddress || !password || isLoading) && styles.buttonDisabled
                            ]}
                            onPress={onSignInPress}
                            disabled={!emailAddress || !password || isLoading}
                        >
                            {isLoading ? (
                                <Text style={styles.buttonText}>Signing In...</Text>
                            ) : (
                                <Text style={styles.buttonText}>Sign In</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>Don&apos;t have an account? </Text>
                            <Link href="/(auth)/sign-up" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.signUpLink}>Sign up</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}