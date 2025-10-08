import { useTheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width: screenWidth } = Dimensions.get('window')

// Mock data based on your schema
const mockProgress = {
    currentWeight: 75.5,
    startingWeight: 82.0,
    goalWeight: 70.0,
    measurements: {
        chest: 95,
        waist: 82,
        hips: 98,
        arms: 32,
    },
    progressPhotos: [
        { id: '1', date: '2024-01-15', url: '' },
        { id: '2', date: '2024-01-01', url: '' },
        { id: '3', date: '2023-12-15', url: '' },
    ],
    history: [
        { date: '2024-01-15', weight: 75.5 },
        { date: '2024-01-08', weight: 76.2 },
        { date: '2024-01-01', weight: 77.8 },
        { date: '2023-12-25', weight: 79.1 },
        { date: '2023-12-18', weight: 80.3 },
        { date: '2023-12-11', weight: 81.2 },
        { date: '2023-12-04', weight: 82.0 },
    ],
}

export default function ProgressPage() {
    const theme = useTheme()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<'weight' | 'measurements' | 'photos'>('weight')

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
        overviewCard: {
            backgroundColor: theme.backgroundSecondary,
            padding: 20,
            borderRadius: 16,
            marginBottom: 24,
        },
        overviewTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 16,
        },
        weightStats: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
        },
        weightStat: {
            alignItems: 'center',
        },
        weightValue: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.tint,
            marginBottom: 4,
        },
        weightLabel: {
            fontSize: 12,
            color: theme.textSecondary,
        },
        progressBar: {
            height: 12,
            backgroundColor: theme.border,
            borderRadius: 6,
            marginBottom: 8,
            overflow: 'hidden',
        },
        progressFill: {
            height: '100%',
            backgroundColor: theme.tint,
            borderRadius: 6,
        },
        progressText: {
            fontSize: 12,
            color: theme.textSecondary,
            textAlign: 'center',
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
        measurementCard: {
            backgroundColor: theme.backgroundSecondary,
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
        },
        measurementRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        measurementName: {
            fontSize: 16,
            color: theme.text,
            fontWeight: '500',
        },
        measurementValue: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.tint,
        },
        photosGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        photoCard: {
            width: (screenWidth - 72) / 3,
            height: 120,
            backgroundColor: theme.border,
            borderRadius: 12,
            marginBottom: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        photoDate: {
            fontSize: 12,
            color: theme.text,
            fontWeight: '500',
            marginTop: 8,
        },
        historyCard: {
            backgroundColor: theme.backgroundSecondary,
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
        },
        historyItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        historyDate: {
            fontSize: 14,
            color: theme.text,
        },
        historyWeight: {
            fontSize: 14,
            fontWeight: 'bold',
            color: theme.tint,
        },
        actionButton: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.tint,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 12,
            marginTop: 20,
            alignSelf: 'center',
        },
        actionText: {
            color: theme.buttonText,
            fontSize: 16,
            fontWeight: '600',
            marginLeft: 8,
        },
    })

    const calculateWeightProgress = () => {
        const { currentWeight, startingWeight, goalWeight } = mockProgress
        const totalChange = startingWeight - goalWeight
        const currentChange = startingWeight - currentWeight
        return Math.min((currentChange / totalChange) * 100, 100)
    }

    const weightLost = mockProgress.startingWeight - mockProgress.currentWeight
    const progressPercentage = calculateWeightProgress()

    const renderWeightTab = () => (
        <View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text, marginBottom: 16 }}>
                Weight History
            </Text>
            {mockProgress.history.map((entry, index) => (
                <View key={index} style={styles.historyCard}>
                    <View style={styles.historyItem}>
                        <Text style={styles.historyDate}>
                            {new Date(entry.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            })}
                        </Text>
                        <Text style={styles.historyWeight}>{entry.weight} kg</Text>
                    </View>
                </View>
            ))}
        </View>
    )

    const renderMeasurementsTab = () => (
        <View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text, marginBottom: 16 }}>
                Body Measurements
            </Text>
            {Object.entries(mockProgress.measurements).map(([key, value]) => (
                <View key={key} style={styles.measurementCard}>
                    <View style={styles.measurementRow}>
                        <Text style={styles.measurementName}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Text>
                        <Text style={styles.measurementValue}>{value} cm</Text>
                    </View>
                </View>
            ))}
        </View>
    )

    const renderPhotosTab = () => (
        <View>
            <Text style={{ fontSize: 16, fontWeight: '600', color: theme.text, marginBottom: 16 }}>
                Progress Photos
            </Text>
            <View style={styles.photosGrid}>
                {mockProgress.progressPhotos.map((photo) => (
                    <View key={photo.id} style={styles.photoCard}>
                        <Ionicons name="camera-outline" size={32} color={theme.textSecondary} />
                        <Text style={styles.photoDate}>
                            {new Date(photo.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            })}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    )

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'weight':
                return renderWeightTab()
            case 'measurements':
                return renderMeasurementsTab()
            case 'photos':
                return renderPhotosTab()
            default:
                return renderWeightTab()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Progress Tracking</Text>
                <Text style={styles.headerSubtitle}>Monitor your fitness journey</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.overviewCard}>
                    <Text style={styles.overviewTitle}>Weight Progress</Text>

                    <View style={styles.weightStats}>
                        <View style={styles.weightStat}>
                            <Text style={styles.weightValue}>{mockProgress.currentWeight}kg</Text>
                            <Text style={styles.weightLabel}>Current</Text>
                        </View>
                        <View style={styles.weightStat}>
                            <Text style={styles.weightValue}>{mockProgress.startingWeight}kg</Text>
                            <Text style={styles.weightLabel}>Starting</Text>
                        </View>
                        <View style={styles.weightStat}>
                            <Text style={styles.weightValue}>{mockProgress.goalWeight}kg</Text>
                            <Text style={styles.weightLabel}>Goal</Text>
                        </View>
                    </View>

                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progressPercentage}%` }
                            ]}
                        />
                    </View>

                    <Text style={styles.progressText}>
                        {weightLost.toFixed(1)}kg lost • {progressPercentage.toFixed(1)}% towards goal
                    </Text>
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'weight' && styles.activeTab]}
                        onPress={() => setActiveTab('weight')}
                    >
                        <Text style={[styles.tabText, activeTab === 'weight' && styles.activeTabText]}>
                            Weight
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'measurements' && styles.activeTab]}
                        onPress={() => setActiveTab('measurements')}
                    >
                        <Text style={[styles.tabText, activeTab === 'measurements' && styles.activeTabText]}>
                            Measurements
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'photos' && styles.activeTab]}
                        onPress={() => setActiveTab('photos')}
                    >
                        <Text style={[styles.tabText, activeTab === 'photos' && styles.activeTabText]}>
                            Photos
                        </Text>
                    </TouchableOpacity>
                </View>

                {renderActiveTab()}

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => router.push('/')}
                >
                    <Ionicons name="add-outline" size={20} color={theme.buttonText} />
                    <Text style={styles.actionText}>Add Progress Entry</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}