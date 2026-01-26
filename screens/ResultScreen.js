import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import { saveScan } from '../utils/storage';
import { analyzeImage } from '../services/aiService';
import { speakDiagnosis, stopSpeech } from '../services/voiceService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ResultScreen = ({ route, navigation }) => {
    // We expect imageUri and language from HomeScreen
    const { imageUri, language, analysisResult: initialResult, isHistory } = route.params || {};

    const [loading, setLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(initialResult || null);
    const [confirmed, setConfirmed] = useState(!!initialResult);
    const [activeTab, setActiveTab] = useState('organic');

    const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];

    const renderHeader = (isHealthyResult = null) => {
        const headerBg = isHealthyResult === null
            ? COLORS.primary
            : (isHealthyResult ? COLORS.success : COLORS.error);

        return (
            <View style={[styles.header, { backgroundColor: headerBg }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>←</Text>
                </TouchableOpacity>
                <View style={styles.headerTitleUnit}>
                    <Text style={styles.headerLabel}>{translations.results}</Text>
                    {isHealthyResult !== null && (
                        <Text style={styles.headerStatusSub}>
                            {isHealthyResult ? "PLANT IS HEALTHY" : "ISSUE DETECTED"}
                        </Text>
                    )}
                </View>
                <View style={styles.logoCircleHeader}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logoImgSmall}
                        resizeMode="contain"
                    />
                </View>
            </View>
        );
    };

    const renderTab = (key, label) => (
        <TouchableOpacity
            style={[styles.tabItem, activeTab === key && styles.activeTabItem]}
            onPress={() => setActiveTab(key)}
            activeOpacity={0.7}
        >
            <Text style={[styles.tabLabelText, activeTab === key && styles.activeTabLabelText]}>{label}</Text>
        </TouchableOpacity>
    );

    const handleAutoSave = async (result) => {
        if (!result || isHistory) return;
        const scanData = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            imageUri: imageUri,
            analysisResult: result
        };
        await saveScan(scanData);
    };

    useEffect(() => {
        if (!initialResult && imageUri && confirmed) {
            performAnalysis();
        }

        // If it's a fresh scan from camera, save it
        if (initialResult && !isHistory) {
            handleAutoSave(initialResult);
        }

        return () => stopSpeech();
    }, [imageUri, initialResult, confirmed]);

    const handleSpeak = () => {
        if (analysisResult) {
            const currentSymptoms = symptoms[language];
            const currentRemedy = activeTab === 'organic' ? remedy_organic[language] : (activeTab === 'chemical' ? remedy_chemical[language] : prevention[language]);
            speakDiagnosis(name[language], currentSymptoms, currentRemedy, language);
        }
    };

    const performAnalysis = async () => {
        setLoading(true);
        try {
            const result = await analyzeImage(imageUri);
            setAnalysisResult(result);
            await handleAutoSave(result);

        } catch (error) {
            console.error("Analysis failed", error);
        } finally {
            setLoading(false);
        }
    };

    if (!confirmed) {
        return (
            <View style={styles.container}>
                {renderHeader()}
                <View style={styles.confirmBox}>
                    <View style={styles.imageCard}>
                        <Image source={{ uri: imageUri }} style={styles.previewFullScreen} />
                        <View style={styles.imageOverlay}>
                            <Text style={styles.overlayText}>READY FOR AI ANALYSIS</Text>
                        </View>
                    </View>
                    <View style={styles.confirmActions}>
                        <Text style={styles.confirmMainTitle}>{translations.analyseNow}</Text>
                        <Text style={styles.confirmSubTitle}>
                            {language === 'ta' ? "இந்த படத்தை ஆய்வு செய்ய விரும்புகிறீர்களா?" : "Our AI will now check this leaf for 30+ potential issues."}
                        </Text>
                        <TouchableOpacity
                            style={styles.primaryAnalyseBtn}
                            onPress={() => setConfirmed(true)}
                        >
                            <Text style={styles.primaryAnalyseBtnText}>START ANALYSIS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelAction}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.cancelActionText}>{translations.cancel}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loaderText}>{translations.analyzing || "Consulting AI Expert..."}</Text>
            </View>
        );
    }

    if (!analysisResult) {
        return (
            <View style={styles.container}>
                <View style={styles.loaderContainer}>
                    <Text style={styles.errorTextHeading}>{translations.error || "System Error"}</Text>
                    <TouchableOpacity style={styles.errorBtn} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.errorBtnText}>{translations.backHome}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const { crop, name, isHealthy, severity, symptoms, cause, remedy, remedy_organic, remedy_chemical, prevention, confidence } = analysisResult;

    const getSeverityColor = (sev) => {
        if (!sev) return COLORS.textLight;
        switch (sev.toLowerCase()) {
            case 'low': return COLORS.success;
            case 'medium': return COLORS.warning;
            case 'high': return COLORS.error;
            default: return COLORS.textLight;
        }
    };

    return (
        <View style={styles.container}>
            {renderHeader(isHealthy)}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>
                <View style={styles.imageFrame}>
                    <Image source={{ uri: imageUri }} style={styles.mainResultImage} />
                    <View style={styles.confidenceFlag}>
                        <Text style={styles.flagValue}>{confidence}%</Text>
                        <Text style={styles.flagLabel}>CONFIDENCE</Text>
                    </View>
                </View>

                <View style={styles.diagnosisCard}>
                    <View style={styles.diagnosisHead}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cropLabelText}>{crop.toUpperCase()}</Text>
                            <Text style={styles.diagnosisMainTitle}>{name[language]}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.listenCircle}
                            onPress={handleSpeak}
                            activeOpacity={0.7}
                        >
                            <MaterialCommunityIcons name="volume-high" size={28} color={COLORS.primary} />
                            <Text style={styles.listenText}>{language === 'ta' ? "கேளுங்கள்" : "LISTEN"}</Text>
                        </TouchableOpacity>
                    </View>

                    {!isHealthy && (
                        <View style={styles.severityRow}>
                            <View style={[styles.severityPill, { backgroundColor: getSeverityColor(severity) + '20' }]}>
                                <View style={[styles.severityDot, { backgroundColor: getSeverityColor(severity) }]} />
                                <Text style={[styles.severityPillText, { color: getSeverityColor(severity) }]}>
                                    {translations.severity}: {severity.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    )}

                    <View style={styles.infoSection}>
                        <Text style={styles.sectionHeaderLabel}>
                            {analysisResult.id === 'UNKNOWN' ? translations.unknownStatus : translations.symptoms}
                        </Text>
                        <Text style={styles.sectionDescText}>{symptoms[language]}</Text>
                    </View>

                    {!isHealthy && cause && (
                        <View style={styles.infoSection}>
                            <Text style={styles.sectionHeaderLabel}>{translations.cause}</Text>
                            <Text style={styles.sectionDescText}>{cause[language]}</Text>
                        </View>
                    )}

                    {isHealthy && remedy && (
                        <View style={styles.infoSection}>
                            <Text style={styles.sectionHeaderLabel}>{translations.remedy}</Text>
                            <Text style={styles.sectionDescText}>{remedy[language]}</Text>
                        </View>
                    )}
                </View>

                {!isHealthy && (
                    <View style={styles.treatmentHub}>
                        <Text style={styles.hubTitle}>TREATMENT OPTIONS</Text>
                        <View style={styles.tabSelector}>
                            {renderTab('organic', analysisResult.id === 'UNKNOWN' ? translations.unknownInstruction : translations.organic)}
                            {renderTab('chemical', analysisResult.id === 'UNKNOWN' ? translations.unknownAdvice : translations.chemical)}
                            {renderTab('prevention', analysisResult.id === 'UNKNOWN' ? translations.unknownNextSteps : translations.prevention)}
                        </View>

                        <View style={styles.remedyDisplay}>
                            <Text style={styles.remedyContentText}>
                                {activeTab === 'organic' && remedy_organic[language]}
                                {activeTab === 'chemical' && remedy_chemical[language]}
                                {activeTab === 'prevention' && prevention[language]}
                            </Text>
                        </View>
                    </View>
                )}

                {analysisResult.diagnosticChecklist && (
                    <View style={styles.checklistBoard}>
                        <View style={styles.checklistHead}>
                            <Text style={styles.checklistHeadTitle}>
                                {analysisResult.diagnosticChecklist.title[language]}
                            </Text>
                        </View>
                        {analysisResult.diagnosticChecklist.steps.map((step, index) => (
                            <View key={index} style={styles.checklistLine}>
                                <View style={styles.checkBullet} />
                                <Text style={styles.checklistLineText}>{step[language]}</Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 40 }} />
            </ScrollView>

            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.returnHomeBtn} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.returnHomeBtnText}>{translations.backHome}</Text>
                </TouchableOpacity>
            </View>
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
        paddingBottom: 25,
        paddingHorizontal: SIZES.padding,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        ...COLORS.shadow.lg,
    },
    headerButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonText: {
        fontSize: 24,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    headerTitleUnit: {
        flex: 1,
        marginLeft: 15,
    },
    headerLabel: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    headerStatusSub: {
        fontSize: 10,
        fontWeight: '800',
        color: 'rgba(255,255,255,0.8)',
        letterSpacing: 1,
        marginTop: 2,
    },
    logoCircleHeader: {
        width: 48,
        height: 48,
        backgroundColor: COLORS.white,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        ...COLORS.shadow.sm,
    },
    logoImgSmall: {
        width: '70%',
        height: '70%',
    },
    scrollBody: {
        padding: SIZES.padding,
    },
    imageFrame: {
        width: '100%',
        height: 280,
        borderRadius: 30,
        backgroundColor: COLORS.surface,
        ...COLORS.shadow.md,
        overflow: 'hidden',
        marginBottom: 25,
    },
    mainResultImage: {
        width: '100%',
        height: '100%',
    },
    confidenceFlag: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.surface,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        ...COLORS.shadow.sm,
    },
    flagValue: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.primary,
    },
    flagLabel: {
        fontSize: 8,
        fontWeight: '800',
        color: COLORS.textLight,
        letterSpacing: 0.5,
    },
    diagnosisCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 30,
        padding: 25,
        marginBottom: 20,
        ...COLORS.shadow.md,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    diagnosisHead: {
        marginBottom: 15,
    },
    cropLabelText: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.textLight,
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    diagnosisMainTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: COLORS.text,
    },
    severityRow: {
        marginBottom: 20,
    },
    severityPill: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    severityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    severityPillText: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    infoSection: {
        marginBottom: 20,
    },
    sectionHeaderLabel: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.primary,
        letterSpacing: 1,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    sectionDescText: {
        fontSize: 16,
        color: COLORS.text,
        lineHeight: 24,
        fontWeight: '500',
    },
    treatmentHub: {
        marginBottom: 25,
    },
    hubTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: COLORS.textLight,
        letterSpacing: 1.5,
        marginBottom: 12,
        textAlign: 'center',
    },
    tabSelector: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 20,
        padding: 5,
        marginBottom: 15,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 15,
    },
    activeTabItem: {
        backgroundColor: COLORS.surface,
        ...COLORS.shadow.sm,
    },
    tabLabelText: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.textLight,
    },
    activeTabLabelText: {
        color: COLORS.primaryDark,
        fontWeight: '900',
    },
    remedyDisplay: {
        backgroundColor: COLORS.surface,
        borderRadius: 25,
        padding: 20,
        borderLeftWidth: 6,
        borderLeftColor: COLORS.primary,
        ...COLORS.shadow.sm,
    },
    remedyContentText: {
        fontSize: 15,
        color: COLORS.text,
        lineHeight: 24,
        fontWeight: '500',
    },
    checklistBoard: {
        backgroundColor: COLORS.primaryDark,
        borderRadius: 30,
        padding: 25,
        ...COLORS.shadow.md,
    },
    checklistHead: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        paddingBottom: 10,
    },
    checklistHeadTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.white,
    },
    checklistLine: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    checkBullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.secondary,
        marginTop: 6,
        marginRight: 15,
    },
    checklistLineText: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.9)',
        lineHeight: 22,
        flex: 1,
        fontWeight: '500',
    },
    bottomActions: {
        padding: SIZES.padding,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    returnHomeBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        ...COLORS.shadow.md,
    },
    returnHomeBtnText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    loaderText: {
        marginTop: 20,
        fontSize: 16,
        color: COLORS.textLight,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    confirmBox: {
        flex: 1,
        padding: SIZES.padding,
    },
    imageCard: {
        flex: 1.5,
        borderRadius: 35,
        overflow: 'hidden',
        ...COLORS.shadow.lg,
        backgroundColor: COLORS.black,
    },
    previewFullScreen: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    imageOverlay: {
        position: 'absolute',
        top: 30,
        left: 30,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    overlayText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    confirmActions: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    confirmMainTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.text,
        marginBottom: 10,
    },
    confirmSubTitle: {
        fontSize: 15,
        color: COLORS.textLight,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 35,
    },
    primaryAnalyseBtn: {
        backgroundColor: COLORS.primary,
        width: '100%',
        paddingVertical: 20,
        borderRadius: 22,
        alignItems: 'center',
        ...COLORS.shadow.lg,
    },
    primaryAnalyseBtnText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 2,
    },
    cancelAction: {
        marginTop: 20,
        padding: 10,
    },
    cancelActionText: {
        color: COLORS.textLight,
        fontSize: 15,
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
    errorTextHeading: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.error,
        marginBottom: 20,
    },
    errorBtn: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
    },
    errorBtnText: {
        color: COLORS.white,
        fontWeight: '800',
    },
    listenCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        backgroundColor: COLORS.primary + '10',
        borderRadius: 15,
        minWidth: 70,
    },
    listenText: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.primary,
        marginTop: 2,
    }
});

export default ResultScreen;
