import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CROPS = [
    { id: 'paddy', name: { en: 'Paddy (Rice)', ta: 'நெல்' }, dosage: 1.5 }, // Liters per acre
    { id: 'corn', name: { en: 'Corn', ta: 'சோளம்' }, dosage: 1.2 },
    { id: 'tomato', name: { en: 'Tomato', ta: 'தக்காளி' }, dosage: 0.8 },
    { id: 'sugarcane', name: { en: 'Sugarcane', ta: 'கரும்பு' }, dosage: 2.0 },
];

const CalculatorScreen = ({ navigation, route }) => {
    const language = route.params?.language || 'en';
    const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

    const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
    const [area, setArea] = useState('');
    const [unit, setUnit] = useState('Acres'); // 'Acres' or 'Cents'
    const [result, setResult] = useState(null);

    const calculateDosage = () => {
        const areaNum = parseFloat(area);
        if (isNaN(areaNum) || areaNum <= 0) return;

        // Convert cents to acres if needed (100 cents = 1 acre)
        const normalizeAcres = unit === 'Cents' ? areaNum / 100 : areaNum;

        const total = normalizeAcres * selectedCrop.dosage;
        setResult(total.toFixed(2));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.title}>{language === 'ta' ? "அளவு கால்குலேட்டர்" : "DOSAGE CALCULATOR"}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.introCard}>
                    <MaterialCommunityIcons name="calculator-variant" size={40} color={COLORS.secondary} />
                    <Text style={styles.introText}>
                        {language === 'ta'
                            ? "உங்கள் நிலத்தின் பரப்பளவிற்கு தேவையான சரியான மருந்து அளவை கணக்கிடுங்கள்."
                            : "Calculate the exact amount of treatment/fertilizer needed for your specific land area."}
                    </Text>
                </View>

                {/* Crop Selection */}
                <Text style={styles.label}>{language === 'ta' ? "பயிரைத் தேர்ந்தெடுக்கவும்" : "SELECT CROP"}</Text>
                <View style={styles.chipRow}>
                    {CROPS.map(crop => (
                        <TouchableOpacity
                            key={crop.id}
                            style={[styles.chip, selectedCrop.id === crop.id && styles.activeChip]}
                            onPress={() => setSelectedCrop(crop)}
                        >
                            <Text style={[styles.chipText, selectedCrop.id === crop.id && styles.activeChipText]}>
                                {crop.name[language]}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Area Input */}
                <Text style={styles.label}>{language === 'ta' ? "நிலப்பரப்பு" : "LAND AREA"}</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="0.00"
                        keyboardType="numeric"
                        value={area}
                        onChangeText={setArea}
                    />
                    <View style={styles.unitToggle}>
                        <TouchableOpacity
                            style={[styles.unitBtn, unit === 'Acres' && styles.activeUnit]}
                            onPress={() => setUnit('Acres')}
                        >
                            <Text style={[styles.unitText, unit === 'Acres' && styles.activeUnitText]}>Acres</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.unitBtn, unit === 'Cents' && styles.activeUnit]}
                            onPress={() => setUnit('Cents')}
                        >
                            <Text style={[styles.unitText, unit === 'Cents' && styles.activeUnitText]}>Cents</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.calcBtn} onPress={calculateDosage}>
                    <Text style={styles.calcBtnText}>{language === 'ta' ? "கணக்கிடு" : "CALCULATE QUANTITY"}</Text>
                </TouchableOpacity>

                {result && (
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>{language === 'ta' ? "தேவையான அளவு" : "REQUIRED DOSAGE"}</Text>
                        <View style={styles.resultRow}>
                            <Text style={styles.resultValue}>{result}</Text>
                            <Text style={styles.resultUnit}>{language === 'ta' ? "லிட்டர்கள்" : "Liters"}</Text>
                        </View>
                        <View style={styles.divider} />
                        <Text style={styles.disclaimer}>
                            {language === 'ta'
                                ? "* இது ஒரு தோராயமான அளவு. பயன்படுத்துவதற்கு முன் உள்ளூர் அதிகாரிகளின் ஆலோசனையைப் பெறவும்."
                                : "* Estimated quantity. Always consult a local agronomist for specific brands."}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: '900',
        color: COLORS.primary,
        textAlign: 'center',
        letterSpacing: 1,
    },
    scrollContent: {
        padding: 20,
    },
    introCard: {
        backgroundColor: COLORS.primary + '10',
        padding: 25,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: COLORS.primary,
    },
    introText: {
        marginTop: 15,
        textAlign: 'center',
        color: COLORS.text,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },
    label: {
        fontSize: 12,
        fontWeight: '900',
        color: COLORS.textLight,
        letterSpacing: 1.5,
        marginBottom: 15,
        marginLeft: 5,
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 30,
    },
    chip: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    activeChip: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    chipText: {
        color: COLORS.text,
        fontWeight: '700',
        fontSize: 13,
    },
    activeChipText: {
        color: COLORS.white,
    },
    inputGroup: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 30,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    unitToggle: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 5,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: 'row',
    },
    unitBtn: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderRadius: 15,
    },
    activeUnit: {
        backgroundColor: COLORS.primary + '20',
    },
    unitText: {
        fontSize: 12,
        fontWeight: '800',
        color: COLORS.textLight,
    },
    activeUnitText: {
        color: COLORS.primary,
    },
    calcBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 20,
        borderRadius: 25,
        alignItems: 'center',
        elevation: 5,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    calcBtnText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 2,
    },
    resultCard: {
        backgroundColor: COLORS.primaryDark,
        marginTop: 40,
        padding: 30,
        borderRadius: 30,
        alignItems: 'center',
    },
    resultLabel: {
        color: COLORS.secondary,
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 10,
    },
    resultRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    resultValue: {
        fontSize: 48,
        fontWeight: '900',
        color: COLORS.white,
    },
    resultUnit: {
        fontSize: 18,
        fontWeight: '700',
        color: 'rgba(255,255,255,0.7)',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 20,
    },
    disclaimer: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 10,
        textAlign: 'center',
        fontStyle: 'italic',
    }
});

export default CalculatorScreen;
