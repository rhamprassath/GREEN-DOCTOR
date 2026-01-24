import os
import io

# Optimize memory for low-resource environments (Render Free)
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3" 
os.environ["TORCH_FORCE_WEIGHTS_ONLY_LOAD"] = "1" 
os.environ["MKL_NUM_THREADS"] = "1"
os.environ["OMP_NUM_THREADS"] = "1"

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import gc
import torch
torch.set_num_threads(1)

# Global variable for Lite Mode (Auto-detected)
IS_RENDER = os.environ.get("RENDER", "false").lower() == "true"

app = FastAPI(title="Green Doctor AI Vision")

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
# Expert 3: Sugarcane Expert
SUGARCANE_EXPERT = None

def get_experts():
    from transformers import pipeline # Lazy import to save memory during startup
    global GENERAL_EXPERT, RICE_EXPERT, SUGARCANE_EXPERT
    if GENERAL_EXPERT is None:
        print("Loading AI Experts (Expert Ensemble Initializing)...")
        
        # Restore Full Ensemble for both local and Render
        GENERAL_EXPERT = pipeline("image-classification", model="microsoft/swin-tiny-patch4-window7-224")
        RICE_EXPERT = pipeline("image-classification", model="wambugu71/crop_leaf_diseases_vit")
        
        torch.set_grad_enabled(False) # Disable gradient tracking to save RAM
        gc.collect() # Force cleanup after loading
        
        SUGARCANE_EXPERT = None
    return GENERAL_EXPERT, RICE_EXPERT, SUGARCANE_EXPERT

def focalize_leaf(image_bytes):
    import numpy as np
    import cv2
    """
    Expert Focalizer: Uses computer vision to find the leaf and crop it.
    """
    try:
        # 1. Convert to OpenCV format
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None: return None
        
        # 2. Convert to HSV for better color segmentation
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        
        # 3. Create mask for plant-like colors (Green, Yellow, Brown)
        # We target a wide range of leaf colors including diseased ones
        mask_green = cv2.inRange(hsv, (25, 40, 40), (90, 255, 255))
        mask_brown = cv2.inRange(hsv, (10, 50, 20), (30, 255, 200))
        mask = cv2.bitwise_or(mask_green, mask_brown)
        
        # 4. Find the largest contour (assuming it's the leaf)
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            return Image.open(io.BytesIO(image_bytes)).convert('RGB') # Fallback to original
            
        largest_cnt = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest_cnt)
        
        # 5. Add padding (20%)
        padding_w = int(w * 0.2)
        padding_h = int(h * 0.2)
        
        x_pad = max(0, x - padding_w)
        y_pad = max(0, y - padding_h)
        w_pad = min(img.shape[1] - x_pad, w + 2 * padding_w)
        h_pad = min(img.shape[0] - y_pad, h + 2 * padding_h)
        
        crop = img[y_pad:y_pad+h_pad, x_pad:x_pad+w_pad]
        
        # 6. Convert back to PIL for Transformers
        crop_rgb = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
        return Image.fromarray(crop_rgb)
    except Exception as e:
        print(f"Focalizer Warning: {e}")
        return Image.open(io.BytesIO(image_bytes)).convert('RGB')

# --- MAPPINGS ---
# Comprehensive Expert Mapping (Matches wambugu71/crop_leaf_diseases_vit)
EXPERT_MAP = {
    # Rice
    'Rice___Brown_Spot': 'Paddy - Brown Spot',
    'Rice___Healthy': 'Paddy - Healthy',
    'Rice___Leaf_Blast': 'Paddy - Blast',
    # Corn
    'Corn___Common_Rust': 'Corn - Common Rust',
    'Corn___Gray_Leaf_Spot': 'Corn - Gray Leaf Spot',
    'Corn___Healthy': 'Corn - Healthy',
    'Corn___Northern_Leaf_Blight': 'Corn - Gray Leaf Spot', # Map to nearest if not in DB
    # Potato
    'Potato___Early_Blight': 'Potato - Early Blight',
    'Potato___Healthy': 'Potato - Healthy',
    'Potato___Late_Blight': 'Potato - Late Blight',
    # Wheat
    'Wheat___Brown_Rust': 'Wheat - Brown Rust',
    'Wheat___Healthy': 'Wheat - Healthy',
    'Wheat___Yellow_Rust': 'Wheat - Yellow Rust',
}

# Legacy Mappings (Fallback for General Expert)
GENERAL_MAP = {
    'corn': "Corn - Healthy",
    'potato': "Potato - Healthy",
    'tomato': "Tomato - Healthy",
    'bell pepper': "Chilli - Healthy",
    'cucumber': "Chilli - Anthracnose (Fruit Rot)",
    'zucchini': "Brinjal - Phomopsis Blight",
}

@app.api_route("/", methods=["GET", "HEAD"])
def read_root():
    return {"message": "Green Doctor AI (Safetensors) is Ready"}

@app.get("/debug")
def debug_status():
    return {
        "general_expert_loaded": GENERAL_EXPERT is not None,
        "rice_expert_loaded": RICE_EXPERT is not None,
        "is_render": IS_RENDER,
        "cpu_count": os.cpu_count()
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    print(f"Leaf Vision Processing: {file.filename}")
    try:
        gen_expert, rice_expert, sugar_expert = get_experts()
        contents = await file.read()
        
        # 0. LEAF FOCALIZER: Pre-process the image for professional precision
        image = focalize_leaf(contents)
        if image is None:
            image = Image.open(io.BytesIO(contents)).convert('RGB')
        
        # 1. RUN ALL EXPERTS (with safety checks)
        results_gen = GENERAL_EXPERT(image) if GENERAL_EXPERT else []
        results_expert = RICE_EXPERT(image) if RICE_EXPERT else []
        
        # 2. ENSEMBLE LOGIC: Pick the winner based on confidence
        best_prediction = {"class": "UNKNOWN", "score": 0.0, "expert": "none", "label": "None"}
        
        # Check General (Swin Transformer)
        if results_gen:
            ai_label = results_gen[0]['label']
            ai_score = results_gen[0]['score']
            mapped = GENERAL_MAP.get(ai_label, "Tomato - Healthy")
            if ai_score > best_prediction['score']:
                best_prediction = {"class": mapped, "score": ai_score, "expert": "General", "label": ai_label}
        
        # Check Multi-Crop Expert (ViT)
        if results_expert:
            ai_label = results_expert[0]['label']
            ai_score = results_expert[0]['score']
            mapped = EXPERT_MAP.get(ai_label)
            # Specific experts take priority if they have a clear match (>45% confidence)
            if mapped and ai_score > 0.45: 
                 best_prediction = {"class": mapped, "score": ai_score, "expert": "Specific Plant Expert", "label": ai_label}
        
        # PLANTIX LOGIC: Final check
        CONFIDENCE_THRESHOLD = 0.40
        
        if best_prediction['score'] < CONFIDENCE_THRESHOLD:
            final_class = "UNKNOWN"
            print(f"UNCERTAIN Ensemble: {best_prediction['label']} ({best_prediction['score']*100:.1f}%) < Threshold")
        else:
            final_class = best_prediction['class']
            print(f"WINNER [{best_prediction['expert']}]: {best_prediction.get('label', 'None')} -> {final_class} ({best_prediction['score']*100:.1f}%)")
        
        return {
            "class": final_class,
            "confidence": float(best_prediction['score']),
            "ai_details": f"{best_prediction['expert']}: {best_prediction.get('label', 'None')}",
            "status": "success"
        }
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return {"error": str(e), "status": "failed"}

if __name__ == "__main__":
    # Get port from environment (Render default is 10000)
    port = int(os.environ.get("PORT", 10000))
    print(f"Server starting on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
