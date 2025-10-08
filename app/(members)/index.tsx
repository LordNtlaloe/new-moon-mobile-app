import { useTheme } from '@/hooks/use-color-scheme'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// Mock data based on your schema - replace with actual API calls
const mockMemberData = {
    membership: {
        type: 'PREMIUM',
        status: 'ACTIVE',
        endDate: '2024-12-31',
        includesMealTracking: true,
    },
    upcomingSessions: [
        {
            id: '1',
            title: 'Personal Training',
            type: 'PERSONAL_TRAINING',
            startTime: '2024-01-15T10:00:00Z',
            duration: 60,
            trainer: 'John Smith',
        },
        {
            id: '2',
            title: 'Yoga Class',
            type: 'YOGA',
            startTime: '2024-01-16T18:00:00Z',
            duration: 45,
            trainer: 'Sarah Johnson',
        },
    ],
    progress: {
        currentWeight: 75.5,
        startingWeight: 82.0,
        goalWeight: 70.0,
        lastMeasurement: '2024-01-10',
    },
    recentMeals: [
        {
            id: '1',
            type: 'BREAKFAST',
            description: 'Oatmeal with fruits',
            calories: 350,
            approved: true,
        },
        {
            id: '2',
            type: 'LUNCH',
            description: 'Grilled chicken salad',
            calories: 450,
            approved: null,
        },
    ],
    workoutPlan: {
        name: 'Weight Loss Program',
        exercises: 12,
        duration: 30, // days
    },
}

export default function MemberDashboard() {
    const { user } = useUser()
    const theme = useTheme()
    const router = useRouter()
    // const [activeTab, setActiveTab] = useState('overview')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [memberData, setMemberData] = useState(mockMemberData)

    // Quick stats for the dashboard
    const stats = [
        {
            label: 'Active Sessions',
            value: memberData.upcomingSessions.length.toString(),
            icon: 'calendar-outline',
            color: theme.tint
        },
        {
            label: 'Workout Plan',
            value: memberData.workoutPlan.exercises.toString(),
            icon: 'barbell-outline',
            color: '#10b981'
        },
        {
            label: 'Meals Tracked',
            value: '24',
            icon: 'restaurant-outline',
            color: '#f59e0b'
        },
        {
            label: 'Progress Photos',
            value: '8',
            icon: 'camera-outline',
            color: '#8b5cf6'
        },
    ]

    const quickActions = [
        {
            label: 'Book Session',
            icon: 'add-circle-outline',
            screen: '/(member)/book-session'
        },
        {
            label: 'Log Meal',
            icon: 'restaurant-outline',
            screen: '/(member)/log-meal'
        },
        {
            label: 'Track Progress',
            icon: 'trending-up-outline',
            screen: '/(member)/track-progress'
        },
        {
            label: 'Workout Plan',
            icon: 'barbell-outline',
            screen: '/(member)/workout-plan'
        },
    ]

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        scrollContent: {
            flexGrow: 1,
            paddingBottom: 30,
        },
        header: {
            backgroundColor: theme.backgroundSecondary,
            paddingHorizontal: 24,
            paddingTop: 60,
            paddingBottom: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
        },
        welcomeSection: {
            marginBottom: 20,
        },
        welcomeText: {
            fontSize: 14,
            color: theme.textSecondary,
            marginBottom: 4,
        },
        userName: {
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 8,
        },
        membershipBadge: {
            backgroundColor: theme.tint,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
            alignSelf: 'flex-start',
        },
        membershipText: {
            color: theme.buttonText,
            fontSize: 12,
            fontWeight: '600',
        },
        statsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 24,
        },
        statCard: {
            width: '48%',
            backgroundColor: theme.background,
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
        },
        statHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        statIcon: {
            marginRight: 8,
        },
        statValue: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 4,
        },
        statLabel: {
            fontSize: 12,
            color: theme.textSecondary,
            fontWeight: '500',
        },
        content: {
            padding: 24,
        },
        section: {
            marginBottom: 30,
        },
        sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
        },
        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
        },
        sectionLink: {
            color: theme.tint,
            fontSize: 14,
            fontWeight: '600',
        },
        quickActionsGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        actionButton: {
            width: '48%',
            backgroundColor: theme.backgroundSecondary,
            padding: 16,
            borderRadius: 16,
            alignItems: 'center',
            marginBottom: 12,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
        },
        actionIcon: {
            marginBottom: 8,
            color: theme.tint,
        },
        actionText: {
            fontSize: 12,
            color: theme.text,
            fontWeight: '500',
            textAlign: 'center',
        },
        sessionCard: {
            backgroundColor: theme.backgroundSecondary,
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
            borderLeftWidth: 4,
            borderLeftColor: theme.tint,
        },
        sessionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 8,
        },
        sessionTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.text,
            flex: 1,
        },
        sessionType: {
            fontSize: 12,
            color: theme.textSecondary,
            backgroundColor: theme.background,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            marginLeft: 8,
        },
        sessionDetails: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
        },
        sessionDetailText: {
            fontSize: 14,
            color: theme.textSecondary,
            marginLeft: 6,
        },
        progressCard: {
            backgroundColor: theme.backgroundSecondary,
            padding: 20,
            borderRadius: 16,
        },
        progressStats: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 16,
        },
        progressStat: {
            alignItems: 'center',
        },
        progressValue: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.tint,
            marginBottom: 4,
        },
        progressLabel: {
            fontSize: 12,
            color: theme.textSecondary,
        },
        progressBar: {
            height: 8,
            backgroundColor: theme.border,
            borderRadius: 4,
            marginBottom: 8,
            overflow: 'hidden',
        },
        progressFill: {
            height: '100%',
            backgroundColor: theme.tint,
            borderRadius: 4,
        },
        progressText: {
            fontSize: 12,
            color: theme.textSecondary,
            textAlign: 'center',
        },
        mealCard: {
            backgroundColor: theme.backgroundSecondary,
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
        },
        mealIcon: {
            marginRight: 12,
            color: theme.tint,
        },
        mealContent: {
            flex: 1,
        },
        mealType: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 4,
        },
        mealDescription: {
            fontSize: 12,
            color: theme.textSecondary,
            marginBottom: 4,
        },
        mealCalories: {
            fontSize: 12,
            color: theme.tint,
            fontWeight: '500',
        },
        mealStatus: {
            fontSize: 10,
            color: theme.textSecondary,
            fontStyle: 'italic',
        },
        approved: {
            color: '#10b981',
        },
        pending: {
            color: '#f59e0b',
        },
        signedOutContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24,
            backgroundColor: theme.background,
        },
        signedOutTitle: {
            fontSize: 32,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 16,
            textAlign: 'center',
        },
        signedOutSubtitle: {
            fontSize: 16,
            color: theme.textSecondary,
            marginBottom: 40,
            textAlign: 'center',
            lineHeight: 24,
        },
        authButtons: {
            width: '100%',
            gap: 16,
        },
        authButton: {
            backgroundColor: theme.buttonBackground,
            borderRadius: 16,
            padding: 20,
            alignItems: 'center',
            shadowColor: theme.tint,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
        },
        authButtonText: {
            color: theme.buttonText,
            fontSize: 16,
            fontWeight: '600',
        },
    })

    // const getSessionIcon = (type: string) => {
    //     const icons: { [key: string]: string } = {
    //         PERSONAL_TRAINING: 'person-outline',
    //         GROUP_CLASS: 'people-outline',
    //         YOGA: 'body-outline',
    //         CARDIO: 'speedometer-outline',
    //         STRENGTH_TRAINING: 'barbell-outline',
    //         NUTRITION_COACHING: 'nutrition-outline',
    //     }
    //     return icons[type] || 'fitness-outline'
    // }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const calculateWeightProgress = () => {
        const { currentWeight, startingWeight, goalWeight } = memberData.progress
        const totalChange = startingWeight - goalWeight
        const currentChange = startingWeight - currentWeight
        return Math.min((currentChange / totalChange) * 100, 100)
    }

    return (
        <View style={styles.container}>
            <SignedIn>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.welcomeSection}>
                            <Text style={styles.welcomeText}>Welcome back,</Text>
                            <Text style={styles.userName}>
                                {user?.firstName || 'Member'}
                            </Text>
                            <View style={styles.membershipBadge}>
                                <Text style={styles.membershipText}>
                                    {memberData.membership.type} MEMBER
                                </Text>
                            </View>
                        </View>

                        {/* Stats Grid */}
                        <View style={styles.statsGrid}>
                            {stats.map((stat, index) => (
                                <View key={stat.label} style={styles.statCard}>
                                    <View style={styles.statHeader}>
                                        <Ionicons
                                            name={stat.icon as any}
                                            size={16}
                                            color={stat.color}
                                            style={styles.statIcon}
                                        />
                                        <Text style={styles.statValue}>{stat.value}</Text>
                                    </View>
                                    <Text style={styles.statLabel}>{stat.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Main Content */}
                    <View style={styles.content}>
                        {/* Quick Actions */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Quick Actions</Text>
                            </View>
                            <View style={styles.quickActionsGrid}>
                                {quickActions.map((action) => (
                                    <TouchableOpacity
                                        key={action.label}
                                        style={styles.actionButton}
                                        onPress={() => router.push(action.screen as any)}
                                    >
                                        <Ionicons
                                            name={action.icon as any}
                                            size={24}
                                            style={styles.actionIcon}
                                        />
                                        <Text style={styles.actionText}>{action.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Upcoming Sessions */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
                                <TouchableOpacity onPress={() => router.push('/(member)/sessions' as any)}>
                                    <Text style={styles.sectionLink}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            {memberData.upcomingSessions.map((session) => (
                                <View key={session.id} style={styles.sessionCard}>
                                    <View style={styles.sessionHeader}>
                                        <Text style={styles.sessionTitle}>{session.title}</Text>
                                        <Text style={styles.sessionType}>
                                            {session.type.replace('_', ' ')}
                                        </Text>
                                    </View>
                                    <View style={styles.sessionDetails}>
                                        <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
                                        <Text style={styles.sessionDetailText}>
                                            {formatDate(session.startTime)}
                                        </Text>
                                    </View>
                                    <View style={styles.sessionDetails}>
                                        <Ionicons name="person-outline" size={14} color={theme.textSecondary} />
                                        <Text style={styles.sessionDetailText}>
                                            {session.trainer}
                                        </Text>
                                    </View>
                                    <View style={styles.sessionDetails}>
                                        <Ionicons name="hourglass-outline" size={14} color={theme.textSecondary} />
                                        <Text style={styles.sessionDetailText}>
                                            {session.duration} minutes
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Progress Tracking */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Your Progress</Text>
                                <TouchableOpacity onPress={() => router.push('/(member)/progress' as any)}>
                                    <Text style={styles.sectionLink}>View Details</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.progressCard}>
                                <View style={styles.progressStats}>
                                    <View style={styles.progressStat}>
                                        <Text style={styles.progressValue}>
                                            {memberData.progress.currentWeight}kg
                                        </Text>
                                        <Text style={styles.progressLabel}>Current</Text>
                                    </View>
                                    <View style={styles.progressStat}>
                                        <Text style={styles.progressValue}>
                                            {memberData.progress.startingWeight}kg
                                        </Text>
                                        <Text style={styles.progressLabel}>Starting</Text>
                                    </View>
                                    <View style={styles.progressStat}>
                                        <Text style={styles.progressValue}>
                                            {memberData.progress.goalWeight}kg
                                        </Text>
                                        <Text style={styles.progressLabel}>Goal</Text>
                                    </View>
                                </View>
                                <View style={styles.progressBar}>
                                    <View
                                        style={[
                                            styles.progressFill,
                                            { width: `${calculateWeightProgress()}%` }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.progressText}>
                                    {calculateWeightProgress().toFixed(1)}% towards your goal weight
                                </Text>
                            </View>
                        </View>

                        {/* Recent Meals */}
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Recent Meals</Text>
                                <TouchableOpacity onPress={() => router.push('/(member)/meal' as any)}>
                                    <Text style={styles.sectionLink}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            {memberData.recentMeals.map((meal) => (
                                <View key={meal.id} style={styles.mealCard}>
                                    <Ionicons
                                        name="restaurant-outline"
                                        size={20}
                                        style={styles.mealIcon}
                                    />
                                    <View style={styles.mealContent}>
                                        <Text style={styles.mealType}>
                                            {meal.type.charAt(0) + meal.type.slice(1).toLowerCase()}
                                        </Text>
                                        <Text style={styles.mealDescription}>
                                            {meal.description}
                                        </Text>
                                        <Text style={styles.mealCalories}>
                                            {meal.calories} calories
                                        </Text>
                                        {meal.approved !== null && (
                                            <Text style={[
                                                styles.mealStatus,
                                                meal.approved ? styles.approved : styles.pending
                                            ]}>
                                                {meal.approved ? 'Approved by trainer' : 'Pending review'}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SignedIn>

            <SignedOut>
                <View style={styles.signedOutContainer}>
                    <Ionicons name="fitness-outline" size={80} color={theme.tint} />
                    <Text style={styles.signedOutTitle}>Fitness Dashboard</Text>
                    <Text style={styles.signedOutSubtitle}>
                        Sign in to access your personalized fitness dashboard, track your progress, and book training sessions.
                    </Text>

                    <View style={styles.authButtons}>
                        <Link href="./(auth)/sign-in" asChild>
                            <TouchableOpacity style={styles.authButton}>
                                <Text style={styles.authButtonText}>Sign In</Text>
                            </TouchableOpacity>
                        </Link>

                        <Link href="./(auth)/sign-up" asChild>
                            <TouchableOpacity style={[styles.authButton, { backgroundColor: 'transparent', borderWidth: 2, borderColor: theme.tint }]}>
                                <Text style={[styles.authButtonText, { color: theme.tint }]}>
                                    Create Account
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </SignedOut>
        </View>
    )
}