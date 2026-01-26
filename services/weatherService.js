import * as Location from 'expo-location';

const WEATHER_API_KEY = "36df1f8c11e74a6a6a6a6a6a6a6a6a6a"; // Placeholder - User should provide their own
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

/**
 * Climate Predictor Service
 * Analyzes humidity and temperature to predict disease risk for Farmers.
 */
export const getClimateRisk = async () => {
    try {
        // 1. Get Location Permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return { error: 'PERMISSION_DENIED', risk: 'Unknown' };
        }

        // 2. Get Current Position
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // 3. Fetch Weather Data (Using units=metric for Celsius)
        // Note: In real production, use the key provided by the user or a secure proxy
        const response = await fetch(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);

        if (!response.ok) {
            // Mock data for demo if API key is invalid
            return simulateClimateRisk();
        }

        const weatherData = await response.json();
        const humidity = weatherData.main.humidity;
        const temp = weatherData.main.temp;

        return calculateRisk(humidity, temp);

    } catch (error) {
        console.warn("Weather Service Error (Likely API key or Network):", error.message);
        return simulateClimateRisk();
    }
};

const calculateRisk = (humidity, temp) => {
    let riskLevel = 'Low';
    let message = { en: "Low risk of weather-based diseases.", ta: "வானிலை சார்ந்த நோய்களின் அபாயம் குறைவு." };
    let color = '#4CAF50'; // Green

    // Risk Logic for Paddy Blast & Blights (Common in high humidity)
    if (humidity > 85) {
        if (temp > 20 && temp < 28) {
            riskLevel = 'High';
            message = {
                en: "High Humidity: Extreme risk of Paddy Blast & Blight.",
                ta: "அதிக ஈரப்பதம்: நெல் குலை மற்றும் கருகல் நோய் அபாயம் அதிகம்."
            };
            color = '#F44336'; // Red
        } else {
            riskLevel = 'Medium';
            message = {
                en: "Moderate risk: Watch for fungal growth.",
                ta: "மிதமான அபாயம்: பூஞ்சை காளான் வளர்ச்சியை கவனிக்கவும்."
            };
            color = '#FF9800'; // Amber
        }
    }

    return { risk: riskLevel, message, color, humidity, temp };
};

// Simulation for demo purposes when API key isn't provided/valid
const simulateClimateRisk = () => {
    const mockHumidity = 88;
    const mockTemp = 24;
    return {
        ...calculateRisk(mockHumidity, mockTemp),
        isSimulated: true
    };
};
