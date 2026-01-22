import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Animated, StatusBar, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import { analyzeImage } from '../services/aiService';

const { width, height } = Dimensions.get('window');

const ScannerScreen = ({ navigation, route }) => {
    const language = route.params?.language || 'en';
    const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

    const [permission, requestPermission] = useCameraPermissions();
    const [isScanning, setIsScanning] = useState(true);
    const [loading, setLoading] = useState(false);
    const [lastScanResult, setLastScanResult] = useState(null);

    // Animation for the scanning pulse
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const cameraRef = useRef(null);

    useEffect(() => {
        if (isScanning) {
            startPulse();
            const interval = setInterval(() => {
                if (!loading && isScanning) {
                    autoCapture();
                }
            }, 2000); // Polling every 2 seconds for balance between real-time and server load
            return () => {
                clearInterval(interval);
                pulseAnim.stopAnimation();
            };
        }
    }, [isScanning, loading]);

    const startPulse = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
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
        if (!cameraRef.current) return;

        try {
            setLoading(true);
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.5, // Lower quality for faster real-time processing
                base64: false,
            });

            const result = await analyzeImage(photo.uri);

            if (result && result.status === 'success') {
                setLastScanResult(result);
                // If high confidence, stop and show result
                if (result.confidence > 0.85) {
                    setIsScanning(false);
                    navigation.navigate('Result', {
                        imageUri: photo.uri,
                        analysisResult: result,
                        language
                    });
                }
            }
        } catch (error) {
            console.log("Scanner Error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{t.cameraPermissionMessage}</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>{t.grantPermission}</Text>
                </TouchableOpacity>
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
            />

            {/* Scanning Overlay */}
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backIcon}>✕</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{t.scanning || 'Scanning...'}</Text>
                </View>

                <View style={styles.guideContainer}>
                    <Animated.View style={[
                        styles.scannerFrame,
                        { transform: [{ scale: pulseAnim }], borderColor: loading ? COLORS.primary : COLORS.white }
                    ]}>
                        <View style={styles.cornerTopLeft} />
                        <View style={styles.cornerTopRight} />
                        <View style={styles.cornerBottomLeft} />
                        <View style={styles.cornerBottomRight} />
                    </Animated.View>
                </View>

                <View style={styles.footer}>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={COLORS.secondary} />
                            <Text style={styles.loadingText}>{t.analyzing || 'Analyzing...'}</Text>
                        </View>
                    ) : (
                        <View style={styles.infoBox}>
                            <Text style={styles.guideText}>{t.scannerTip || 'Point camera at leaf for instant diagnosis'}</Text>
                            {lastScanResult && (
                                <View style={styles.miniResult}>
                                    <Text style={styles.miniResultText}>
                                        Last Check: {lastScanResult.class} ({(lastScanResult.confidence * 100).toFixed(0)}%)
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.manualButton}
                        onPress={() => setIsScanning(!isScanning)}
                    >
                        <Text style={styles.manualButtonText}>
                            {isScanning ? 'PAUSE' : 'RESUME SCAN'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    overlay: {
        flex: 1,
        justify_content: 'space-between',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
    },
    backButton: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
    },
    backIcon: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    guideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scannerFrame: {
        width: width * 0.7,
        height: width * 0.7,
        borderWidth: 2,
        borderRadius: 20,
        position: 'relative',
    },
    cornerTopLeft: {
        position: 'absolute',
        top: -2,
        left: -2,
        width: 40,
        height: 40,
        borderTopWidth: 6,
        borderLeftWidth: 6,
        borderColor: COLORS.secondary,
        borderTopLeftRadius: 20,
    },
    cornerTopRight: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 40,
        height: 40,
        borderTopWidth: 6,
        borderRightWidth: 6,
        borderColor: COLORS.secondary,
        borderTopRightRadius: 20,
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: -2,
        left: -2,
        width: 40,
        height: 40,
        borderBottomWidth: 6,
        borderLeftWidth: 6,
        borderColor: COLORS.secondary,
        borderBottomLeftRadius: 20,
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 40,
        height: 40,
        borderBottomWidth: 6,
        borderRightWidth: 6,
        borderColor: COLORS.secondary,
        borderBottomRightRadius: 20,
    },
    footer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    infoBox: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    guideText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    miniResult: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
        width: '100%',
    },
    miniResultText: {
        color: COLORS.secondary,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
    },
    loadingContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    loadingText: {
        color: COLORS.secondary,
        marginTop: 10,
        fontWeight: 'bold',
    },
    manualButton: {
        backgroundColor: COLORS.white,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    manualButtonText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 14,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        padding: 20,
    },
    button: {
        backgroundColor: COLORS.secondary,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ScannerScreen;
