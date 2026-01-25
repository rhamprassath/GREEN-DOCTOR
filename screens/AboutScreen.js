import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';

const { width } = Dimensions.get('window');

const AboutScreen = ({ route, navigation }) => {
    const language = route.params?.language || 'en';
    const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

    const InfoCard = ({ icon, title, content, children }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.cardIconCircle}>
                    <Text style={styles.cardIcon}>{icon}</Text>
                </View>
                <Text style={styles.cardTitle}>{title}</Text>
            </View>
            {content ? <Text style={styles.cardBody}>{content}</Text> : null}
            {children}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

            {/* Minimal Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t.aboutApp}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* 1. Logos Section - Grouped Header */}
                <View style={styles.brandHeader}>
                    <View style={styles.logoGrid}>
                        <View style={styles.brandBox}>
                            <Image source={require('../assets/uba_logo.png')} style={styles.sideLogo} resizeMode="contain" />
                        </View>
                        <View style={[styles.brandBox, styles.mainBrandBox]}>
                            <Image source={require('../assets/logo.png')} style={styles.mainLogo} resizeMode="contain" />
                        </View>
                        <View style={styles.brandBox}>
                            <Image source={require('../assets/act_logo.png')} style={styles.sideLogo} resizeMode="contain" />
                        </View>
                    </View>
                    <Text style={styles.pageHeaderTitle}>{t.aboutTitle}</Text>
                </View>

                {/* 2. Content Cards */}
                <InfoCard
                    icon="🌱"
                    title={t.aboutApp}
                    content={t.aboutContent}
                />

                <InfoCard
                    icon="👁️"
                    title={t.visionTitle}
                    content={t.visionContent}
                />

                <InfoCard icon="🎯" title={t.missionTitle}>
                    <View style={styles.bulletList}>
                        {[t.missionPoint1, t.missionPoint2, t.missionPoint3].map((point, i) => (
                            <View key={i} style={styles.bulletItem}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.bulletText}>{point}</Text>
                            </View>
                        ))}
                    </View>
                </InfoCard>

                {/* 3. Team Card */}
                <View style={[styles.card, styles.teamCard]}>
                    <View style={styles.cardHeader}>
                        <View style={[styles.cardIconCircle, { backgroundColor: '#E3F2FD' }]}>
                            <Text style={styles.cardIcon}>👥</Text>
                        </View>
                        <Text style={styles.cardTitle}>{t.ourTeam}</Text>
                    </View>

                    <View style={styles.teamGrid}>
                        <View style={styles.teamMember}>
                            <Text style={styles.roleLabel}>{t.principal?.split(':')[0] || 'Principal'}</Text>
                            <Text style={styles.memberName}>{t.principal?.split(':')[1] || ''}</Text>
                        </View>

                        <View style={styles.teamMember}>
                            <Text style={styles.roleLabel}>{t.principalInvestigator?.split(':')[0] || 'PI'}</Text>
                            <Text style={styles.memberName}>{t.principalInvestigator?.split(':')[1] || ''}</Text>
                        </View>

                        <View style={styles.teamMember}>
                            <Text style={styles.roleLabel}>{t.coPi?.split(':')[0] || 'Co-PI'}</Text>
                            <Text style={styles.memberName}>{t.coPi?.split(':')[1] || ''}</Text>
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
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 10,
        height: 60,
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 24,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    scrollContent: {
        padding: 20,
    },
    brandHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginBottom: 15,
    },
    brandBox: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    mainBrandBox: {
        width: 80,
        height: 80,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.primary + '30',
    },
    mainLogo: {
        width: '80%',
        height: '80%',
    },
    sideLogo: {
        width: '70%',
        height: '70%',
    },
    pageHeaderTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.primary,
        letterSpacing: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F1F8E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardIcon: {
        fontSize: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    cardBody: {
        fontSize: 14,
        lineHeight: 22,
        color: '#444',
        textAlign: 'justify',
    },
    bulletList: {
        marginTop: 5,
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    bulletPoint: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.primary,
        marginRight: 10,
    },
    bulletText: {
        fontSize: 14,
        color: '#444',
    },
    teamCard: {
        backgroundColor: '#fff',
    },
    teamGrid: {
        gap: 15,
    },
    teamMember: {
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    roleLabel: {
        fontSize: 12,
        color: COLORS.gray,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    memberName: {
        fontSize: 15,
        color: COLORS.text,
        fontWeight: '600',
    },
    studentSection: {
        marginTop: 5,
    },
    studentChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 10,
    },
    chip: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    chipText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    }
});

export default AboutScreen;
