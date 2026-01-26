import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';

const { width } = Dimensions.get('window');

const AboutScreen = ({ route, navigation }) => {
    const language = route.params?.language || 'en';
    const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const InfoCard = ({ icon, title, content, children, index = 0 }) => {
        const itemFade = useRef(new Animated.Value(0)).current;
        const itemSlide = useRef(new Animated.Value(20)).current;

        useEffect(() => {
            Animated.sequence([
                Animated.delay(200 + index * 150),
                Animated.parallel([
                    Animated.timing(itemFade, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(itemSlide, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    })
                ])
            ]).start();
        }, []);

        return (
            <Animated.View style={[styles.card, { opacity: itemFade, transform: [{ translateY: itemSlide }] }]}>
                <View style={styles.cardHeader}>
                    <View style={styles.cardIconCircle}>
                        <MaterialCommunityIcons name={icon} size={24} color={COLORS.primary} />
                    </View>
                    <Text style={styles.cardTitle}>{title}</Text>
                </View>
                {content ? <Text style={styles.cardBody}>{content}</Text> : null}
                {children}
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" transparent backgroundColor="transparent" />

            {/* Peak Header with Gradient */}
            <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.peakHeader}
            >
                <SafeAreaView style={styles.headerSafe}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <MaterialCommunityIcons name="chevron-left" size={32} color={COLORS.white} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitleText}>{t.aboutApp}</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    <Animated.View style={[styles.brandSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
                        <View style={styles.logoGrid}>
                            <View style={styles.brandBox}>
                                <View style={styles.whiteCircleSm}>
                                    <Image source={require('../assets/uba_logo.png')} style={styles.sideLogo} resizeMode="contain" />
                                </View>
                                <Text style={styles.logoLabel}>UBA</Text>
                            </View>

                            <View style={styles.mainBrandBox}>
                                <View style={styles.whiteCircleLg}>
                                    <Image source={require('../assets/logo.png')} style={styles.mainLogo} resizeMode="contain" />
                                </View>
                            </View>

                            <View style={styles.brandBox}>
                                <View style={styles.whiteCircleSm}>
                                    <Image source={require('../assets/act_logo.png')} style={styles.sideLogo} resizeMode="contain" />
                                </View>
                                <Text style={styles.logoLabel}>ACGCET</Text>
                            </View>
                        </View>
                    </Animated.View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[]}
            >
                <InfoCard
                    index={0}
                    icon="leaf"
                    title={t.aboutApp}
                    content={t.aboutContent}
                />

                <InfoCard
                    index={1}
                    icon="eye-outline"
                    title={t.visionTitle}
                    content={t.visionContent}
                />

                <InfoCard index={2} icon="target" title={t.missionTitle}>
                    <View style={styles.bulletList}>
                        {[t.missionPoint1, t.missionPoint2, t.missionPoint3].map((point, i) => (
                            <View key={i} style={styles.bulletItem}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.bulletText}>{point}</Text>
                            </View>
                        ))}
                    </View>
                </InfoCard>

                {/* Team Section with Modern Design */}
                <Animated.View style={[styles.card, styles.teamCard, { opacity: fadeAnim }]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.cardIconCircle, { backgroundColor: COLORS.info + '15' }]}>
                            <MaterialCommunityIcons name="account-group" size={24} color={COLORS.info} />
                        </View>
                        <Text style={styles.cardTitle}>{t.ourTeam}</Text>
                    </View>

                    <View style={styles.teamGrid}>
                        <View style={styles.teamMember}>
                            <View style={styles.roleStripe} />
                            <View style={styles.memberInfo}>
                                <Text style={styles.roleLabel}>{t.principal?.split(':')[0] || 'Principal'}</Text>
                                <Text style={styles.memberName}>{t.principal?.split(':')[1] || ''}</Text>
                            </View>
                        </View>

                        <View style={styles.teamMember}>
                            <View style={[styles.roleStripe, { backgroundColor: COLORS.secondary }]} />
                            <View style={styles.memberInfo}>
                                <Text style={styles.roleLabel}>{t.principalInvestigator?.split(':')[0] || 'PI'}</Text>
                                <Text style={styles.memberName}>{t.principalInvestigator?.split(':')[1] || ''}</Text>
                            </View>
                        </View>

                        <View style={styles.teamMember}>
                            <View style={[styles.roleStripe, { backgroundColor: COLORS.info }]} />
                            <View style={styles.memberInfo}>
                                <Text style={styles.roleLabel}>{t.coPi?.split(':')[0] || 'Co-PI'}</Text>
                                <Text style={styles.memberName}>{t.coPi?.split(':')[1] || ''}</Text>
                            </View>
                        </View>

                        <View style={styles.studentSection}>
                            <Text style={styles.roleLabel}>{t.studentInnovators}</Text>
                            <View style={styles.studentChips}>
                                {t.studentsList?.map((student, i) => (
                                    <View key={i} style={styles.chip}>
                                        <Text style={styles.chipText}>{student}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </Animated.View>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Made with ❤️ for Indian Farmers</Text>
                    <Text style={styles.versionText}>Version 1.2.0 (Stable)</Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    peakHeader: {
        paddingBottom: 30,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        ...COLORS.shadow.lg,
    },
    headerSafe: {
        paddingTop: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        height: 60,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleText: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.white,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    brandSection: {
        alignItems: 'center',
        marginTop: 10,
    },
    logoGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 25,
    },
    brandBox: {
        alignItems: 'center',
    },
    whiteCircleLg: {
        width: 110,
        height: 110,
        backgroundColor: COLORS.white,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
        ...COLORS.shadow.lg,
        borderWidth: 4,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    whiteCircleSm: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.white,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        ...COLORS.shadow.md,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    mainBrandBox: {
        padding: 5,
    },
    mainLogo: {
        width: '115%',
        height: '115%',
    },
    sideLogo: {
        width: '115%',
        height: '115%',
    },
    logoLabel: {
        color: COLORS.white,
        fontSize: 10,
        fontWeight: '900',
        marginTop: 6,
        letterSpacing: 1.5,
        opacity: 0.9,
    },
    scrollContent: {
        padding: 20,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 25,
        padding: 24,
        marginBottom: 20,
        ...COLORS.shadow.md,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardIconCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: COLORS.primary + '10',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.primaryDark,
        letterSpacing: 0.5,
    },
    cardBody: {
        fontSize: 15,
        lineHeight: 24,
        color: COLORS.text,
        textAlign: 'justify',
        fontWeight: '500',
    },
    bulletList: {
        marginTop: 5,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    bulletPoint: {
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: COLORS.secondary,
        marginRight: 12,
        marginTop: 8,
    },
    bulletText: {
        fontSize: 15,
        color: COLORS.text,
        flex: 1,
        fontWeight: '500',
        lineHeight: 22,
    },
    teamCard: {},
    teamGrid: {
        gap: 12,
    },
    teamMember: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 15,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    roleStripe: {
        width: 5,
        height: '80%',
        backgroundColor: COLORS.primary,
        borderRadius: 2.5,
        marginRight: 15,
    },
    memberInfo: {
        flex: 1,
    },
    roleLabel: {
        fontSize: 11,
        color: COLORS.textLight,
        fontWeight: '900',
        marginBottom: 2,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    memberName: {
        fontSize: 16,
        color: COLORS.primaryDark,
        fontWeight: '800',
    },
    studentSection: {
        marginTop: 10,
        backgroundColor: '#F1F3F5',
        padding: 15,
        borderRadius: 18,
    },
    studentChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 12,
    },
    chip: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 15,
        ...COLORS.shadow.sm,
    },
    chipText: {
        fontSize: 13,
        color: COLORS.text,
        fontWeight: '700',
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    versionText: {
        fontSize: 10,
        color: COLORS.textLight,
        marginTop: 5,
        fontWeight: '700',
    }
});

export default AboutScreen;
