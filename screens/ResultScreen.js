import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import { saveScan } from '../utils/storage';
import { analyzeImage } from '../services/aiService';

const ResultScreen = ({ route, navigation }) => {
    // We expect imageUri and language from HomeScreen
    const { imageUri, language, analysisResult: initialResult } = route.params || {};

    const [loading, setLoading] = useState(!initialResult);
    const [analysisResult, setAnalysisResult] = useState(initialResult || null);
    const [activeTab, setActiveTab] = useState('organic');

    const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];

    useEffect(() => {
        if (!initialResult && imageUri) {
            performAnalysis();
        }
    }, [imageUri, initialResult]);

    const performAnalysis = async () => {
        try {
            const result = await analyzeImage(imageUri);
            setAnalysisResult(result);

            // Save to history
            const scanData = {
                id: Date.now().toString(),
                timestamp: Date.now(),
                imageUri: imageUri,
                analysisResult: result
            };
            saveScan(scanData);

        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>{translations.analyzing || "Analyzing..."}</Text>
            </View>
        );
    }

    if (!analysisResult) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={{ color: COLORS.error, fontSize: 18 }}>{translations.error || "Detection Failed"}</Text>
                    <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.homeButtonText}>{translations.backHome}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const { crop, name, isHealthy, severity, symptoms, cause, remedy, remedy_organic, remedy_chemical, prevention, confidence } = analysisResult;

    const getSeverityColor = (sev) => {
        if (!sev) return COLORS.gray;
        switch (sev.toLowerCase()) {
            case 'low': return COLORS.secondary; // Green-ish/Yellow
            case 'medium': return 'orange';
            case 'high': return COLORS.error;
            default: return COLORS.gray;
        }
    };

    const renderHeader = () => (
        <View style={[styles.header, { backgroundColor: isHealthy ? COLORS.secondary : COLORS.error }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <View style={styles.logoCircleSmall}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.headerLogoSmall}
                    resizeMode="cover"
                />
            </View>
            <Text style={[styles.headerTitle, { marginLeft: 10 }]}>{translations.results}</Text>
        </View>
    );

    const renderTab = (key, label) => (
        <TouchableOpacity
            style={[styles.tab, activeTab === key && styles.activeTab]}
            onPress={() => setActiveTab(key)}
        >
            <Text style={[styles.tabText, activeTab === key && styles.activeTabText]}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {renderHeader()}

            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: imageUri }} style={styles.scannedImage} />

                <View style={styles.resultContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.diseaseName}>{name[language]}</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <View style={styles.confidenceBadge}>
                                <Text style={styles.confidenceText}>{confidence}%</Text>
                            </View>
                            {analysisResult.isMock && (
                                <Text style={{ fontSize: 10, color: COLORS.gray, marginTop: 2 }}>
                                    Offline Mode
                                </Text>
                            )}
                        </View>
                    </View>

                    {!isHealthy && (
                        <View style={styles.metaContainer}>
                            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(severity) }]}>
                                <Text style={styles.severityText}>{translations.severity}: {severity}</Text>
                            </View>
                            <Text style={styles.cropText}>{translations.detected}: {crop}</Text>
                        </View>
                    )}

                    <Text style={styles.sectionTitle}>
                        {analysisResult.id === 'UNKNOWN' ? translations.unknownStatus : translations.symptoms}
                    </Text>
                    <Text style={styles.description}>{symptoms[language]}</Text>

                    {!isHealthy && cause && (
                        <>
                            <Text style={styles.sectionTitle}>{translations.cause}</Text>
                            <Text style={styles.description}>{cause[language]}</Text>

                            <View style={styles.tabContainer}>
                                {renderTab('organic', analysisResult.id === 'UNKNOWN' ? translations.unknownInstruction : translations.organic)}
                                {renderTab('chemical', analysisResult.id === 'UNKNOWN' ? translations.unknownAdvice : translations.chemical)}
                                {renderTab('prevention', analysisResult.id === 'UNKNOWN' ? translations.unknownNextSteps : translations.prevention)}
                            </View>

                            <View style={styles.remedyBox}>
                                {activeTab === 'organic' && <Text style={styles.remedyText}>{remedy_organic[language]}</Text>}
                                {activeTab === 'chemical' && <Text style={styles.remedyText}>{remedy_chemical[language]}</Text>}
                                {activeTab === 'prevention' && <Text style={styles.remedyText}>{prevention[language]}</Text>}
                            </View>
                        </>
                    )}

                    {isHealthy && remedy && (
                        <>
                            <Text style={styles.sectionTitle}>{translations.remedy}</Text>
                            <Text style={styles.description}>{remedy[language]}</Text>
                        </>
                    )}

                    {analysisResult.diagnosticChecklist && (
                        <View style={styles.checklistContainer}>
                            <Text style={styles.checklistTitle}>
                                {analysisResult.diagnosticChecklist.title[language]}
                            </Text>
                            {analysisResult.diagnosticChecklist.steps.map((step, index) => (
                                <View key={index} style={styles.checkItem}>
                                    <View style={styles.bullet} />
                                    <Text style={styles.checkText}>{step[language]}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                </View>
                <View style={{ height: 30 }} />
            </ScrollView>

            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.homeButtonText}>{translations.backHome}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backButton: {
        marginRight: 15,
    },
    backButtonText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    logoCircleSmall: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerLogoSmall: {
        width: '100%',
        height: '100%',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    scannedImage: {
        width: '90%',
        height: 250,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    resultContainer: {
        paddingHorizontal: 20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    diseaseName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        flex: 1,
    },
    confidenceBadge: {
        backgroundColor: COLORS.primary + '20', // 20% opacity
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    confidenceText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    severityBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 10,
    },
    severityText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    cropText: {
        fontSize: 14,
        color: COLORS.gray,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginTop: 15,
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: COLORS.text,
        lineHeight: 24,
    },
    tabContainer: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    tabText: {
        color: COLORS.gray,
        fontWeight: '600',
    },
    activeTabText: {
        color: COLORS.primary,
    },
    remedyBox: {
        marginTop: 15,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    remedyText: {
        fontSize: 16,
        color: COLORS.text,
        lineHeight: 24,
    },
    homeButton: {
        backgroundColor: COLORS.primary,
        margin: 20,
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    homeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    checklistContainer: {
        marginTop: 25,
        padding: 20,
        backgroundColor: COLORS.primary + '10', // 10% opacity
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.primary + '30',
        marginBottom: 10,
    },
    checklistTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 15,
    },
    checkItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        marginTop: 8,
        marginRight: 12,
    },
    checkText: {
        fontSize: 15,
        color: COLORS.text,
        lineHeight: 22,
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        color: COLORS.primary,
        fontWeight: 'bold'
    }
});

export default ResultScreen;
