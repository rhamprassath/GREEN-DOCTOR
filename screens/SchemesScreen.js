import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Modal } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';

// Comprehensive schemes data with detailed information
const SCHEMES_DATA = [
    {
        id: 's1',
        name: {
            en: 'PM-Kisan Samman Nidhi',
            ta: 'பிரதம மந்திரி கிசான் சம்மான் நிதி'
        },
        icon: '💰',
        shortDesc: {
            en: 'Direct income support to farmers',
            ta: 'விவசாயிகளுக்கு நேரடி வருமான ஆதரவு'
        },
        description: {
            en: 'Under this scheme, financial benefit of Rs. 6000/- per year is provided to all farmer families across the country in three equal installments of Rs. 2000/- each every four months.',
            ta: 'இந்த திட்டத்தின் கீழ், நாடு முழுவதும் உள்ள அனைத்து விவசாயி குடும்பங்களுக்கும் ஆண்டுக்கு ரூ.6000/- நிதி உதவி மூன்று சம தவணைகளில் ஒவ்வொரு நான்கு மாதங்களுக்கும் ரூ.2000/- வழங்கப்படுகிறது.'
        },
        eligibility: {
            en: '• All landholding farmer families\n• Small and marginal farmers\n• Institutional land holders excluded',
            ta: '• அனைத்து நில உடைமை விவசாயி குடும்பங்கள்\n• சிறு மற்றும் குறு விவசாயிகள்\n• நிறுவன நில உரிமையாளர்கள் தவிர்க்கப்பட்டுள்ளனர்'
        },
        benefits: {
            en: '• Rs. 6000 per year\n• Direct bank transfer\n• Three installments\n• No application fee',
            ta: '• ஆண்டுக்கு ரூ.6000\n• நேரடி வங்கி பரிமாற்றம்\n• மூன்று தவணைகள்\n• விண்ணப்ப கட்டணம் இல்லை'
        },
        howToApply: {
            en: '1. Visit nearest Common Service Centre (CSC)\n2. Carry land documents and Aadhaar\n3. Fill application form\n4. Submit required documents\n5. Get acknowledgment receipt',
            ta: '1. அருகிலுள்ள பொது சேவை மையத்தை (CSC) பார்வையிடவும்\n2. நில ஆவணங்கள் மற்றும் ஆதாரை எடுத்துச் செல்லவும்\n3. விண்ணப்ப படிவத்தை நிரப்பவும்\n4. தேவையான ஆவணங்களை சமர்ப்பிக்கவும்\n5. ஒப்புகை ரசீது பெறவும்'
        }
    },
    {
        id: 's2',
        name: {
            en: 'Pradhan Mantri Fasal Bima Yojana',
            ta: 'பிரதம மந்திரி பசல் பீமா யோஜனா'
        },
        icon: '🌾',
        shortDesc: {
            en: 'Comprehensive crop insurance scheme',
            ta: 'விரிவான பயிர் காப்பீட்டு திட்டம்'
        },
        description: {
            en: 'PMFBY provides insurance coverage and financial support to farmers in the event of failure of any of the notified crop as a result of natural calamities, pests & diseases.',
            ta: 'PMFBY இயற்கை பேரிடர்கள், பூச்சிகள் மற்றும் நோய்களின் விளைவாக அறிவிக்கப்பட்ட பயிர்கள் தோல்வியுற்றால் விவசாயிகளுக்கு காப்பீட்டு பாதுகாப்பு மற்றும் நிதி உதவி வழங்குகிறது.'
        },
        eligibility: {
            en: '• All farmers including sharecroppers\n• Compulsory for loanee farmers\n• Voluntary for non-loanee farmers\n• Covers all food & oilseed crops',
            ta: '• பங்கு விவசாயிகள் உட்பட அனைத்து விவசாயிகள்\n• கடன் பெறும் விவசாயிகளுக்கு கட்டாயம்\n• கடன் பெறாத விவசாயிகளுக்கு தன்னார்வம்\n• அனைத்து உணவு மற்றும் எண்ணெய் பயிர்களை உள்ளடக்கியது'
        },
        benefits: {
            en: '• Premium: 2% for Kharif, 1.5% for Rabi\n• Coverage for natural calamities\n• Post-harvest losses covered\n• Localized risks covered\n• Quick claim settlement',
            ta: '• பிரீமியம்: கரீஃப் 2%, ரபி 1.5%\n• இயற்கை பேரிடர்களுக்கு பாதுகாப்பு\n• அறுவடைக்கு பிந்தைய இழப்புகள் உள்ளடக்கம்\n• உள்ளூர் அபாயங்கள் உள்ளடக்கம்\n• விரைவான உரிமைகோரல் தீர்வு'
        },
        howToApply: {
            en: '1. Visit bank or CSC\n2. Fill proposal form\n3. Pay premium amount\n4. Submit land records\n5. Get insurance certificate',
            ta: '1. வங்கி அல்லது CSC ஐ பார்வையிடவும்\n2. முன்மொழிவு படிவத்தை நிரப்பவும்\n3. பிரீமியம் தொகையை செலுத்தவும்\n4. நில பதிவுகளை சமர்ப்பிக்கவும்\n5. காப்பீட்டு சான்றிதழ் பெறவும்'
        }
    },
    {
        id: 's3',
        name: {
            en: 'Kisan Credit Card (KCC)',
            ta: 'கிசான் கிரெடிட் கார்டு (KCC)'
        },
        icon: '💳',
        shortDesc: {
            en: 'Credit facility for farmers',
            ta: 'விவசாயிகளுக்கான கடன் வசதி'
        },
        description: {
            en: 'KCC scheme provides adequate and timely credit support to farmers for their cultivation and other needs including purchase of agricultural inputs, draw cash for production needs and investment credit requirement.',
            ta: 'KCC திட்டம் விவசாயிகளுக்கு அவர்களின் சாகுபடி மற்றும் விவசாய உள்ளீடுகளை வாங்குதல், உற்பத்தி தேவைகளுக்கு பணம் எடுத்தல் மற்றும் முதலீட்டு கடன் தேவை உள்ளிட்ட பிற தேவைகளுக்கு போதுமான மற்றும் சரியான நேரத்தில் கடன் ஆதரவை வழங்குகிறது.'
        },
        eligibility: {
            en: '• All farmers - individual/joint\n• Tenant farmers, oral lessees\n• Self Help Groups\n• Joint Liability Groups',
            ta: '• அனைத்து விவசாயிகள் - தனிநபர்/கூட்டு\n• குத்தகை விவசாயிகள், வாய்மொழி குத்தகைதாரர்கள்\n• சுய உதவி குழுக்கள்\n• கூட்டு பொறுப்பு குழுக்கள்'
        },
        benefits: {
            en: '• Flexible credit limit\n• Low interest rates (4% for timely repayment)\n• Accident insurance coverage\n• No collateral for loans up to Rs. 1.6 lakh\n• Valid for 5 years',
            ta: '• நெகிழ்வான கடன் வரம்பு\n• குறைந்த வட்டி விகிதங்கள் (சரியான நேரத்தில் திருப்பிச் செலுத்தினால் 4%)\n• விபத்து காப்பீடு பாதுகாப்பு\n• ரூ.1.6 லட்சம் வரை கடனுக்கு பிணையம் தேவையில்லை\n• 5 ஆண்டுகளுக்கு செல்லுபடியாகும்'
        },
        howToApply: {
            en: '1. Visit nearest bank branch\n2. Fill KCC application form\n3. Submit land documents, Aadhaar, photos\n4. Bank verification\n5. Receive KCC card',
            ta: '1. அருகிலுள்ள வங்கி கிளையை பார்வையிடவும்\n2. KCC விண்ணப்ப படிவத்தை நிரப்பவும்\n3. நில ஆவணங்கள், ஆதார், புகைப்படங்களை சமர்ப்பிக்கவும்\n4. வங்கி சரிபார்ப்பு\n5. KCC அட்டையைப் பெறவும்'
        }
    },
    {
        id: 's4',
        name: {
            en: 'Soil Health Card Scheme',
            ta: 'மண் ஆரோக்கிய அட்டை திட்டம்'
        },
        icon: '🌱',
        shortDesc: {
            en: 'Soil testing and nutrient management',
            ta: 'மண் பரிசோதனை மற்றும் ஊட்டச்சத்து மேலாண்மை'
        },
        description: {
            en: 'The scheme aims to issue soil health cards to all farmers to help them apply appropriate dosage of nutrients and get good yield. The card contains soil nutrient status and recommendations on dosage of nutrients.',
            ta: 'இந்த திட்டம் அனைத்து விவசாயிகளுக்கும் மண் ஆரோக்கிய அட்டைகளை வழங்குவதை நோக்கமாகக் கொண்டுள்ளது, இது ஊட்டச்சத்துக்களின் சரியான அளவைப் பயன்படுத்தவும் நல்ல விளைச்சலைப் பெறவும் உதவுகிறது.'
        },
        eligibility: {
            en: '• All farmers across India\n• Individual land holders\n• Community/institutional lands\n• Free of cost service',
            ta: '• இந்தியா முழுவதும் உள்ள அனைத்து விவசாயிகள்\n• தனிநபர் நில உரிமையாளர்கள்\n• சமூக/நிறுவன நிலங்கள்\n• இலவச சேவை'
        },
        benefits: {
            en: '• Free soil testing\n• Nutrient recommendations\n• Fertilizer optimization\n• Improved crop yield\n• Cost reduction\n• Soil health monitoring',
            ta: '• இலவச மண் பரிசோதனை\n• ஊட்டச்சத்து பரிந்துரைகள்\n• உர உகப்பாக்கம்\n• மேம்பட்ட பயிர் விளைச்சல்\n• செலவு குறைப்பு\n• மண் ஆரோக்கிய கண்காணிப்பு'
        },
        howToApply: {
            en: '1. Contact local agriculture office\n2. Soil samples collected by officials\n3. Laboratory testing\n4. Receive Soil Health Card\n5. Follow recommendations',
            ta: '1. உள்ளூர் விவசாய அலுவலகத்தை தொடர்பு கொள்ளவும்\n2. அதிகாரிகளால் மண் மாதிரிகள் சேகரிக்கப்படும்\n3. ஆய்வக பரிசோதனை\n4. மண் ஆரோக்கிய அட்டையைப் பெறவும்\n5. பரிந்துரைகளைப் பின்பற்றவும்'
        }
    },
    {
        id: 's5',
        name: {
            en: 'PM Krishi Sinchai Yojana',
            ta: 'பிரதம மந்திரி கிருஷி சிஞ்சாய் யோஜனா'
        },
        icon: '💧',
        shortDesc: {
            en: 'Irrigation and water conservation',
            ta: 'நீர்ப்பாசனம் மற்றும் நீர் பாதுகாப்பு'
        },
        description: {
            en: 'PMKSY aims to achieve convergence of investments in irrigation at the field level, expand cultivable area under assured irrigation, improve on-farm water use efficiency, and introduce sustainable water conservation practices.',
            ta: 'PMKSY வயல் மட்டத்தில் நீர்ப்பாசனத்தில் முதலீடுகளின் ஒருங்கிணைப்பை அடைவதை நோக்கமாகக் கொண்டுள்ளது, உறுதியான நீர்ப்பாசனத்தின் கீழ் சாகுபடி பரப்பை விரிவுபடுத்துதல், பண்ணையில் நீர் பயன்பாட்டு திறனை மேம்படுத்துதல் மற்றும் நிலையான நீர் பாதுகாப்பு நடைமுறைகளை அறிமுகப்படுத்துதல்.'
        },
        eligibility: {
            en: '• All farmers\n• Farmer groups\n• Self Help Groups\n• Cooperatives\n• Panchayats',
            ta: '• அனைத்து விவசாயிகள்\n• விவசாயி குழுக்கள்\n• சுய உதவி குழுக்கள்\n• கூட்டுறவு சங்கங்கள்\n• பஞ்சாயத்துகள்'
        },
        benefits: {
            en: '• Drip/sprinkler irrigation subsidy\n• Watershed development\n• Micro-irrigation promotion\n• Water harvesting structures\n• 55-90% subsidy for SC/ST',
            ta: '• சொட்டு/தெளிப்பு நீர்ப்பாசன மானியம்\n• நீர்நிலை மேம்பாடு\n• நுண்-நீர்ப்பாசன ஊக்குவிப்பு\n• நீர் சேகரிப்பு கட்டமைப்புகள்\n• SC/ST க்கு 55-90% மானியம்'
        },
        howToApply: {
            en: '1. Visit district agriculture office\n2. Submit application with land details\n3. Technical assessment\n4. Approval and subsidy sanction\n5. Installation and verification',
            ta: '1. மாவட்ட விவசாய அலுவலகத்தை பார்வையிடவும்\n2. நில விவரங்களுடன் விண்ணப்பத்தை சமர்ப்பிக்கவும்\n3. தொழில்நுட்ப மதிப்பீடு\n4. ஒப்புதல் மற்றும் மானிய அனுமதி\n5. நிறுவல் மற்றும் சரிபார்ப்பு'
        }
    }
];

const SchemesScreen = ({ route, navigation }) => {
    const language = route.params?.language || 'en';
    const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

    const [selectedScheme, setSelectedScheme] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openSchemeDetail = (scheme) => {
        setSelectedScheme(scheme);
        setModalVisible(true);
    };

    const SchemeCard = ({ scheme }) => (
        <TouchableOpacity
            style={styles.schemeCard}
            onPress={() => openSchemeDetail(scheme)}
            activeOpacity={0.7}
        >
            <View style={styles.schemeIconContainer}>
                <Text style={styles.schemeIcon}>{scheme.icon}</Text>
            </View>
            <Text style={styles.schemeName}>{scheme.name[language]}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.appName}>GREEN DOCTOR</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Language')}
                    style={styles.languageButton}
                >
                    <Text style={styles.languageIcon}>🌐</Text>
                </TouchableOpacity>
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.pageTitle}>{t.govtSchemes.toUpperCase()}</Text>
            </View>

            {/* Schemes List */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {SCHEMES_DATA.map((scheme) => (
                    <SchemeCard key={scheme.id} scheme={scheme} />
                ))}
                <View style={{ height: 30 }} />
            </ScrollView>

            {/* Scheme Detail Modal */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>
                            {selectedScheme?.name[language]}
                        </Text>
                    </View>

                    <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                        {selectedScheme && (
                            <View style={styles.modalContent}>
                                <View style={styles.schemeIconLarge}>
                                    <Text style={styles.schemeIconLargeText}>{selectedScheme.icon}</Text>
                                </View>

                                <View style={styles.detailSection}>
                                    <Text style={styles.detailSectionTitle}>📋 {t.aboutTitle || 'About'}</Text>
                                    <Text style={styles.detailText}>{selectedScheme.description[language]}</Text>
                                </View>

                                <View style={styles.detailSection}>
                                    <Text style={styles.detailSectionTitle}>✅ Eligibility</Text>
                                    <Text style={styles.detailText}>{selectedScheme.eligibility[language]}</Text>
                                </View>

                                <View style={styles.detailSection}>
                                    <Text style={styles.detailSectionTitle}>🎁 Benefits</Text>
                                    <Text style={styles.detailText}>{selectedScheme.benefits[language]}</Text>
                                </View>

                                <View style={styles.detailSection}>
                                    <Text style={styles.detailSectionTitle}>📝 How to Apply</Text>
                                    <Text style={styles.detailText}>{selectedScheme.howToApply[language]}</Text>
                                </View>

                                <View style={{ height: 40 }} />
                            </View>
                        )}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9',
    },
    header: {
        backgroundColor: COLORS.white,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    appName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    languageButton: {
        padding: 5,
    },
    languageIcon: {
        fontSize: 24,
    },
    titleContainer: {
        backgroundColor: COLORS.white,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    schemeCard: {
        backgroundColor: COLORS.white,
        borderRadius: 25,
        padding: 16,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1.5,
        borderColor: '#4CAF50',
    },
    schemeIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    schemeIcon: {
        fontSize: 28,
    },
    schemeName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
    },
    // Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    modalHeader: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    closeButton: {
        marginRight: 15,
        padding: 5,
    },
    closeButtonText: {
        fontSize: 24,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
        flex: 1,
    },
    modalScroll: {
        flex: 1,
    },
    modalContent: {
        padding: 20,
    },
    schemeIconLarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    schemeIconLargeText: {
        fontSize: 40,
    },
    detailSection: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
    },
    detailSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10,
    },
    detailText: {
        fontSize: 15,
        color: COLORS.text,
        lineHeight: 24,
    },
});

export default SchemesScreen;
