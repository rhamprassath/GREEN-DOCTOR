import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import { getHistory } from '../utils/storage';

const { width } = Dimensions.get('window');

const HomeScreen = ({ route, navigation }) => {
    // Robust fallback: Check if route.params exists, then check language, otherwise default to 'en'
    const language = route.params?.language || 'en';
    const [recentScans, setRecentScans] = useState([]);
    const [stats, setStats] = useState({ total: 0, healthy: 0, issues: 0 });

    // Safety check for translations
    const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];
    const t = translations;

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        const history = await getHistory();
        setRecentScans(history.slice(0, 5)); // Show top 5 recent

        const total = history.length;
        const healthy = history.filter(item => item.analysisResult.isHealthy).length;
        const issues = total - healthy;

        setStats({ total, healthy, issues });
    };

    const StatCard = ({ icon, number, label, color, textColor }) => (
        <View style={[styles.statCard, { backgroundColor: color }]}>
            <Text style={{ fontSize: 24, paddingBottom: 5, color: textColor || COLORS.white }}>{icon}</Text>
            <Text style={[styles.statNumber, { color: textColor || COLORS.white }]}>{number}</Text>
            <Text style={[styles.statLabel, { color: textColor || COLORS.white }]}>{label}</Text>
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
            allowsEditing: true,
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
        <React.Fragment>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <View style={styles.logoCircle}>
                                <Image
                                    source={require('../assets/logo.png')}
                                    style={styles.headerLogo}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.headerTitle}>GREEN DOCTOR</Text>
                                <Text style={styles.headerSubtitle}>{t.subtitle}</Text>
                            </View>
                        </View>
                        <View style={styles.headerActions}>
                            <TouchableOpacity
                                style={styles.headerActionButton}
                                onPress={() => navigation.navigate('Language')}
                                title={t.changeLanguage}
                            >
                                <Text style={styles.headerActionIcon}>🌐</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.headerActionButton}
                                onPress={() => navigation.navigate('About', { language })}
                                title={t.aboutApp}
                            >
                                <Text style={styles.headerActionIcon}>ℹ️</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.actionCard} onPress={takePhoto}>
                            <View style={styles.actionIconCircle}>
                                <Text style={styles.actionIcon}>📷</Text>
                            </View>
                            <Text style={styles.actionTitle}>{t.scanPlant}</Text>
                            <Text style={styles.actionSubtitle}>{t.detectDiseases}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionCard} onPress={pickImage}>
                            <View style={[styles.actionIconCircle, { backgroundColor: '#388e3c' }]}>
                                <Text style={styles.actionIcon}>🖼️</Text>
                            </View>
                            <Text style={styles.actionTitle}>{t.pickFromGallery}</Text>
                            <Text style={styles.actionSubtitle}>{t.detectDiseases}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* History Button (Moved below or as a full width card) */}
                    <TouchableOpacity
                        style={styles.historyFullCard}
                        onPress={() => navigation.navigate('History', { language })}
                    >
                        <View style={styles.historyIconSmall}>
                            <Text style={{ fontSize: 18 }}>↺</Text>
                        </View>
                        <Text style={styles.historyText}>{t.history}</Text>
                        <Text style={styles.historySubText}>{t.pastDiagnoses}</Text>
                    </TouchableOpacity>

                    {/* Government Schemes Button */}
                    <TouchableOpacity
                        style={styles.historyFullCard}
                        onPress={() => navigation.navigate('Schemes', { language })}
                    >
                        <View style={[styles.historyIconSmall, { backgroundColor: '#fff3e0' }]}>
                            <Text style={{ fontSize: 18 }}>📋</Text>
                        </View>
                        <Text style={styles.historyText}>{t.govtSchemes}</Text>
                        <Text style={styles.historySubText}>{t.viewSchemes}</Text>
                    </TouchableOpacity>

                    {/* Stats */}
                    <Text style={styles.sectionTitle}>{t.yourStats}</Text>
                    <View style={styles.statsContainer}>
                        <StatCard icon="📈" number={stats.total} label={t.totalScans} color="#00897b" />
                        <StatCard icon="🌿" number={stats.healthy} label={t.healthyPlants} color="#00c853" />
                        <StatCard icon="!" number={stats.issues} label={t.issuesDetected} color="#ff6f00" />
                    </View>

                    {/* Today's Tip */}
                    <Text style={styles.sectionTitle}>{t.todaysTip}</Text>
                    <View style={styles.tipCard}>
                        <Text style={styles.tipIcon}>📖</Text>
                        <Text style={styles.tipText}>{t.tipContent}</Text>
                    </View>

                    {/* Recent Scans */}
                    <Text style={styles.sectionTitle}>{t.recentScans}</Text>

                    {recentScans.length === 0 ? (
                        <Text style={{ color: COLORS.gray, fontStyle: 'italic', marginTop: 10 }}>{t.noHistory}</Text>
                    ) : (
                        recentScans.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.recentItem}
                                onPress={() => navigation.navigate('Result', {
                                    imageUri: item.imageUri,
                                    analysisResult: item.analysisResult,
                                    language: language
                                })}
                            >
                                <Image source={{ uri: item.imageUri }} style={styles.recentImagePlaceholder} />
                                <View style={styles.recentInfo}>
                                    <Text style={styles.recentPlant}>{item.analysisResult.crop}</Text>
                                    <Text style={[
                                        styles.recentIssue,
                                        { color: item.analysisResult.isHealthy ? COLORS.secondary : COLORS.warning }
                                    ]}>
                                        {item.analysisResult.name[language]}
                                    </Text>
                                    <Text style={styles.recentTime}>
                                        {new Date(item.timestamp).toLocaleDateString()}
                                    </Text>
                                </View>
                                <Text style={[
                                    styles.alertIcon,
                                    { color: item.analysisResult.isHealthy ? COLORS.secondary : COLORS.warning }
                                ]}>
                                    {item.analysisResult.isHealthy ? "🌿" : "!"}
                                </Text>
                            </TouchableOpacity>
                        ))
                    )}

                    <View style={{ height: 100 }} />
                </ScrollView>
            </View>
        </React.Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        padding: SIZES.padding,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: COLORS.primary,
        marginHorizontal: -SIZES.padding,
        marginTop: -SIZES.padding,
        paddingTop: SIZES.padding + 10,
        paddingBottom: 20,
        paddingHorizontal: SIZES.padding,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoCircle: {
        width: 55,
        height: 55,
        backgroundColor: COLORS.white,
        borderRadius: 27.5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    headerLogo: {
        width: '100%',
        height: '100%',
    },
    headerTextContainer: {
        marginLeft: 12,
        justifyContent: 'center',
    },
    headerActions: {
        flexDirection: 'row',
    },
    headerActionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    headerActionIcon: {
        fontSize: 20,
    },
    historyFullCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 15,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    historyIconSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#e0f2f1',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    historyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        flex: 1,
    },
    historySubText: {
        fontSize: 12,
        color: COLORS.gray,
        marginRight: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: '#e8f5e9',
        fontSize: 12,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10,
    },
    actionCard: {
        backgroundColor: COLORS.white,
        width: '48%',
        padding: 20,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    actionIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#004d40',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    actionIcon: {
        fontSize: 24,
        color: 'white',
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 5,
    },
    actionSubtitle: {
        fontSize: 11,
        color: COLORS.gray,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        color: '#00695c',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    statCard: {
        width: '31%',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: SIZES.radius,
        alignItems: 'center',
        elevation: 2,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 11,
        textAlign: 'center',
    },
    tipCard: {
        flexDirection: 'row',
        backgroundColor: '#e0f2f1',
        padding: 15,
        borderRadius: SIZES.radius,
        marginBottom: 25,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: '#00897b',
    },
    tipIcon: {
        fontSize: 24,
        marginRight: 15,
        color: '#004d40',
    },
    tipText: {
        flex: 1,
        color: '#004d40',
        fontSize: 14,
        lineHeight: 20,
    },
    recentItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: SIZES.radius,
        marginBottom: 10,
        alignItems: 'center',
        elevation: 2,
    },
    recentImagePlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#eee',
        marginRight: 15,
    },
    recentInfo: {
        flex: 1,
    },
    recentPlant: {
        fontSize: 14,
        color: COLORS.gray,
        fontWeight: 'bold',
    },
    recentIssue: {
        fontSize: 15,
        color: COLORS.text,
        fontWeight: '600',
        marginVertical: 2,
    },
    recentTime: {
        fontSize: 12,
        color: '#999',
    },
    alertIcon: {
        fontSize: 20,
        paddingRight: 10,
    }
});

export default HomeScreen;
