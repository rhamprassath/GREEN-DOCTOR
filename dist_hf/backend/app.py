import os
import io

# Optimize memory for low-resource environments (Render Free)
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3" 
os.environ["TORCH_FORCE_WEIGHTS_ONLY_LOAD"] = "1" 
os.environ["MKL_NUM_THREADS"] = "1"
os.environ["OMP_NUM_THREADS"] = "1"

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import gc
import torch
from backend.database import log_scan, init_db

torch.set_num_threads(1)

# Ensure DB is initialized on startup
init_db()

# Environment Detection
IS_RENDER = os.environ.get("RENDER", "false").lower() == "true"
IS_HF = "SPACE_ID" in os.environ
ENV_MODE = "HuggingFace" if IS_HF else ("Render" if IS_RENDER else "Local")

app = FastAPI(title=f"Green Doctor AI Vision [{ENV_MODE}]")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- GLOBAL MODELS ---
# Expert 1: General (Vegetables/Fruits)
GENERAL_EXPERT = None
# Expert 2: Paddy (Rice) Expert
RICE_EXPERT = None
# Expert 3: Plant Disease Specialist (38 Categories)
PLANT_SPECIALIST = None
# Expert 4: Pest & Insect Detector
PEST_EXPERT = None

from .model_manifest import get_seasonal_experts

def get_experts():
    from transformers import pipeline
    global PLANT_SPECIALIST, PEST_EXPERT
    
    if PLANT_SPECIALIST is None or PEST_EXPERT is None:
        manifest = get_seasonal_experts()
        print(f"Loading Simplified AI Pipeline...")
        
        for entry in manifest:
            try:
                pipe = pipeline("image-classification", model=entry['model'])
                if entry['id'] == 'specialist': PLANT_SPECIALIST = pipe
                elif entry['id'] == 'pest': PEST_EXPERT = pipe
                print(f"Expert [{entry['name']}] Loaded.")
            except Exception as e:
                print(f"Expert {entry['id']} Failed: {e}")

        torch.set_grad_enabled(False)
        gc.collect()
        
    return PLANT_SPECIALIST, PEST_EXPERT

def focalize_leaf(image_bytes):
    import numpy as np
    import cv2
    """
    Expert Focalizer: Uses computer vision to find the leaf, crop it, and calculate density.
    Returns: (PIL Image, density_percentage)
    """
    try:
        # 1. Convert to OpenCV format
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None: return None, 0.0
        
        # 2. Convert to HSV for better color segmentation
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        
        # 3. Create mask for plant-like colors (Green, Yellow, Brown)
        mask_green = cv2.inRange(hsv, (25, 40, 40), (90, 255, 255))
        mask_brown = cv2.inRange(hsv, (10, 50, 20), (30, 255, 200))
        mask = cv2.bitwise_or(mask_green, mask_brown)
        
        # 4. Calculate Leaf Density
        total_pixels = img.shape[0] * img.shape[1]
        plant_pixels = cv2.countNonZero(mask)
        density = (plant_pixels / total_pixels) * 100
        
        # Rejection Threshold: If less than 1.0% of the image is plant-like, it's likely not a leaf
        if density < 1.0:
             print(f"Leaf Validation FAILED: Density {density:.2f}% < 1.0%")
             return None, density

        # 5. Find the largest contour (assuming it's the leaf)
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            return Image.open(io.BytesIO(image_bytes)).convert('RGB'), density
            
        largest_cnt = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest_cnt)
        
        # 6. Add padding (20%)
        padding_w = int(w * 0.2)
        padding_h = int(h * 0.2)
        
        x_pad = max(0, x - padding_w)
        y_pad = max(0, y - padding_h)
        w_pad = min(img.shape[1] - x_pad, w + 2 * padding_w)
        h_pad = min(img.shape[0] - y_pad, h + 2 * padding_h)
        
        crop = img[y_pad:y_pad+h_pad, x_pad:x_pad+w_pad]
        
        # 7. Convert back to PIL for Transformers
        crop_rgb = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
        return Image.fromarray(crop_rgb), density
    except Exception as e:
        print(f"Focalizer Warning: {e}")
        return Image.open(io.BytesIO(image_bytes)).convert('RGB'), 0.0

# --- MAPPINGS ---
# Comprehensive Expert Mapping (Matches wambugu71/crop_leaf_diseases_vit)
# Comprehensive Specialist Mapping (Matches linkanjarad/mobilenet_v2)
PLANT_VILLAGE_MAP = {
    "Apple___Apple_scab": "Apple - Scab",
    "Apple___Black_rot": "Apple - Black Rot",
    "Apple___Cedar_apple_rust": "Apple - Cedar Rust",
    "Apple___healthy": "Apple - Healthy",
    "Blueberry___healthy": "Blueberry - Healthy",
    "Cherry_(including_sour)___Powdery_mildew": "Cherry - Powdery Mildew",
    "Cherry_(including_sour)___healthy": "Cherry - Healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "Corn - Gray Leaf Spot",
    "Corn_(maize)___Common_rust_": "Corn - Common Rust",
    "Corn_(maize)___Northern_Leaf_Blight": "Corn - Leaf Blight",
    "Corn_(maize)___healthy": "Corn - Healthy",
    "Grape___Black_rot": "Grape - Black Rot",
    "Grape___Esca_(Black_Measles)": "Grape - Black Measles",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Grape - Leaf Blight",
    "Grape___healthy": "Grape - Healthy",
    "Orange___Haunglongbing_(Citrus_greening)": "Orange - Huanglongbing (Greening)",
    "Peach___Bacterial_spot": "Peach - Bacterial Spot",
    "Peach___healthy": "Peach - Healthy",
    "Pepper,_bell___Bacterial_spot": "Pepper - Bacterial Spot",
    "Pepper,_bell___healthy": "Pepper - Healthy",
    "Potato___Early_blight": "Potato - Early Blight",
    "Potato___Late_blight": "Potato - Late Blight",
    "Potato___healthy": "Potato - Healthy",
    "Raspberry___healthy": "Raspberry - Healthy",
    "Soybean___healthy": "Soybean - Healthy",
    "Squash___Powdery_mildew": "Squash - Powdery Mildew",
    "Strawberry___Leaf_scorch": "Strawberry - Leaf Scorch",
    "Strawberry___healthy": "Strawberry - Healthy",
    "Tomato___Bacterial_spot": "Tomato - Bacterial Spot",
    "Tomato___Early_blight": "Tomato - Early Blight",
    "Tomato___Late_blight": "Tomato - Late Blight",
    "Tomato___Leaf_Mold": "Tomato - Leaf Mold",
    "Tomato___Septoria_leaf_spot": "Tomato - Septoria Spot",
    "Tomato___Spider_mites Two-spotted_spider_mite": "Tomato - Spider Mite",
    "Tomato___Target_Spot": "Tomato - Target Spot",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Tomato - Yellow Leaf Curl",
    "Tomato___Tomato_mosaic_virus": "Tomato - Mosaic Virus",
    "Tomato___healthy": "Tomato - Healthy"
}

# Legacy Mappings (Fallback for General Expert)
GENERAL_MAP = {
    'corn': "Corn - Healthy",
    'potato': "Potato - Healthy",
    'tomato': "Tomato - Healthy",
    'rice': "Paddy - Healthy",
    'chilli': "Chilli - Healthy",
}

@app.api_route("/", methods=["GET", "HEAD"])
def read_root():
    return {"message": "Green Doctor AI (Safetensors) is Ready"}

@app.get("/debug")
def debug_status():
    get_experts() # Trigger loading if not already loaded
    return {
        "general_expert_loaded": GENERAL_EXPERT is not None,
        "rice_expert_loaded": RICE_EXPERT is not None,
        "is_render": IS_RENDER,
        "cpu_count": os.cpu_count()
    }

import hashlib

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    latitude: float = Form(None),
    longitude: float = Form(None)
):
    print(f"Leaf Vision Processing: {file.filename} (Lat: {latitude}, Lng: {longitude})")
    try:
        # 1. LOAD MODELS
        plant_specialist, pest_expert = get_experts()
        contents = await file.read()
        
        # 2. QUALITY CHECK (FOCALIZER)
        # Pre-process and validate if it's a leaf based on plant-color density
        image, density = focalize_leaf(contents)
        
        if image is None:
            print(f"REJECTED: Low Leaf Density ({density:.2f}%)")
            log_scan("REJECTED_LOW_DENSITY", 0.0, latitude, longitude, status="rejected")
            return {
                "class": "UNKNOWN",
                "confidence": 0.0,
                "ai_details": f"Quality Check: Low Leaf Density ({density:.1f}%)",
                "status": "success"
            }

        # 3. CORE AI LOGIC (PERFECT DETECTION RESTORATION)
        # Focus on the Specialist model (PlantVillage) which was the "Good" model from a month ago
        specialist_results = plant_specialist(image) if plant_specialist else []
        
        final_prediction = {"class": "UNKNOWN", "score": 0.0, "expert": "none", "label": "None"}
        
        if specialist_results:
            ai_label = specialist_results[0]['label']
            ai_score = specialist_results[0]['score']
            mapped = PLANT_VILLAGE_MAP.get(ai_label)
            
            # CASE A: High Confidence Specialist (Success)
            if mapped and ai_score > 0.40:
                final_prediction = {"class": mapped, "score": ai_score, "expert": "Specialist", "label": ai_label}
            
            # CASE B: Medium Confidence - Check for Pests
            elif ai_score > 0.15:
                # Specialist is unsure, let's see if the Entomology expert sees a bug
                pest_results = pest_expert(image) if pest_expert else []
                if pest_results and pest_results[0]['score'] > 0.70:
                    pest_label = pest_results[0]['label']
                    final_prediction = {"class": f"Pest: {pest_label}", "score": pest_results[0]['score'], "expert": "Entomology", "label": pest_label}
                elif mapped:
                    # No pest found, stick with Specialist even if confidence is moderate
                    final_prediction = {"class": mapped, "score": ai_score, "expert": "Specialist", "label": ai_label}
            
            # CASE C: Low Confidence (Safety Reject)
            else:
                final_prediction = {"class": "UNKNOWN", "score": ai_score, "expert": "Specialist", "label": "Low Confidence"}

        # 4. FINALIZATION
        final_class = final_prediction['class']
        print(f"PREDICTION [{final_prediction['expert']}]: {final_prediction.get('label', 'None')} -> {final_class} ({final_prediction['score']*100:.1f}%)")
        
        # LOG TO TELEMETRY DATABASE
        log_scan(final_class, float(final_prediction['score']), latitude, longitude)

        return {
            "class": final_class,
            "confidence": float(final_prediction['score']),
            "ai_details": f"{final_prediction['expert']}: {final_prediction.get('label', 'None')} (Density: {density:.1f}%)",
            "status": "success"
        }
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"error": str(e), "status": "failed"}

if __name__ == "__main__":
    import uvicorn
    # Get port from environment (Render default is 10000)
    port = int(os.environ.get("PORT", 10000))
    print(f"Server starting on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
