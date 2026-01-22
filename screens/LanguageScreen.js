import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';

const LanguageScreen = ({ navigation }) => {
    const handleLanguageSelect = (lang) => {
        // Navigate to Home with selected language
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home', params: { language: lang } }],
        });
    };

    return (
        <View style={styles.container}>
            {/* Logo Area */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.spacer} />

            {/* Language Selection Header */}
            <Text style={styles.title}>{TRANSLATIONS.en.selectLanguage}/</Text>
            <Text style={styles.title}>{TRANSLATIONS.ta.selectLanguage}</Text>

            <View style={styles.spacer} />

            {/* Buttons */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLanguageSelect('en')}
            >
                <Text style={styles.buttonText}>{TRANSLATIONS.en.english}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLanguageSelect('ta')}
            >
                <Text style={styles.buttonText}>{TRANSLATIONS.ta.tamil}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: SIZES.padding,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        height: 180,
    },
    logoImage: {
        width: 300,
        height: '100%',
    },
    spacer: {
        height: 30,
    },
    title: {
        color: '#004d00', // Dark green
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
    },
    button: {
        width: '100%',
        maxWidth: 250,
        paddingVertical: 15,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: COLORS.white,
        marginVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3e2723', // Dark brownish color from image
        letterSpacing: 1,
    },
});

export default LanguageScreen;
