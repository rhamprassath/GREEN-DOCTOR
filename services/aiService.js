import * as FileSystem from 'expo-file-system/legacy';
import { DISEASES } from '../constants/diseases';

// ----------------------------------------------------------------------
// CONFIGURATION FOR FARMERS / PRODUCTION
// ----------------------------------------------------------------------
// Option A: Hugging Face (Free Tier available)
const HF_API_URL = "https://api-inference.huggingface.co/models/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification";
const HF_API_TOKEN = ""; // <-- PASTE YOUR HUGGING FACE TOKEN HERE

// Option B: Kindwise / Plant.id (More accurate, has free trial)
const KINDWISE_API_URL = "https://api.plant.id/v2/health";
const KINDWISE_API_TOKEN = ""; // <-- PASTE YOUR KINDWISE API KEY HERE (https://web.plant.id/)

// Option C: Render Backend (Live Detection)
const RENDER_API_URL = "https://green-doctor-q79x.onrender.com/predict";
// ----------------------------------------------------------------------

export const analyzeImage = async (imageUri) => {
    try {
        console.log("Analyzing image...");

        const hasHfKey = HF_API_TOKEN && HF_API_TOKEN.length > 5;
        const hasKindwiseKey = KINDWISE_API_TOKEN && KINDWISE_API_TOKEN.length > 5;

        // 1. Try Render Backend First
        try {
            console.log("Trying Render Backend...");
            const uploadResult = await FileSystem.uploadAsync(RENDER_API_URL, imageUri, {
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: 'file',
            });

            console.log("Render Backend Response:", uploadResult.status);

            if (uploadResult.status === 200) {
                const data = JSON.parse(uploadResult.body);

                if (data.error) {
                    throw new Error(`SERVER_ERROR: ${data.error}`);
                }

                // Map to database (Try ID first, then Name)
                const matched = DISEASES.find(d => d.id === data.class || d.name.en === data.class);
                if (matched) {
                    return {
                        ...matched,
                        confidence: Math.round(data.confidence * 100),
                        isFallback: false,
                        isMock: false
                    }
                }

                return {
                    ...DISEASES[0], // Fallback structure
                    name: { en: `Detected: ${data.class}`, ta: `கண்டறியப்பட்டது: ${data.class}` },
                    confidence: Math.round(data.confidence * 100),
                    isFallback: false,
                    isMock: false
                }
            }
        } catch (e) {
            console.log("Render Backend failed (likely waking up or offline):", e.message);
        }

        // 2. Fallback to Cloud APIs if Render fails
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: 'base64',
        });

        if (hasKindwiseKey) {
            return await analyzeWithKindwise(base64);
        }

        if (hasHfKey) {
            return await analyzeWithHuggingFace(base64);
        }

        // If everything fails, throw to the main catch block
        throw new Error("ALL_SERVICES_FAILED");

    } catch (error) {
        console.error("AI Service Error:", error);

        // Fallback to Mock
        const { analyzeImage: mockAnalyze } = require('./mockAI');
        const mockResult = await mockAnalyze(imageUri);

        let errorMessage = "Offline Mode";
        if (error.message === "NO_API_KEY" || error.message === "ALL_SERVICES_FAILED") {
            errorMessage = "Using Demo Mode";
        } else {
            errorMessage = "Server Error (Backend)";
        }

        return {
            ...mockResult,
            isMock: true,
            error: errorMessage
        };
    }
};

async function analyzeWithHuggingFace(base64) {
    const response = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${HF_API_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: base64 }),
    });

    if (!response.ok) throw new Error("HF_API_ERROR");

    const predictions = await response.json();
    if (!predictions || !predictions[0]) throw new Error("HF_NO_PREDICTION");

    const label = predictions[0].label;
    const disease = mapLabelToDisease(label);
    return { ...disease, confidence: Math.round(predictions[0].score * 100) };
}

async function analyzeWithKindwise(base64) {
    const response = await fetch(KINDWISE_API_URL, {
        method: "POST",
        headers: {
            "Api-Key": KINDWISE_API_TOKEN,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            images: [base64],
            modifiers: ["crops_fast", "similar_images"],
            plant_details: ["common_names", "url", "wiki_description", "taxonomy"]
        }),
    });

    if (!response.ok) throw new Error("KINDWISE_API_ERROR");

    const data = await response.json();
    if (!data.health_assessment || !data.health_assessment.diseases) throw new Error("KINDWISE_NO_DATA");

    const topDisease = data.health_assessment.diseases[0];
    const name = topDisease.name;

    let found = DISEASES.find(d => d.name.en.toLowerCase().includes(name.toLowerCase()));

    if (!found) {
        return {
            ...DISEASES[0],
            id: 'dynamic_' + Date.now(),
            name: { en: name, ta: name },
            confidence: Math.round(topDisease.probability * 100),
            isFallback: false
        }
    }

    return { ...found, confidence: Math.round(topDisease.probability * 100) };
}

function mapLabelToDisease(label) {
    const LABEL_MAP = {
        "Tomato___Early_blight": "tomato_early_blight",
        "Tomato___Late_blight": "tomato_late_blight",
        "Tomato___healthy": "tomato_healthy",
        "Potato___Early_blight": "potato_early_blight",
        "Potato___Late_blight": "potato_late_blight",
        "Potato___healthy": "potato_healthy",
    };

    const id = LABEL_MAP[label];
    if (id) {
        const d = DISEASES.find(x => x.id === id);
        if (d) return d;
    }

    return {
        ...DISEASES[0],
        name: { en: `Detected: ${label}`, ta: `கண்டறியப்பட்டது: ${label}` }
    };
}
