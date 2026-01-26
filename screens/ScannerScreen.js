import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, StatusBar, ActivityIndicator, Easing } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import { analyzeImage } from '../services/aiService';
import { getClimateRisk } from '../services/weatherService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const SCAN_SIZE = width * 0.75;

const ScannerScreen = ({ navigation, route }) => {
    const language = route.params?.language || 'en';
    const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

    const [permission, requestPermission] = useCameraPermissions();
    const [locationPermission, setLocationPermission] = useState(null);
    const [isScanning, setIsScanning] = useState(true);
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState(t.checkLeaf);
    const [climateRisk, setClimateRisk] = useState(null);

    // Animations
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const cameraRef = useRef(null);

    useEffect(() => {
        // Request Location permissions
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            setLocationPermission(status === 'granted');
        })();

        // Fetch Climate Risk on mount
        const fetchClimate = async () => {
            const riskData = await getClimateRisk();
            setClimateRisk(riskData);
        };
        fetchClimate();

        if (isScanning) {
            startAnimations();
            return () => {
                pulseAnim.stopAnimation();
            };
        }
    }, [isScanning]);

    const startAnimations = () => {
        // Frame Pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.03,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                })
            ])
        ).start();
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            setIsScanning(false);
            navigation.navigate('Result', { imageUri: result.assets[0].uri, language });
        }
    };

    const performCapture = async () => {
        if (!cameraRef.current || loading) return;

        try {
            setLoading(true);
            setStatusMessage('CHECKING LEAF...');

            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.7,
                base64: false,
            });

            // Gathers location if permission granted
            let latitude = null;
            let longitude = null;
            if (locationPermission) {
                try {
                    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
                    latitude = location.coords.latitude;
                    longitude = location.coords.longitude;
                } catch (e) {
                    console.log("Location capture failed:", e);
                }
            }

            const result = await analyzeImage(photo.uri, latitude, longitude);

            if (result) {
                setIsScanning(false);
                navigation.navigate('Result', {
                    imageUri: photo.uri,
                    analysisResult: result,
                    language
                });
            }
        } catch (error) {
            console.log("Scanner Error:", error);
            setStatusMessage('TRY AGAIN...');
        } finally {
            setLoading(false);
            if (isScanning) setStatusMessage(t.checkLeaf);
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
                        <Animated.View style={[styles.cornerFrame, { transform: [{ scale: pulseAnim }] }]}>
                            <View style={[styles.corner, styles.topLeft]} />
                            <View style={[styles.corner, styles.topRight]} />
                            <View style={[styles.corner, styles.bottomLeft]} />
                            <View style={[styles.corner, styles.bottomRight]} />
                        </Animated.View>

                        {/* Static Leaf Silhouette Guide */}
                        <View style={styles.leafGuideOverlay}>
                            <MaterialCommunityIcons name="leaf-outline" size={SCAN_SIZE * 0.4} color="rgba(74, 222, 128, 0.2)" />
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

                        {/* Simplified Header */}
                        <View style={styles.headerLabelBox}>
                            <Text style={styles.headerLabelMain}>{t.checkLeaf.toUpperCase()}</Text>
                        </View>

                        <View style={{ width: 44 }} />
                    </View>

                    {/* Climate Predictor Widget */}
                    {climateRisk && (
                        <View style={styles.climateWidgetContainer}>
                            <View style={[styles.climatePill, { borderColor: climateRisk.color + '60' }]}>
                                <MaterialCommunityIcons
                                    name={climateRisk.risk === 'High' ? "alert-decagram" : "weather-partly-cloudy"}
                                    size={20}
                                    color={climateRisk.color}
                                />
                                <View style={styles.climateTextContent}>
                                    <Text style={[styles.climateRiskTitle, { color: climateRisk.color }]}>
                                        {climateRisk.risk.toUpperCase()} CLIMATE RISK
                                    </Text>
                                    <Text style={styles.climateMessage} numberOfLines={1}>
                                        {climateRisk.message[language]}
                                    </Text>
                                </View>
                                <View style={styles.climateStats}>
                                    <Text style={styles.climateStatText}>{Math.round(climateRisk.humidity)}% 💧</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    <View style={styles.statusDisplay}>
                        <View style={styles.statusPill}>
                            <View style={[styles.pulseDot, { backgroundColor: loading ? COLORS.warning : '#4ade80' }]} />
                            <Text style={styles.statusPillText}>{statusMessage}</Text>
                        </View>
                    </View>
                </View>

                {/* Footer elevation */}
                <View style={styles.bottomRegion}>
                    <View style={styles.hintBox}>
                        <Text style={styles.instructionText}>
                            {t.centerLeaf.toUpperCase()}
                        </Text>
                    </View>

                    <View style={styles.controlCenter}>
                        <TouchableOpacity style={styles.secondaryCircle} onPress={pickImage}>
                            <MaterialCommunityIcons name="image-multiple" size={24} color={COLORS.white} />
                        </TouchableOpacity>

                        <View style={styles.mainShutterOuter}>
                            <TouchableOpacity
                                style={[
                                    styles.masterShutter,
                                    loading && styles.shutterBusy,
                                ]}
                                onPress={performCapture}
                                disabled={loading}
                            >
                                <View style={styles.shutterInnerRing}>
                                    {loading ? (
                                        <ActivityIndicator color={COLORS.primary} size="large" />
                                    ) : (
                                        <View style={styles.checkLeafButton}>
                                            <MaterialCommunityIcons name="magnify-expand" size={32} color={COLORS.primary} />
                                            <Text style={styles.shutterActionMsg}>{t.checkLeaf.split(' ')[0]}</Text>
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.secondaryCircle}
                            onPress={() => setIsScanning(!isScanning)}
                        >
                            <MaterialCommunityIcons
                                name={isScanning ? "pause" : "play"}
                                size={24}
                                color={COLORS.white}
                            />
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
    },
    climateWidgetContainer: {
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    climatePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1.5,
        width: '100%',
        ...COLORS.shadow.md,
    },
    climateTextContent: {
        flex: 1,
        marginLeft: 10,
    },
    climateRiskTitle: {
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    climateMessage: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 11,
        fontWeight: '700',
        marginTop: 1,
    },
    climateStats: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    climateStatText: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: '900',
    },
    leafGuideOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerLabelBox: {
        flex: 1,
        alignItems: 'center',
    },
    headerLabelMain: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 2,
    },
    checkLeafButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    shutterActionMsg: {
        fontSize: 10,
        fontWeight: '900',
        color: COLORS.primary,
        marginTop: 2,
    }
});

export default ScannerScreen;
