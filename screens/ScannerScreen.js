import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, StatusBar, ActivityIndicator, Easing } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import { analyzeImage } from '../services/aiService';

const { width, height } = Dimensions.get('window');
const SCAN_SIZE = width * 0.75;

const ScannerScreen = ({ navigation, route }) => {
    const language = route.params?.language || 'en';
    const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

    const [permission, requestPermission] = useCameraPermissions();
    const [scanMode, setScanMode] = useState('auto'); // 'auto' or 'manual'
    const [isScanning, setIsScanning] = useState(true);
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('LOOKING FOR LEAVES...');

    // Animations
    const laserAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const cameraRef = useRef(null);

    useEffect(() => {
        if (isScanning && scanMode === 'auto') {
            startAnimations();
            const interval = setInterval(() => {
                if (!loading && isScanning && scanMode === 'auto') {
                    autoCapture();
                }
            }, 3000);
            return () => {
                clearInterval(interval);
                laserAnim.stopAnimation();
                pulseAnim.stopAnimation();
            };
        } else if (isScanning && scanMode === 'manual') {
            startAnimations();
            return () => {
                laserAnim.stopAnimation();
                pulseAnim.stopAnimation();
            };
        }
    }, [isScanning, loading, scanMode]);

    const startAnimations = () => {
        // Laser Sweep
        Animated.loop(
            Animated.sequence([
                Animated.timing(laserAnim, {
                    toValue: SCAN_SIZE - 4,
                    duration: 2000,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(laserAnim, {
                    toValue: 0,
                    duration: 2000,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                })
            ])
        ).start();

        // Frame Pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.05,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    };

    const autoCapture = async () => {
        if (!cameraRef.current || loading || !isScanning || scanMode !== 'auto') return;
        performCapture();
    };

    const performCapture = async () => {
        if (!cameraRef.current || loading) return;

        try {
            setLoading(true);
            setStatusMessage(scanMode === 'auto' ? 'ANALYZING DETAILS...' : 'CAPTURING...');

            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.7,
                base64: false,
            });

            const result = await analyzeImage(photo.uri);

            if (result && result.status === 'success') {
                // In auto mode, we need high confidence to auto-navigate
                // In manual mode, we always navigate on button press
                if (scanMode === 'manual' || (result.confidence > 0.45)) {
                    setIsScanning(false);
                    navigation.navigate('Result', {
                        imageUri: photo.uri,
                        analysisResult: result,
                        language
                    });
                } else {
                    setStatusMessage('HOLD STEADY...');
                }
            }
        } catch (error) {
            console.log("Scanner Error:", error);
            setStatusMessage('POOR LIGHTING? TRY AGAIN');
        } finally {
            setLoading(false);
            if (isScanning) setTimeout(() => setStatusMessage(scanMode === 'auto' ? 'LOOKING FOR LEAVES...' : 'READY FOR CAPTURE'), 1000);
        }
    };

    if (!permission) return <View style={styles.container} />;
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <View style={styles.permissionBox}>
                    <Text style={styles.permissionIcon}>📷</Text>
                    <Text style={styles.text}>{language === 'ta' ? "கேமரா அனுமதி தேவை" : "Camera Access Needed"}</Text>
                    <TouchableOpacity onPress={requestPermission} style={styles.grantButton}>
                        <Text style={styles.grantButtonText}>{t.grantPermission}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                ref={cameraRef}
                shutterSound={false}
            />

            {/* Immersive Overlay */}
            <View style={styles.maskContainer}>
                <View style={styles.maskSide} />
                <View style={styles.maskMiddle}>
                    <View style={styles.maskSide} />
                    <View style={styles.scanHole}>
                        <Animated.View style={[styles.laser, { transform: [{ translateY: laserAnim }] }]} />
                        <Animated.View style={[styles.cornerFrame, { transform: [{ scale: pulseAnim }] }]}>
                            <View style={[styles.corner, styles.topLeft]} />
                            <View style={[styles.corner, styles.topRight]} />
                            <View style={[styles.corner, styles.bottomLeft]} />
                            <View style={[styles.corner, styles.bottomRight]} />
                        </Animated.View>

                        {/* Technical HUD Details */}
                        <View style={styles.hudTechnicalLeft}>
                            <View style={styles.hudLine} />
                            <Text style={styles.hudTechText}>LR-24</Text>
                        </View>
                        <View style={styles.hudTechnicalRight}>
                            <Text style={styles.hudTechText}>AF-ON</Text>
                            <View style={styles.hudLine} />
                        </View>
                    </View>
                    <View style={styles.maskSide} />
                </View>
                <View style={styles.maskSide} />
            </View>

            {/* UI UI Controls */}
            <View style={styles.uiContainer}>
                {/* Header Elevation */}
                <View style={styles.topRegion}>
                    <View style={styles.appHeaderRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.glassBtn}>
                            <Text style={styles.glassBtnText}>✕</Text>
                        </TouchableOpacity>

                        {/* High-Tech Mode Selector */}
                        <View style={styles.premiumSwitch}>
                            <TouchableOpacity
                                style={[styles.switchTab, scanMode === 'auto' && styles.activeSwitchTab]}
                                onPress={() => setScanMode('auto')}
                            >
                                <Text style={[styles.switchTabText, scanMode === 'auto' && styles.activeSwitchTabText]}>
                                    {t.autoScan}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.switchTab, scanMode === 'manual' && styles.activeSwitchTab]}
                                onPress={() => setScanMode('manual')}
                            >
                                <Text style={[styles.switchTabText, scanMode === 'manual' && styles.activeSwitchTabText]}>
                                    {t.manualCapture}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: 44 }} />
                    </View>

                    <View style={styles.statusDisplay}>
                        <View style={styles.statusPill}>
                            <View style={[styles.pulseDot, { backgroundColor: loading ? COLORS.warning : (scanMode === 'auto' ? '#4ade80' : '#fbbf24') }]} />
                            <Text style={styles.statusPillText}>{statusMessage}</Text>
                        </View>
                    </View>
                </View>

                {/* Footer elevation */}
                <View style={styles.bottomRegion}>
                    <View style={styles.hintBox}>
                        <Text style={styles.instructionText}>
                            {scanMode === 'auto'
                                ? (language === 'ta' ? "இலையை சட்டத்திற்குள் வைக்கவும்" : "AI IS LOOKING FOR DISEASES AUTOMATICALLY")
                                : (language === 'ta' ? "புகைப்படம் எடுக்க பட்டனை அழுத்தவும்" : "TAP TO CAPTURE MANUALLY")}
                        </Text>
                    </View>

                    <View style={styles.controlCenter}>
                        <TouchableOpacity style={styles.secondaryCircle} onPress={() => navigation.navigate('About')}>
                            <Text style={{ fontSize: 24 }}>❓</Text>
                        </TouchableOpacity>

                        <View style={styles.mainShutterOuter}>
                            <TouchableOpacity
                                style={[
                                    styles.masterShutter,
                                    loading && styles.shutterBusy,
                                    scanMode === 'auto' && styles.shutterAutoMode
                                ]}
                                onPress={performCapture}
                                disabled={loading}
                            >
                                <View style={[styles.shutterInnerRing, scanMode === 'auto' && styles.shutterInnerAutoRing]}>
                                    {loading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        scanMode === 'manual' ? (
                                            <View style={styles.manualCore} />
                                        ) : (
                                            <Text style={styles.robotIcon}>🤖</Text>
                                        )
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.secondaryCircle}
                            onPress={() => setIsScanning(!isScanning)}
                        >
                            <Text style={{ fontSize: 24 }}>{isScanning ? '⏸️' : '▶️'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    maskContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    maskSide: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.65)',
    },
    maskMiddle: {
        flexDirection: 'row',
        height: SCAN_SIZE,
    },
    scanHole: {
        width: SCAN_SIZE,
        height: SCAN_SIZE,
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    cornerFrame: {
        ...StyleSheet.absoluteFillObject,
    },
    corner: {
        position: 'absolute',
        width: 32,
        height: 32,
        borderColor: '#4ade80',
    },
    topLeft: { top: 0, left: 0, borderTopWidth: 5, borderLeftWidth: 5, borderTopLeftRadius: 18 },
    topRight: { top: 0, right: 0, borderTopWidth: 5, borderRightWidth: 5, borderTopRightRadius: 18 },
    bottomLeft: { bottom: 0, left: 0, borderBottomWidth: 5, borderLeftWidth: 5, borderBottomLeftRadius: 18 },
    bottomRight: { bottom: 0, right: 0, borderBottomWidth: 5, borderRightWidth: 5, borderBottomRightRadius: 18 },
    laser: {
        height: 4,
        width: '100%',
        backgroundColor: '#4ade80',
        shadowColor: '#4ade80',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
        zIndex: 10,
    },
    hudTechnicalLeft: {
        position: 'absolute',
        left: 20,
        top: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    hudTechnicalRight: {
        position: 'absolute',
        right: 20,
        top: '40%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    hudLine: {
        width: 30,
        height: 1,
        backgroundColor: 'rgba(74, 222, 128, 0.5)',
    },
    hudTechText: {
        color: 'rgba(74, 222, 128, 0.7)',
        fontSize: 8,
        fontWeight: '900',
        marginHorizontal: 8,
        letterSpacing: 2,
    },
    uiContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        paddingVertical: 50,
    },
    topRegion: {
        gap: 20,
    },
    appHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
    },
    glassBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    glassBtnText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    premiumSwitch: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.15)',
    },
    switchTab: {
        paddingHorizontal: 22,
        paddingVertical: 8,
        borderRadius: 16,
    },
    activeSwitchTab: {
        backgroundColor: COLORS.white,
    },
    switchTabText: {
        color: COLORS.white,
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 1,
    },
    activeSwitchTabText: {
        color: COLORS.primaryDark,
    },
    statusDisplay: {
        alignItems: 'center',
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(74, 222, 128, 0.3)',
        ...COLORS.shadow.md,
    },
    pulseDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 12,
    },
    statusPillText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1.5,
    },
    bottomRegion: {
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    hintBox: {
        marginBottom: 40,
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
    },
    instructionText: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
        textAlign: 'center',
    },
    controlCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
    },
    secondaryCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    mainShutterOuter: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    masterShutter: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 5,
    },
    shutterAutoMode: {
        opacity: 0.8,
    },
    shutterInnerRing: {
        flex: 1,
        borderRadius: 37,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shutterInnerAutoRing: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    manualCore: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.white,
        borderWidth: 4,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    robotIcon: {
        fontSize: 34,
    },
    shutterBusy: {
        opacity: 0.5,
    },
    permissionBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    permissionIcon: {
        fontSize: 60,
        marginBottom: 20,
    },
    text: {
        color: COLORS.white,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: '900',
    },
    grantButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 45,
        paddingVertical: 18,
        borderRadius: 30,
        ...COLORS.shadow.md,
    },
    grantButtonText: {
        color: COLORS.white,
        fontWeight: '900',
        fontSize: 16,
        letterSpacing: 1,
    }
});

export default ScannerScreen;
