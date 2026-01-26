import * as Speech from 'expo-speech';

/**
 * Speech Service for Farmers
 * Optimized for English and Tamil with clear pronunciation for field use.
 */
export const speakDiagnosis = async (name, symptoms, remedy, language = 'en') => {
    try {
        const isStopped = await Speech.isSpeakingAsync();
        if (isStopped) {
            await Speech.stop();
            return;
        }

        const locale = language === 'ta' ? 'ta-IN' : 'en-US';
        const options = {
            language: locale,
            pitch: 1.0,
            rate: 0.85, // Slightly slower for clarity in loud environments
        };

        const textToSpeak = language === 'ta'
            ? `${name}. அறிகுறிகள்: ${symptoms}. தீர்வு: ${remedy}`
            : `${name}. Symptoms: ${symptoms}. Remedy: ${remedy}`;

        Speech.speak(textToSpeak, options);
    } catch (error) {
        console.error("Speech Error:", error);
    }
};

export const stopSpeech = () => {
    Speech.stop();
};
