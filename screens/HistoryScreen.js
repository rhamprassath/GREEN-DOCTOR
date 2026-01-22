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
            t.delete,
            t.confirmDelete,
            [
                { text: t.cancel, style: "cancel" },
                {
                    text: t.delete,
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
                language: language
            })}
        >
            <Image source={{ uri: item.imageUri }} style={styles.thumbnail} />
            <View style={styles.cardContent}>
                <Text style={styles.cropName}>{item.analysisResult.crop}</Text>
                <Text style={styles.diseaseName}>{item.analysisResult.name[language]}</Text>
                <Text style={styles.date}>{new Date(item.timestamp).toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item)}
            >
                <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t.history}</Text>
                {history.length > 0 && (
                    <TouchableOpacity onPress={async () => {
                        await clearHistory();
                        loadHistory();
                    }}>
                        <Text style={styles.clearText}>Clear</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>{t.noHistory}</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    backButton: {
        padding: 5,
    },
    backButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    clearText: {
        color: '#fff',
        fontSize: 14,
    },
    list: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        marginBottom: 15,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    cardContent: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    cropName: {
        fontSize: 12,
        color: COLORS.gray,
        fontWeight: 'bold',
    },
    diseaseName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 5,
    },
    date: {
        fontSize: 12,
        color: COLORS.gray,
    },
    deleteButton: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    deleteText: {
        fontSize: 20,
    },
    emptyContainer: {
        flex: 1,
        paddingTop: 100,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.gray,
    }
});

export default HistoryScreen;
