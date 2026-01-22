import { DISEASES } from '../constants/diseases';

export const analyzeImage = async (imageUri) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Deterministic "Random" based on imageUri length or content
            // This ensures that scanning the same image always gives the same result
            let hash = 0;
            if (imageUri.length === 0) {
                hash = 5; // Default
            } else {
                for (let i = 0; i < imageUri.length; i++) {
                    const char = imageUri.charCodeAt(i);
                    hash = ((hash << 5) - hash) + char;
                    hash |= 0; // Convert to 32bit integer
                }
            }

            const index = Math.abs(hash) % DISEASES.length;
            const result = DISEASES[index];

            // Allow healthy to appear more often for demo? No, let's keep it strictly deterministic.

            // Simulate confidence score based on hash too
            const confidence = 70 + (Math.abs(hash) % 25);

            resolve({
                ...result,
                confidence: confidence
            });
        }, 2000);
    });
};
