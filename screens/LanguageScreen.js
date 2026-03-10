import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';

const { width } = Dimensions.get('window');

const LanguageScreen = ({ navigation }) => {
    const handleLanguageSelect = (lang) => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home', params: { language: lang } }],
        });
    };

    const LanguageTile = ({ lang, code, label, subLabel, icon }) => (
        <TouchableOpacity
            style={styles.langTile}
            onPress={() => handleLanguageSelect(code)}
            activeOpacity={0.7}
        >
            <View style={styles.tileContent}>
                <View style={styles.iconCircle}>
                    <Text style={styles.tileIcon}>🌐</Text>
                </View>
                <View style={styles.tileTextContainer}>
                    <Text style={styles.tileLabel}>{label}</Text>
                    <Text style={styles.tileSubLabel}>{subLabel}</Text>
                </View>
                <View style={styles.arrowContainer}>
                    <Text style={styles.arrowIcon}>→</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />

            <View style={styles.content}>
                {/* Visual Accent */}
                <View style={styles.topAccent} />

                {/* Logo Section */}
                <View style={styles.logoWrapper}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>WELCOME / வரவேற்கிறோம்</Text>
                    <Text style={styles.title}>
                        {TRANSLATIONS.en.selectLanguage} / {TRANSLATIONS.ta.selectLanguage}
                    </Text>
                </View>

                {/* Selection Section */}
                <View style={styles.selectionGrid}>
                    <LanguageTile
                        code="en"
                        label="English"
                        subLabel="Continue in English"
                    />

                    <LanguageTile
                        code="ta"
                        label="தமிழ்"
                        subLabel="தமிழில் தொடரவும்"
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Green Doctor v1.0.0</Text>
                    <View style={styles.divider} />
                    <Text style={styles.powerText}>Empowering Farmers with AI</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    topAccent: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: COLORS.primaryLight + '10',
    },
    content: {
        flex: 1,
        paddingHorizontal: SIZES.padding * 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoWrapper: {
        marginBottom: 30,
        height: 160,
        width: '100%',
        alignItems: 'center',
    },
    logoImage: {
        width: 300,
        height: '100%',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    welcomeText: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '800',
        letterSpacing: 3,
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    title: {
        color: COLORS.text,
        fontSize: SIZES.h3,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 26,
        opacity: 0.8,
    },
    selectionGrid: {
        width: '100%',
        gap: 20,
    },
    langTile: {
        backgroundColor: COLORS.surface,
        borderRadius: SIZES.radius,
        padding: SIZES.padding,
        width: '100%',
        borderWidth: 1,
        borderColor: COLORS.border,
        ...COLORS.shadow.md,
    },
    tileContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    tileIcon: {
        fontSize: 28,
    },
    tileTextContainer: {
        flex: 1,
    },
    tileLabel: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.primaryDark,
        marginBottom: 2,
    },
    tileSubLabel: {
        fontSize: 13,
        color: COLORS.textLight,
        fontWeight: '600',
    },
    arrowContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowIcon: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: '900',
    },
    footer: {
        marginTop: 60,
        alignItems: 'center',
    },
    divider: {
        width: 40,
        height: 2,
        backgroundColor: COLORS.border,
        marginVertical: 12,
    },
    footerText: {
        fontSize: 12,
        color: COLORS.textLight,
        fontWeight: 'bold',
        opacity: 0.6,
    },
    powerText: {
        fontSize: 10,
        color: COLORS.textLight,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        opacity: 0.5,
    }
});

export default LanguageScreen;
