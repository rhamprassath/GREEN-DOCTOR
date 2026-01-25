import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import { getHistory } from '../utils/storage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ route, navigation }) => {
    const language = route.params?.language || 'en';
    const [recentScans, setRecentScans] = useState([]);
    const [stats, setStats] = useState({ total: 0, healthy: 0, issues: 0 });
    const [tipIndex, setTipIndex] = useState(0);

    const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];
    const t = translations;

    useFocusEffect(
        useCallback(() => {
            loadData();
            // Select a random tip from the pool
            if (t.dailyTips) {
                setTipIndex(Math.floor(Math.random() * t.dailyTips.length));
            }
        }, [])
    );

    const loadData = async () => {
        const history = await getHistory();
        setRecentScans(history.slice(0, 5));

        const total = history.length;
        const healthy = history.filter(item => item.analysisResult.isHealthy).length;
        const issues = total - healthy;

        setStats({ total, healthy, issues });
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return language === 'ta' ? "காலை வணக்கம்" : "Good Morning";
        if (hour < 17) return language === 'ta' ? "மதிய வணக்கம்" : "Good Afternoon";
        return language === 'ta' ? "மாலை வணக்கம்" : "Good Evening";
    };

    const StatCard = ({ icon, number, label, color }) => (
        <View style={[styles.statCard, { borderBottomColor: color }]}>
            <Text style={styles.statIcon}>{icon}</Text>
            <Text style={styles.statNumber}>{number}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            navigation.navigate('Result', { imageUri: result.assets[0].uri, language });
        }
    };

    const takePhoto = async () => {
        navigation.navigate('Scanner', { language });
    };

    return (
        <SafeAreaView style={styles.container} edges={['right', 'left', 'top']}>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

            {/* Immersive Header */}
            <View style={styles.premiumHeader}>
                <View style={styles.headerTopRow}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.greetingText}>{getGreeting()},</Text>
                        <Text style={styles.brandTitle}>GREEN DOCTOR</Text>
                    </View>
                    <View style={styles.headerActions}>
                        <TouchableOpacity
                            style={styles.headerActionButton}
                            onPress={() => navigation.navigate('Language')}
                        >
                            <Text style={[styles.headerActionIcon, { fontSize: 13, fontWeight: '900', color: COLORS.white }]}>A/அ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.headerActionButton}
                            onPress={() => navigation.navigate('About', { language })}
                        >
                            <Text style={styles.headerActionIcon}>ℹ️</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Main Hero Card */}
                <View style={styles.heroCard}>
                    <View style={styles.logoCircleLg}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.heroLogo}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.heroImpact}>
                        <Text style={styles.heroTagline}>{t.subtitle}</Text>
                        <View style={styles.activeLabelContainer}>
                            <View style={styles.pulseIndicator} />
                            <Text style={styles.pulseText}>AI SYSTEM ACTIVE</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Core Scanning Actions */}
                <View style={styles.primaryActionRow}>
                    <TouchableOpacity style={styles.primaryActionCard} onPress={takePhoto}>
                        <View style={styles.actionIconContainer}>
                            <Text style={styles.actionEmoji}>📷</Text>
                        </View>
                        <Text style={styles.actionTitleText}>{t.scanPlant}</Text>
                        <Text style={styles.actionDescText}>{t.detectDiseases}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.primaryActionCard, { backgroundColor: COLORS.secondary + '10' }]} onPress={pickImage}>
                        <View style={[styles.actionIconContainer, { backgroundColor: COLORS.secondary }]}>
                            <Text style={styles.actionEmoji}>🖼️</Text>
                        </View>
                        <Text style={styles.actionTitleText}>{t.pickFromGallery}</Text>
                        <Text style={styles.actionDescText}>{t.detectDiseases}</Text>
                    </TouchableOpacity>
                </View>

                {/* Daily Expert Tips integrated from Translations */}
                {t.dailyTips && (
                    <View style={styles.proTipCard}>
                        <View style={styles.tipHeaderBox}>
                            <Text style={styles.tipLabel}>💡 {language === 'ta' ? "நிபுணரின் குறிப்பு" : "EXPERT TIP"}</Text>
                        </View>
                        <Text style={styles.tipMainText}>{t.dailyTips[tipIndex]}</Text>
                    </View>
                )}

                {/* Secondary Hub Actions */}
                <View style={styles.listActionArea}>
                    <TouchableOpacity
                        style={styles.fullWidthItem}
                        onPress={() => navigation.navigate('History', { language })}
                    >
                        <View style={[styles.itemIconBox, { backgroundColor: '#E3F2FD' }]}>
                            <Text style={styles.itemIcon}>↺</Text>
                        </View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{t.history}</Text>
                            <Text style={styles.itemSubtitle}>{t.pastDiagnoses}</Text>
                        </View>
                        <Text style={styles.itemChevron}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.fullWidthItem}
                        onPress={() => navigation.navigate('Schemes', { language })}
                    >
                        <View style={[styles.itemIconBox, { backgroundColor: '#FFF3E0' }]}>
                            <Text style={styles.itemIcon}>📋</Text>
                        </View>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemTitle}>{t.govtSchemes}</Text>
                            <Text style={styles.itemSubtitle}>{t.viewSchemes}</Text>
                        </View>
                        <Text style={[styles.itemChevron, { color: '#FFB74D' }]}>›</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsBlock}>
                    <Text style={styles.sectionHeading}>{t.yourStats}</Text>
                    <View style={styles.statsRow}>
                        <StatCard icon="📈" number={stats.total} label={t.totalScans} color={COLORS.info} />
                        <StatCard icon="🌿" number={stats.healthy} label={t.healthyPlants} color={COLORS.success} />
                        <StatCard icon="⚠" number={stats.issues} label={t.issuesDetected} color={COLORS.warning} />
                    </View>
                </View>

                <View style={styles.recentBlock}>
                    <Text style={styles.sectionHeading}>{t.recentScans}</Text>
                    {recentScans.length === 0 ? (
                        <View style={styles.noRecentBox}>
                            <Text style={styles.noRecentText}>{t.noHistory}</Text>
                        </View>
                    ) : (
                        recentScans.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.recentPreviewCard}
                                onPress={() => navigation.navigate('Result', {
                                    imageUri: item.imageUri,
                                    analysisResult: item.analysisResult,
                                    language: language
                                })}
                            >
                                <Image source={{ uri: item.imageUri }} style={styles.previewImage} />
                                <View style={styles.previewBio}>
                                    <Text style={styles.previewCrop}>{item.analysisResult.crop}</Text>
                                    <Text style={[
                                        styles.previewDisease,
                                        { color: item.analysisResult.isHealthy ? COLORS.success : COLORS.error }
                                    ]}>
                                        {item.analysisResult.name[language]}
                                    </Text>
                                </View>
                                <View style={styles.previewAction}>
                                    <Text style={styles.previewTime}>
                                        {new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                    </Text>
                                    <Text style={styles.previewArrow}>→</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    premiumHeader: {
        backgroundColor: COLORS.primary,
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: SIZES.padding,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        ...COLORS.shadow.lg,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    headerTitleContainer: {
        flex: 1,
    },
    greetingText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    brandTitle: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: 1,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 10,
    },
    headerActionButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    headerActionIcon: {
        fontSize: 20,
    },
    heroCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 15,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    logoCircleLg: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...COLORS.shadow.md,
    },
    heroLogo: {
        width: '80%',
        height: '80%',
    },
    heroImpact: {
        marginLeft: 15,
        flex: 1,
    },
    heroTagline: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 6,
    },
    activeLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    pulseIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4ade80',
        marginRight: 6,
    },
    pulseText: {
        color: '#4ade80',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 1,
    },
    scrollContent: {
        padding: SIZES.padding,
    },
    primaryActionRow: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 20,
        marginBottom: 25,
    },
    primaryActionCard: {
        flex: 1,
        backgroundColor: COLORS.primary + '10',
        borderRadius: 25,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    actionIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        ...COLORS.shadow.md,
    },
    actionEmoji: {
        fontSize: 28,
    },
    actionTitleText: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.text,
        textAlign: 'center',
    },
    actionDescText: {
        fontSize: 11,
        color: COLORS.textLight,
        textAlign: 'center',
        marginTop: 4,
        fontWeight: '600',
    },
    proTipCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 25,
        padding: 20,
        marginBottom: 25,
        borderLeftWidth: 6,
        borderLeftColor: COLORS.secondary,
        ...COLORS.shadow.md,
    },
    tipHeaderBox: {
        marginBottom: 10,
    },
    tipLabel: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.secondary,
        letterSpacing: 1,
    },
    tipMainText: {
        fontSize: 15,
        color: COLORS.text,
        lineHeight: 22,
        fontWeight: '500',
    },
    listActionArea: {
        gap: 12,
        marginBottom: 30,
    },
    fullWidthItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...COLORS.shadow.sm,
    },
    itemIconBox: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    itemIcon: {
        fontSize: 24,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 2,
    },
    itemSubtitle: {
        fontSize: 12,
        color: COLORS.textLight,
        fontWeight: '500',
    },
    itemChevron: {
        fontSize: 28,
        color: COLORS.primary,
        opacity: 0.3,
        fontWeight: '300',
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.primaryDark,
        marginBottom: 15,
        letterSpacing: 0.5,
    },
    statsBlock: {
        marginBottom: 30,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 4,
        ...COLORS.shadow.sm,
    },
    statIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    statNumber: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.text,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: COLORS.textLight,
        textAlign: 'center',
        marginTop: 2,
    },
    recentBlock: {
        marginBottom: 20,
    },
    recentPreviewCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        padding: 12,
        borderRadius: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    previewImage: {
        width: 54,
        height: 54,
        borderRadius: 12,
        backgroundColor: COLORS.background,
    },
    previewBio: {
        flex: 1,
        marginLeft: 15,
    },
    previewCrop: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.textLight,
        textTransform: 'uppercase',
    },
    previewDisease: {
        fontSize: 16,
        fontWeight: '800',
    },
    previewAction: {
        alignItems: 'flex-end',
    },
    previewTime: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.textLight,
    },
    previewArrow: {
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: '900',
        marginTop: 2,
    },
    noRecentBox: {
        padding: 40,
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    noRecentText: {
        color: COLORS.textLight,
        fontStyle: 'italic',
        fontSize: 14,
    }
});

export default HomeScreen;
