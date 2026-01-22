import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';

const { width } = Dimensions.get('window');

const AboutScreen = ({ route, navigation }) => {
    const language = route.params?.language || 'en';
    const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

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

                {/* 1. Logos Section */}
                <View style={styles.logoRow}>
                    <View style={styles.sideLogoContainer}>
                        <Image
                            source={require('../assets/uba_logo.png')}
                            style={styles.sideLogo}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.mainLogoContainer}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.mainLogo}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.sideLogoContainer}>
                        <Image
                            source={require('../assets/act_logo.png')}
                            style={styles.sideLogo}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* 2. Title */}
                <Text style={styles.pageHeaderTitle}>{t.aboutTitle}</Text>

                {/* 3. About Text */}
                <Text style={styles.bodyText}>
                    {t.aboutContent}
                </Text>

                {/* 4. Vision & Mission */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionIcon}>👁️</Text>
                        <Text style={styles.sectionTitle}>{t.visionTitle}</Text>
                    </View>
                    <Text style={styles.bodyText}>
                        {t.visionContent}
                    </Text>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionIcon}>🎯</Text>
                        <Text style={styles.sectionTitle}>{t.missionTitle}</Text>
                    </View>
                    <View style={styles.bulletList}>
                        <View style={styles.bulletItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bodyText}>{t.missionPoint1}</Text>
                        </View>
                        <View style={styles.bulletItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bodyText}>{t.missionPoint2}</Text>
                        </View>
                        <View style={styles.bulletItem}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.bodyText}>{t.missionPoint3}</Text>
                        </View>
                    </View>
                </View>

                {/* 5. Our Team Section */}
                <View style={styles.teamContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionIcon}>👥</Text>
                        <Text style={styles.sectionTitle}>{t.ourTeam}</Text>
                    </View>

                    <View style={styles.teamMember}>
                        <Text style={styles.roleLabel}>{t.principal.split(':')[0]}:</Text>
                        <Text style={styles.memberName}>{t.principal.split(':')[1]}</Text>
                    </View>

                    <View style={styles.teamMember}>
                        <Text style={styles.roleLabel}>{t.principalInvestigator.split(':')[0]}:</Text>
                        <Text style={styles.memberName}>{t.principalInvestigator.split(':')[1]}</Text>
                    </View>

                    <View style={styles.teamMember}>
                        <Text style={styles.roleLabel}>{t.coPi.split(':')[0]}:</Text>
                        <Text style={styles.memberName}>{t.coPi.split(':')[1]}</Text>
                    </View>

                    <View style={styles.teamMember}>
                        <Text style={styles.roleLabel}>{t.studentInnovators}</Text>
                        <View style={styles.studentList}>
                            {t.studentsList && t.studentsList.map((student, index) => (
                                <Text key={index} style={styles.studentName}>• {student}</Text>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={{ height: 60 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white, // Clean white background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: COLORS.white,
    },
    backButton: {
        padding: 5,
    },
    backButtonText: {
        fontSize: 28,
        color: '#333',
        fontWeight: '300', // Lighter weight for modern feel
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 10,
    },
    sideLogoContainer: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // Optional: Add shadow or elevation for logos if needed, currently kept flat
    },
    sideLogo: {
        width: '100%',
        height: '100%',
    },
    mainLogoContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainLogo: {
        width: '100%',
        height: '100%',
    },
    pageHeaderTitle: {
        fontSize: 24,
        fontWeight: '800', // Heavy bold
        color: '#1B5E20', // Dark Green
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    bodyText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#444', // Dark gray for better readability than pure black
        textAlign: 'justify',
        marginBottom: 20,
        fontWeight: '400',
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionIcon: {
        fontSize: 20,
        marginRight: 10,
        color: '#2E7D32',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    bulletList: {
        marginTop: 5,
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'flex-start',
    },
    bullet: {
        fontSize: 18,
        marginRight: 10,
        color: '#2E7D32',
        lineHeight: 24,
    },
    teamContainer: {
        marginTop: 10,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    teamMember: {
        marginBottom: 15,
    },
    roleLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1B5E20',
        marginBottom: 2,
    },
    memberName: {
        fontSize: 15,
        fontWeight: '400',
        color: '#333',
    },
    studentList: {
        marginTop: 5,
        paddingLeft: 10,
    },
    studentName: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
        lineHeight: 20,
    }
});

export default AboutScreen;
