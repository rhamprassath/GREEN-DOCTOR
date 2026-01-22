import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@green_doctor_history';

export const saveScan = async (scan) => {
    try {
        const existingHistoryStr = await AsyncStorage.getItem(HISTORY_KEY);
        const history = existingHistoryStr ? JSON.parse(existingHistoryStr) : [];

        // Add new scan to the beginning
        const newHistory = [scan, ...history];

        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
        return newHistory;
    } catch (e) {
        console.error("Failed to save scan", e);
        return [];
    }
};

export const getHistory = async () => {
    try {
        const historyStr = await AsyncStorage.getItem(HISTORY_KEY);
        return historyStr ? JSON.parse(historyStr) : [];
    } catch (e) {
        console.error("Failed to fetch history", e);
        return [];
    }
};

export const clearHistory = async () => {
    try {
        await AsyncStorage.removeItem(HISTORY_KEY);
        return [];
    } catch (e) {
        console.error("Failed to clear history", e);
        return [];
    }
};

export const deleteScan = async (timestamp) => {
    try {
        const existingHistoryStr = await AsyncStorage.getItem(HISTORY_KEY);
        let history = existingHistoryStr ? JSON.parse(existingHistoryStr) : [];

        history = history.filter(item => item.timestamp !== timestamp);

        await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        return history;
    } catch (e) {
        console.error("Failed to delete item", e);
        return [];
    }
}
