import { useTheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// Mock data based on your schema
const mockSessions = {
    upcoming: [
        {
            id: '1',
            title: 'Personal Training',
            type: 'PERSONAL_TRAINING',
            startTime: '2024-01-15T10:00:00Z',
            endTime: '2024-01-15T11:00:00Z',
            duration: 60,
            trainer: 'John Smith',
            status: 'CONFIRMED',
            isOnline: true,
            meetingLink: 'https://meet.google.com/abc-def-ghi',
        },
        {
            id: '2',
            title: 'Yoga Class',
            type: 'YOGA',
            startTime: '2024-01-16T18:00:00Z',
            endTime: '2024-01-16T18:45:00Z',
            duration: 45,
            trainer: 'Sarah Johnson',
            status: 'CONFIRMED',
            isOnline: false,
        },
    ],
    past: [
        {
            id: '3',
            title: 'Strength Training',
            type: 'STRENGTH_TRAINING',
            startTime: '2024-01-10T14:00:00Z',
            endTime: '2024-01-10T15:00:00Z',
            duration: 60,
            trainer: 'Mike Davis',
            status: 'COMPLETED',
            isOnline: true,
            recordingUrl: 'https://example.com/recording/123',
        },
    ],
}

export default function SessionsPage() {
    const theme = useTheme()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            paddingTop: 60,
            paddingHorizontal: 24,
            paddingBottom: 20,
            backgroundColor: theme.backgroundSecondary,
        },
        headerTitle: {
            fontSize: 32,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 8,
        },
        headerSubtitle: {
            fontSize: 16,
            color: theme.textSecondary,
        },
        content: {
            flex: 1,
            padding: 24,
        },
        tabContainer: {
            flexDirection: 'row',
            backgroundColor: theme.backgroundSecondary,
            borderRadius: 12,
            padding: 4,
            marginBottom: 24,
        },
        tab: {
            flex: 1,
            paddingVertical: 12,
            alignItems: 'center',
            borderRadius: 8,
        },
        activeTab: {
            backgroundColor: theme.tint,
        },
        tabText: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.textSecondary,
        },
        activeTabText: {
            color: theme.buttonText,
        },
        sessionCard: {
            backgroundColor: theme.backgroundSecondary,
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
            borderLeftWidth: 4,
        },
        sessionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12,
        },
        sessionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
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
        },
        sessionDetails: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        sessionDetailText: {
            fontSize: 14,
            color: theme.textSecondary,
            marginLeft: 8,
        },
        sessionActions: {
            flexDirection: 'row',
            marginTop: 12,
        },
        actionButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.tint,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            marginRight: 12,
        },
        actionText: {
            color: theme.buttonText,
            fontSize: 14,
            fontWeight: '600',
            marginLeft: 6,
        },
        secondaryAction: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: theme.border,
        },
        secondaryActionText: {
            color: theme.text,
        },
        emptyState: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 60,
        },
        emptyStateText: {
            fontSize: 16,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 12,
        },
    })

    const getSessionColor = (type: string) => {
        const colors: { [key: string]: string } = {
            PERSONAL_TRAINING: theme.tint,
            YOGA: '#10b981',
            STRENGTH_TRAINING: '#f59e0b',
            CARDIO: '#ef4444',
            GROUP_CLASS: '#8b5cf6',
        }
        return colors[type] || theme.tint
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // const getSessionIcon = (type: string) => {
    //     const icons: { [key: string]: string } = {
    //         PERSONAL_TRAINING: 'person-outline',
    //         YOGA: 'body-outline',
    //         STRENGTH_TRAINING: 'barbell-outline',
    //         CARDIO: 'speedometer-outline',
    //         GROUP_CLASS: 'people-outline',
    //     }
    //     return icons[type] || 'fitness-outline'
    // }

    const renderSessionCard = (session: any) => (
        <View
            key={session.id}
            style={[
                styles.sessionCard,
                { borderLeftColor: getSessionColor(session.type) }
            ]}
        >
            <View style={styles.sessionHeader}>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <Text style={styles.sessionType}>
                    {session.type.replace('_', ' ')}
                </Text>
            </View>

            <View style={styles.sessionDetails}>
                <Ionicons name="time-outline" size={16} color={theme.textSecondary} />
                <Text style={styles.sessionDetailText}>
                    {formatDate(session.startTime)}
                </Text>
            </View>

            <View style={styles.sessionDetails}>
                <Ionicons name="person-outline" size={16} color={theme.textSecondary} />
                <Text style={styles.sessionDetailText}>{session.trainer}</Text>
            </View>

            <View style={styles.sessionDetails}>
                <Ionicons name="hourglass-outline" size={16} color={theme.textSecondary} />
                <Text style={styles.sessionDetailText}>{session.duration} minutes</Text>
            </View>

            <View style={styles.sessionDetails}>
                <Ionicons
                    name={session.isOnline ? "wifi-outline" : "location-outline"}
                    size={16}
                    color={theme.textSecondary}
                />
                <Text style={styles.sessionDetailText}>
                    {session.isOnline ? 'Online' : 'In-person'}
                </Text>
            </View>

            <View style={styles.sessionActions}>
                {activeTab === 'upcoming' && session.isOnline && (
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="videocam-outline" size={16} color={theme.buttonText} />
                        <Text style={styles.actionText}>Join Session</Text>
                    </TouchableOpacity>
                )}

                {activeTab === 'past' && session.recordingUrl && (
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="play-circle-outline" size={16} color={theme.buttonText} />
                        <Text style={styles.actionText}>Watch Recording</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]}>
                    <Ionicons name="information-circle-outline" size={16} color={theme.text} />
                    <Text style={[styles.actionText, styles.secondaryActionText]}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    const currentSessions = activeTab === 'upcoming' ? mockSessions.upcoming : mockSessions.past

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Sessions</Text>
                <Text style={styles.headerSubtitle}>Manage your training sessions</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
                        onPress={() => setActiveTab('upcoming')}
                    >
                        <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
                            Upcoming
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'past' && styles.activeTab]}
                        onPress={() => setActiveTab('past')}
                    >
                        <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
                            Past Sessions
                        </Text>
                    </TouchableOpacity>
                </View>

                {currentSessions.length > 0 ? (
                    <FlatList
                        data={currentSessions}
                        renderItem={({ item }) => renderSessionCard(item)}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="calendar-outline" size={64} color={theme.textSecondary} />
                        <Text style={styles.emptyStateText}>
                            {activeTab === 'upcoming'
                                ? "No upcoming sessions scheduled"
                                : "No past sessions found"
                            }
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={[styles.actionButton, { marginTop: 20 }]}
                    onPress={() => router.push('/')}
                >
                    <Ionicons name="add-outline" size={20} color={theme.buttonText} />
                    <Text style={styles.actionText}>Book New Session</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}