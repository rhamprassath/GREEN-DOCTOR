import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import { getHistory, deleteScan, clearHistory } from '../utils/storage';

const HistoryScreen = ({ navigation, route }) => {
    const { language } = route.params;
    const t = TRANSLATIONS[language];
    const [history, setHistory] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadHistory();
        }, [])
    );

    const loadHistory = async () => {
        const data = await getHistory();
        setHistory(data);
    };

    const handleDelete = async (item) => {
        Alert.alert(
            language === 'ta' ? "ஸ்கேனை நீக்கவா?" : "Delete Scan?",
            language === 'ta' ? "நிச்சயமாக இதை நீக்க விரும்புகிறீர்களா?" : "Are you sure you want to remove this from your history?",
            [
                { text: t.cancel, style: "cancel" },
                {
                    text: language === 'ta' ? "நீக்கு" : "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deleteScan(item.timestamp);
                        loadHistory();
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Result', {
                imageUri: item.imageUri,
                analysisResult: item.analysisResult,
                language: language,
                isHistory: true
            })}
            activeOpacity={0.7}
        >
            <View style={styles.thumbnailContainer}>
                <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
                <View style={styles.statusDotOverlay}>
                    <View style={[styles.miniDot, { backgroundColor: item.analysisResult.isHealthy ? COLORS.success : COLORS.error }]} />
                </View>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cropName}>{item.analysisResult.crop.toUpperCase()}</Text>
                <Text style={styles.diseaseName}>{item.analysisResult.name[language]}</Text>
                <Text style={styles.dateText}>{new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteIconButton}
                onPress={() => handleDelete(item)}
            >
                <Text style={styles.trashIcon}>🗑️</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Text style={styles.backBtnText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{t.history}</Text>
                    <View style={{ width: 44 }} />
                </View>

                {history.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearBadge}
                        onPress={() => {
                            Alert.alert(
                                t.clearHistory,
                                t.confirmClearAll,
                                [
                                    { text: t.cancel, style: "cancel" },
                                    {
                                        text: t.clearHistory,
                                        style: "destructive",
                                        onPress: async () => {
                                            await clearHistory();
                                            loadHistory();
                                        }
                                    }
                                ]
                            );
                        }}
                    >
                        <Text style={styles.clearBadgeText}>{t.clearHistory.toUpperCase()}</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={(item) => item.timestamp.toString()}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyBox}>
                        <Text style={styles.emptyIcon}>📂</Text>
                        <Text style={styles.emptyTitle}>{t.noHistory}</Text>
                        <Text style={styles.emptySub}>{language === 'ta' ? "நீங்கள் செய்த ஸ்கேன்கள் இங்கே தோன்றும்" : "Your scan history will appear here once you start scanning leaves."}</Text>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.primary,
        paddingTop: 50,
        paddingBottom: 25,
        paddingHorizontal: SIZES.padding,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        ...COLORS.shadow.lg,
        alignItems: 'center',
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backBtnText: {
        fontSize: 24,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    clearBadge: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    clearBadgeText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
    },
    listContainer: {
        padding: SIZES.padding,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 22,
        marginBottom: 15,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        ...COLORS.shadow.sm,
    },
    thumbnailContainer: {
        position: 'relative',
    },
    thumbnail: {
        width: 64,
        height: 64,
        borderRadius: 15,
        backgroundColor: COLORS.background,
    },
    statusDotOverlay: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: COLORS.white,
        width: 14,
        height: 14,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        ...COLORS.shadow.sm,
    },
    miniDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    cardContent: {
        flex: 1,
        marginLeft: 15,
    },
    cropName: {
        fontSize: 10,
        color: COLORS.textLight,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 2,
    },
    diseaseName: {
        fontSize: 17,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 4,
    },
    dateText: {
        fontSize: 12,
        color: COLORS.textLight,
        fontWeight: '600',
    },
    deleteIconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    trashIcon: {
        fontSize: 18,
        opacity: 0.6,
    },
    emptyBox: {
        flex: 1,
        paddingTop: 80,
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: 20,
        opacity: 0.2,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.text,
        marginBottom: 8,
    },
    emptySub: {
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: 'center',
        lineHeight: 20,
        fontWeight: '500',
    }
});

export default HistoryScreen;
