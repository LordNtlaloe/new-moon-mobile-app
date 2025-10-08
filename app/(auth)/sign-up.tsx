import { useSignUp } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import * as React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useTheme } from '../../hooks/use-color-scheme'

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()
    const theme = useTheme()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [code, setCode] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    const onSignUpPress = async () => {
        if (!isLoaded) return

        setIsLoading(true)
        try {
            await signUp.create({
                emailAddress,
                password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
            setPendingVerification(true)
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        } finally {
            setIsLoading(false)
        }
    }

    const onVerifyPress = async () => {
        if (!isLoaded) return

        setIsLoading(true)
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace('/')
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2))
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
        scrollContent: {
            flexGrow: 1,
        },
        inner: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 24,
            paddingVertical: 40,
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
            textAlign: 'center',
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
        passwordRequirements: {
            backgroundColor: theme.backgroundSecondary,
            padding: 16,
            borderRadius: 12,
            marginBottom: 24,
            borderLeftWidth: 4,
            borderLeftColor: theme.tint,
        },
        requirementsTitle: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 8,
        },
        requirement: {
            fontSize: 12,
            color: theme.textSecondary,
            marginBottom: 4,
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
        backButton: {
            marginTop: 16,
            padding: 12,
        },
        backButtonText: {
            color: theme.tint,
            fontSize: 14,
            fontWeight: '600',
            textAlign: 'center',
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
        signInContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        signInText: {
            color: theme.textSecondary,
            fontSize: 14,
        },
        signInLink: {
            color: theme.tint,
            fontSize: 14,
            fontWeight: '600',
        },
    })

    if (pendingVerification) {
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <Ionicons name="mail-outline" size={40} color={theme.tint} />
                            </View>
                            <Text style={styles.title}>Verify Email</Text>
                            <Text style={styles.subtitle}>Enter the code sent to your email</Text>
                        </View>

                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Ionicons name="key-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    value={code}
                                    placeholder="Enter verification code"
                                    placeholderTextColor={theme.textSecondary}
                                    onChangeText={setCode}
                                    keyboardType="number-pad"
                                    autoFocus
                                />
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    (!code || isLoading) && styles.buttonDisabled
                                ]}
                                onPress={onVerifyPress}
                                disabled={!code || isLoading}
                            >
                                {isLoading ? (
                                    <Text style={styles.buttonText}>Verifying...</Text>
                                ) : (
                                    <Text style={styles.buttonText}>Verify Email</Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => setPendingVerification(false)}
                            >
                                <Text style={styles.backButtonText}>Back to Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <Ionicons name="person-add-outline" size={40} color={theme.tint} />
                            </View>
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>Sign up to get started</Text>
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
                                    placeholder="Create a password"
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

                            <View style={styles.passwordRequirements}>
                                <Text style={styles.requirementsTitle}>Password must:</Text>
                                <Text style={styles.requirement}>• Be at least 8 characters long</Text>
                                <Text style={styles.requirement}>• Include letters and numbers</Text>
                                <Text style={styles.requirement}>• Have at least one special character</Text>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    (!emailAddress || !password || isLoading) && styles.buttonDisabled
                                ]}
                                onPress={onSignUpPress}
                                disabled={!emailAddress || !password || isLoading}
                            >
                                {isLoading ? (
                                    <Text style={styles.buttonText}>Creating Account...</Text>
                                ) : (
                                    <Text style={styles.buttonText}>Create Account</Text>
                                )}
                            </TouchableOpacity>

                            <View style={styles.divider}>
                                <View style={styles.dividerLine} />
                                <Text style={styles.dividerText}>or</Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <View style={styles.signInContainer}>
                                <Text style={styles.signInText}>Already have an account? </Text>
                                <Link href="/(auth)/sign-in" asChild>
                                    <TouchableOpacity>
                                        <Text style={styles.signInLink}>Sign in</Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}