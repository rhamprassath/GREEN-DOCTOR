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

// Option C: Local Python Server (Real Detection on your machine)
const LOCAL_API_URL = "https://green-doctor-q79x.onrender.com/predict";
// ----------------------------------------------------------------------

export const analyzeImage = async (imageUri) => {
    try {
        console.log("Analyzing image...");

        // 1. Check if we have ANY valid key OR if Local Server is potentially active
        // We will assume Local Server is always an option to try if keys are missing.
        const hasHfKey = HF_API_TOKEN && HF_API_TOKEN.length > 5;
        const hasKindwiseKey = KINDWISE_API_TOKEN && KINDWISE_API_TOKEN.length > 5;

        // 2. Convert to Base64
        // Logic: Some APIs need file upload, some base64. 
        // Our Local FastAPI expects multipart upload, so we need a different approach for it if we use fetch.
        // Or we can just send base64 to it and handle it in python. 
        // Let's stick to Base64 for now as our Python code was updated to handle "file: UploadFile", 
        // which implies multipart/form-data.

        // Let's modify the local server call to use FileSystem.uploadAsync which is easier for multipart.

        let localResult = null;
        try {
            console.log("Trying Local Server...");
            const uploadResult = await FileSystem.uploadAsync(LOCAL_API_URL, imageUri, {
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: 'file',
            });
            console.log("Local Server Response:", uploadResult.status);
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
            console.log("Local Server failed (likely offline):", e.message);
        }

        // If Local Server Worked, we returned. If not, continue to Cloud APIs.

        const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: 'base64',
        });

        // 3. Try Kindwise First (Higher Accuracy)
        if (hasKindwiseKey) {
            return await analyzeWithKindwise(base64);
        }

        // 4. Try Hugging Face Second
        if (hasHfKey) {
            return await analyzeWithHuggingFace(base64);
        }

        // If NO keys and Local failed:
        if (!localResult && !hasHfKey && !hasKindwiseKey) {
            throw new Error("NO_API_KEY");
        }

    } catch (error) {
        console.error("AI Service Error:", error);

        // Fallback to Mock with a warning
        // We import mockAI at the top now (or use a dynamic require safely)
        const { analyzeImage: mockAnalyze } = require('./mockAI');
        const mockResult = await mockAnalyze(imageUri);

        let errorMessage = "Offline Mode";
        if (error.message === "NO_API_KEY") {
            errorMessage = "No API Key Configured";
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

    // Mapping logic (same as before)
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
    const name = topDisease.name; // e.g., "early blight"

    // Simple fuzzy mapping
    let found = DISEASES.find(d => d.name.en.toLowerCase().includes(name.toLowerCase()));

    if (!found) {
        // Create dynamic result if not in our DB
        return {
            ...DISEASES[0], // borrowing structure
            id: 'dynamic_' + Date.now(),
            name: { en: name, ta: name },
            confidence: Math.round(topDisease.probability * 100),
            isFallback: false
        }
    }

    return { ...found, confidence: Math.round(topDisease.probability * 100) };
}

function mapLabelToDisease(label) {
    // Basic mapping for Hugging Face model labels
    // Reuse the previous mapping logic or import it
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

    // Default fallback
    return {
        ...DISEASES[0],
        name: { en: `Detected: ${label}`, ta: `கண்டறியப்பட்டது: ${label}` }
    };
}
