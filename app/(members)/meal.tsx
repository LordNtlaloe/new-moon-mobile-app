import { useTheme } from '@/hooks/use-color-scheme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

// Mock data based on your schema
const mockMeals = [
    {
        id: '1',
        type: 'BREAKFAST',
        description: 'Oatmeal with berries and almonds',
        calories: 350,
        protein: 12,
        carbs: 45,
        fats: 8,
        imageUrl: '',
        approved: true,
        trainerFeedback: 'Great balanced breakfast!',
        createdAt: '2024-01-15T08:00:00Z',
    },
    {
        id: '2',
        type: 'LUNCH',
        description: 'Grilled chicken salad with avocado',
        calories: 450,
        protein: 35,
        carbs: 20,
        fats: 25,
        imageUrl: '',
        approved: null,
        trainerFeedback: null,
        createdAt: '2024-01-15T13:00:00Z',
    },
    {
        id: '3',
        type: 'DINNER',
        description: 'Salmon with quinoa and roasted vegetables',
        calories: 520,
        protein: 40,
        carbs: 35,
        fats: 22,
        imageUrl: '',
        approved: false,
        trainerFeedback: 'Consider reducing portion size',
        createdAt: '2024-01-14T19:00:00Z',
    },
]

export default function MealsPage() {
    const theme = useTheme()
    const router = useRouter()
    // const [selectedDate, setSelectedDate] = useState(new Date())

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
        statsCard: {
            backgroundColor: theme.backgroundSecondary,
            padding: 20,
            borderRadius: 16,
            marginBottom: 24,
        },
        statsTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 16,
        },
        statsGrid: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        statItem: {
            alignItems: 'center',
        },
        statValue: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.tint,
            marginBottom: 4,
        },
        statLabel: {
            fontSize: 12,
            color: theme.textSecondary,
        },
        mealCard: {
            backgroundColor: theme.backgroundSecondary,
            padding: 16,
            borderRadius: 16,
            marginBottom: 12,
        },
        mealHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        mealType: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.text,
        },
        mealTime: {
            fontSize: 12,
            color: theme.textSecondary,
        },
        mealDescription: {
            fontSize: 14,
            color: theme.text,
            marginBottom: 8,
        },
        nutritionInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        nutritionItem: {
            alignItems: 'center',
        },
        nutritionValue: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.text,
        },
        nutritionLabel: {
            fontSize: 10,
            color: theme.textSecondary,
        },
        mealStatus: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
        },
        statusApproved: {
            color: '#10b981',
        },
        statusPending: {
            color: '#f59e0b',
        },
        statusRejected: {
            color: '#ef4444',
        },
        feedbackText: {
            fontSize: 12,
            fontStyle: 'italic',
            marginLeft: 6,
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

    const getMealIcon = (type: string) => {
        const icons: { [key: string]: string } = {
            BREAKFAST: 'sunny-outline',
            LUNCH: 'restaurant-outline',
            DINNER: 'moon-outline',
            SNACK: 'cafe-outline',
            PRE_WORKOUT: 'barbell-outline',
            POST_WORKOUT: 'refresh-outline',
        }
        return icons[type] || 'restaurant-outline'
    }

    const getStatusIcon = (approved: boolean | null) => {
        if (approved === true) return { icon: 'checkmark-circle', color: '#10b981' }
        if (approved === false) return { icon: 'close-circle', color: '#ef4444' }
        return { icon: 'time-outline', color: '#f59e0b' }
    }

    const getStatusText = (approved: boolean | null) => {
        if (approved === true) return 'Approved'
        if (approved === false) return 'Needs Adjustment'
        return 'Pending Review'
    }

    const calculateDailyTotals = () => {
        return mockMeals.reduce((totals, meal) => ({
            calories: totals.calories + (meal.calories || 0),
            protein: totals.protein + (meal.protein || 0),
            carbs: totals.carbs + (meal.carbs || 0),
            fats: totals.fats + (meal.fats || 0),
        }), { calories: 0, protein: 0, carbs: 0, fats: 0 })
    }

    const dailyTotals = calculateDailyTotals()

    const renderMealCard = (meal: any) => {
        const status = getStatusIcon(meal.approved)

        return (
            <View key={meal.id} style={styles.mealCard}>
                <View style={styles.mealHeader}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons
                            name={getMealIcon(meal.type) as any}
                            size={20}
                            color={theme.tint}
                            style={{ marginRight: 8 }}
                        />
                        <Text style={styles.mealType}>
                            {meal.type.charAt(0) + meal.type.slice(1).toLowerCase()}
                        </Text>
                    </View>
                    <Text style={styles.mealTime}>
                        {new Date(meal.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>
                </View>

                <Text style={styles.mealDescription}>{meal.description}</Text>

                <View style={styles.nutritionInfo}>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{meal.calories}</Text>
                        <Text style={styles.nutritionLabel}>CAL</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{meal.protein}g</Text>
                        <Text style={styles.nutritionLabel}>PROTEIN</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{meal.carbs}g</Text>
                        <Text style={styles.nutritionLabel}>CARBS</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionValue}>{meal.fats}g</Text>
                        <Text style={styles.nutritionLabel}>FATS</Text>
                    </View>
                </View>

                <View style={styles.mealStatus}>
                    <Ionicons name={status.icon as any} size={16} color={status.color} />
                    <Text style={[styles.feedbackText, { color: status.color }]}>
                        {getStatusText(meal.approved)}
                    </Text>
                </View>

                {meal.trainerFeedback && (
                    <Text style={[styles.feedbackText, { color: theme.textSecondary, marginTop: 4 }]}>
                        &quot;{meal.trainerFeedback}&quot;
                    </Text>
                )}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meal Tracking</Text>
                <Text style={styles.headerSubtitle}>Track your nutrition and get feedback</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.statsCard}>
                    <Text style={styles.statsTitle}>Today&apos;s Nutrition</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{dailyTotals.calories}</Text>
                            <Text style={styles.statLabel}>CALORIES</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{dailyTotals.protein}g</Text>
                            <Text style={styles.statLabel}>PROTEIN</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{dailyTotals.carbs}g</Text>
                            <Text style={styles.statLabel}>CARBS</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{dailyTotals.fats}g</Text>
                            <Text style={styles.statLabel}>FATS</Text>
                        </View>
                    </View>
                </View>

                <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 16 }}>
                    Today&apos;s Meals
                </Text>

                {mockMeals.length > 0 ? (
                    <FlatList
                        data={mockMeals}
                        renderItem={({ item }) => renderMealCard(item)}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="restaurant-outline" size={64} color={theme.textSecondary} />
                        <Text style={styles.emptyStateText}>
                            No meals logged today
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => router.push('/')}
                >
                    <Ionicons name="add-outline" size={20} color={theme.buttonText} />
                    <Text style={styles.actionText}>Log New Meal</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}