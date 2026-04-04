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

// Option C: Custom Backend (Hugging Face / Render)
const BACKEND_API_URL = "https://rhamprassath-greendoctor-backend.hf.space/predict";
// ----------------------------------------------------------------------

export const analyzeImage = async (imageUri, latitude = null, longitude = null) => {
    try {
        console.log("Analyzing image...");

        const hasHfKey = HF_API_TOKEN && HF_API_TOKEN.length > 5;
        const hasKindwiseKey = KINDWISE_API_TOKEN && KINDWISE_API_TOKEN.length > 5;

        // 1. Try Custom Backend First
        try {
            console.log("---------------------------------------------------");
            console.log("DEBUG: Sending request to:", BACKEND_API_URL);
            const uploadParams = {};
            if (latitude) uploadParams.latitude = String(latitude);
            if (longitude) uploadParams.longitude = String(longitude);

            const filename = imageUri.split('/').pop() || 'image.jpg';
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image/jpeg`;

            const uploadResult = await FileSystem.uploadAsync(BACKEND_API_URL, imageUri, {
                httpMethod: 'POST',
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: 'file',
                mimeType: type,
                parameters: uploadParams
            });

            console.log("DEBUG: Response Status:", uploadResult.status);
            console.log("DEBUG: Response Body:", uploadResult.body);

            if (uploadResult.status === 200) {
                const data = JSON.parse(uploadResult.body);

                if (data.error) {
                    throw new Error(`SERVER_ERROR: ${data.error}`);
                }

                // Map to database (Try ID first, then Name)
                const matched = DISEASES.find(d => d.id === data.class || d.name.en === data.class);

                // UNIVERSAL AI LOGIC: If backend says "UNKNOWN", try fallback APIs immediately if keys exist.
                if (data.class === "UNKNOWN" || (data.confidence < 0.15)) {
                    console.log("DEBUG: Backend returned UNKNOWN/Low Confidence. Attempting Universal Fallback...");
                    if (hasKindwiseKey || hasHfKey) {
                        // Fall through to Tier 3 (Universal Cloud APIs)
                        throw new Error("FALLBACK_TO_UNIVERSAL");
                    }

                    return {
                        id: "UNKNOWN",
                        risk: "Unknown",
                        name: { en: "Unknown - Try Closer Scan", ta: "தெரியாதது - மீண்டும் ஸ்கேன் செய்யவும்" },
                        confidence: 0,
                        description: {
                            en: "Our specialized experts could not identify this with high certainty. It might be a crop we don't fully support yet, or the image is unclear.",
                            ta: "எங்கள் சிறப்பு நிபுணர்களால் இதை உறுதியாக அடையாளம் காண முடியவில்லை."
                        },
                        isFallback: true,
                        // Prevent ResultScreen crash
                        crop: "Unknown",
                        isHealthy: false,
                        severity: "Low",
                        symptoms: {
                            en: "We could not detect clear symptoms. Please ensure the leaf is centered and well-lit.",
                            ta: "தெளிவான அறிகுறிகளை எங்களால் கண்டறிய முடியவில்லை. இலை வெளிச்சத்தில் இருப்பதை உறுதி செய்யவும்."
                        },
                        cause: { en: "Unknown", ta: "தெரியாதது" },
                        remedy: { en: "N/A", ta: "பொருந்தாது" },
                        remedy_organic: { en: "N/A", ta: "பொருந்தாது" },
                        remedy_chemical: { en: "N/A", ta: "பொருந்தாது" },
                        prevention: { en: "N/A", ta: "பொருந்தாது" }
                    };
                }

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
                    description: {
                        en: data.ai_details || "Detected by General Expert",
                        ta: "பொதுவான நிபுணரால் கண்டறியப்பட்டது"
                    },
                    isFallback: false,
                    isMock: false
                }
            } else {
                console.log("DEBUG: Server returned non-200 status:", uploadResult.status);
                if (uploadResult.status === 503 || uploadResult.status === 504) {
                    throw new Error("SERVER_WAKING_UP");
                }
                throw new Error(`HTTP_ERROR_${uploadResult.status}`);
            }
        } catch (e) {
            if (e.message === "FALLBACK_TO_UNIVERSAL") {
                console.log("DEBUG: Triggering Universal API Fallback path...");
            } else {
                console.log("DEBUG: Upload Failed Error:", e);
                console.log("DEBUG: Error Message:", e.message);
                if (e.message && (e.message.includes("503") || e.message.includes("timeout"))) {
                    throw new Error("SERVER_WAKING_UP");
                }
                throw e; // Rethrow unexpected network or deprecation errors
            }
        }

        // 2. Fallback to Cloud APIs if Render fails
        if (hasKindwiseKey || hasHfKey) {
            const base64 = await FileSystem.readAsStringAsync(imageUri, {
                encoding: 'base64',
            });

            if (hasKindwiseKey) {
                return await analyzeWithKindwise(base64);
            }

            if (hasHfKey) {
                return await analyzeWithHuggingFace(base64);
            }
        }

        // If everything fails, throw to the main catch block
        throw new Error("ALL_SERVICES_FAILED");

    } catch (error) {
        console.error("AI Service Error:", error);

        // Determine clear user-facing error message
        let errorMessage = "Cannot reach AI servers. Please check your internet connection.";
        
        if (error.message && (error.message === "ALL_SERVICES_FAILED" || error.message === "SERVER_WAKING_UP" || error.message.includes("Network") || error.message.includes("timeout"))) {
            errorMessage = "AI Server is waking up (first request takes 60 seconds). Please wait a moment and try again.";
        } else if (error.message && error.message.includes("SERVER_ERROR")) {
            errorMessage = "Server processing error. Ensure the image is clear.";
        } else {
            errorMessage = `AI Server Details: ${error.message}`; // Show exact reason for debugging
        }

        throw new Error(errorMessage);
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
