import os
import io

# Optimize memory for low-resource environments (Render Free / HF Free)
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
GENERAL_EXPERT = None
PLANT_SPECIALIST = None
PEST_EXPERT = None

from .model_manifest import get_seasonal_experts

def get_experts():
    from transformers import pipeline
    global GENERAL_EXPERT, PLANT_SPECIALIST, PEST_EXPERT
    
    if GENERAL_EXPERT is None or PLANT_SPECIALIST is None or PEST_EXPERT is None:
        manifest = get_seasonal_experts()
        print(f"Loading Multi-Expert AI Pipeline...")
        
        for entry in manifest:
            try:
                # Provide strict image processor fallback to correct the HuggingFace missing preprocessor_config crash
                if entry['id'] == 'specialist':
                    from transformers import AutoModelForImageClassification
                    import torch
                    import numpy as np
                    
                    class SpecialistPipeline:
                        def __init__(self, model_name):
                            self.model = AutoModelForImageClassification.from_pretrained(model_name).to(torch.float32)
                            self.model.eval()
                            self.torch = torch
                            
                        def manual_image_processor(self, image):
                            # Completely replaces AutoImageProcessor so torchvision is never required
                            img = image.convert("RGB").resize((224, 224))
                            img_array = np.array(img).astype(np.float32) / 255.0
                            # Standard ImageNet Normalization
                            mean = np.array([0.485, 0.456, 0.406])
                            std = np.array([0.229, 0.224, 0.225])
                            img_array = (img_array - mean) / std
                            # HWC to CHW format required by PyTorch
                            img_array = img_array.transpose(2, 0, 1)
                            # Explicitly force float32 unconditionally
                            return self.torch.tensor(img_array, dtype=self.torch.float32).unsqueeze(0)

                        def __call__(self, image):
                            inputs = self.manual_image_processor(image)
                            with self.torch.no_grad():
                                outputs = self.model(inputs)
                            probs = self.torch.nn.functional.softmax(outputs.logits, dim=-1)[0]
                            predicted_idx = probs.argmax().item()
                            return [{"label": self.model.config.id2label[predicted_idx], "score": probs[predicted_idx].item()}]
                            
                    pipe = SpecialistPipeline(entry['model'])
                else:
                    pipe = pipeline("image-classification", model=entry['model'])
                    
                if entry['id'] == 'generalist': GENERAL_EXPERT = pipe
                elif entry['id'] == 'specialist': PLANT_SPECIALIST = pipe
                elif entry['id'] == 'pest': PEST_EXPERT = pipe
                print(f"Expert [{entry['name']}] Loaded.")
            except Exception as e:
                print(f"Expert {entry['id']} Failed: {e}")

        # Security/Stability: Use weights_only if supported
        torch.set_grad_enabled(False)
        gc.collect()
        
    return GENERAL_EXPERT, PLANT_SPECIALIST, PEST_EXPERT

def focalize_leaf(image_bytes):
    import numpy as np
    import cv2
    """
    Expert Focalizer: Uses computer vision to find the leaf and detect if it's plant matter.
    Density Check: Relaxed to 0.5% to allow more 'all leaf' detections as requested.
    """
    try:
        nparr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if img is None: return None, 0.0
        
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        
        # Broad mask for plant colors: Green, Yellow, Brown, Reddish-brown
        mask_green = cv2.inRange(hsv, (25, 30, 30), (95, 255, 255))
        mask_brown = cv2.inRange(hsv, (0, 40, 20), (35, 255, 200))
        mask = cv2.bitwise_or(mask_green, mask_brown)
        
        total_pixels = img.shape[0] * img.shape[1]
        plant_pixels = cv2.countNonZero(mask)
        density = (plant_pixels / total_pixels) * 100
        
        # RELAXED THRESHOLD: 0.5% (Allows distant leaves or zoomed-out shots)
        if density < 0.5:
             print(f"Rejection: Very Low Density ({density:.2f}%)")
             return None, density

        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            return Image.open(io.BytesIO(image_bytes)).convert('RGB'), density
            
        largest_cnt = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest_cnt)
        
        # Padding 15%
        pad_w = int(w * 0.15)
        pad_h = int(h * 0.15)
        x_p, y_p = max(0, x-pad_w), max(0, y-pad_h)
        w_p, h_p = min(img.shape[1]-x_p, w+2*pad_w), min(img.shape[0]-y_p, h+2*pad_h)
        
        crop = img[y_p:y_p+h_p, x_p:x_p+w_p]
        crop_rgb = cv2.cvtColor(crop, cv2.COLOR_BGR2RGB)
        return Image.fromarray(crop_rgb), density
    except Exception as e:
        print(f"Focalizer Error: {e}")
        return Image.open(io.BytesIO(image_bytes)).convert('RGB'), 0.0

# --- MAPPINGS ---
# Generalist Map (Covers Rice, Corn, Wheat, Potato, Tomato, etc.)
GENERALIST_MAP = {
    'Apple___Apple_scab': 'Apple - Scab',
    'Apple___Black_rot': 'Apple - Black Rot',
    'Apple___Cedar_apple_rust': 'Apple - Cedar Rust',
    'Apple___healthy': 'Apple - Healthy',
    'Corn___Common_Rust': 'Corn - Common Rust',
    'Corn___Gray_Leaf_Spot': 'Corn - Gray Leaf Spot',
    'Corn___Healthy': 'Corn - Healthy',
    'Potato___Early_Blight': 'Potato - Early Blight',
    'Potato___Late_Blight': 'Potato - Late Blight',
    'Potato___Healthy': 'Potato - Healthy',
    'Rice___Brown_Spot': 'Rice - Brown Spot',
    'Rice___Healthy': 'Rice - Healthy',
    'Rice___Leaf_Blast': 'Rice - Leaf Blast',
    'Rice___Neck_Blast': 'Rice - Neck Blast',
    'Tomato___Bacterial_Spot': 'Tomato - Bacterial Spot',
    'Tomato___Early_Blight': 'Tomato - Early Blight',
    'Tomato___Healthy': 'Tomato - Healthy',
    'Tomato___Late_Blight': 'Tomato - Late Blight',
    'Tomato___Leaf_Mold': 'Tomato - Leaf Mold',
    'Tomato___Septoria_Leaf_Spot': 'Tomato - Septoria Spot',
    'Tomato___Target_Spot': 'Tomato - Target Spot',
    'Tomato___Yellow_Leaf_Curl_Virus': 'Tomato - Yellow Leaf Curl',
    'Tomato___Mosaic_Virus': 'Tomato - Mosaic Virus',
    'Wheat___Brown_Rust': 'Wheat - Brown Rust',
    'Wheat___Healthy': 'Wheat - Healthy',
    'Wheat___Yellow_Rust': 'Wheat - Yellow Rust'
}

# Specialist Map (PlantVillage 38 Classes)
SPECIALIST_MAP = {
    "Apple Scab": "Apple - Scab",
    "Apple with Black Rot": "Apple - Black Rot",
    "Cedar Apple Rust": "Apple - Rust",
    "Healthy Apple": "Apple - Healthy",
    "Healthy Blueberry Plant": "Blueberry - Healthy",
    "Cherry with Powdery Mildew": "Cherry - Powdery Mildew",
    "Healthy Cherry Plant": "Cherry - Healthy",
    "Corn (Maize) with Cercospora and Gray Leaf Spot": "Corn - Gray Leaf Spot",
    "Corn (Maize) with Common Rust": "Corn - Common Rust",
    "Corn (Maize) with Northern Leaf Blight": "Corn - Northern Leaf Blight",
    "Healthy Corn": "Corn - Healthy",
    "Grape with Black Measles": "Grape - Black Measles",
    "Grape with Black Rot": "Grape - Black Rot",
    "Grape with Leaf Blight": "Grape - Leaf Blight",
    "Healthy Grape": "Grape - Healthy",
    "Orange with Citrus Greening": "Orange - Citrus Greening",
    "Peach with Bacterial Spot": "Peach - Bacterial Spot",
    "Healthy Peach": "Peach - Healthy",
    "Pepper Bell with Bacterial Spot": "Pepper - Bacterial Spot",
    "Healthy Pepper Bell": "Pepper - Healthy",
    "Potato with Early Blight": "Potato - Early Blight",
    "Potato with Late Blight": "Potato - Late Blight",
    "Healthy Potato Plant": "Potato - Healthy",
    "Healthy Raspberry Plant": "Raspberry - Healthy",
    "Healthy Soybean Plant": "Soybean - Healthy",
    "Squash with Powdery Mildew": "Squash - Powdery Mildew",
    "Strawberry with Leaf Scorch": "Strawberry - Leaf Scorch",
    "Healthy Strawberry Plant": "Strawberry - Healthy",
    "Tomato with Bacterial Spot": "Tomato - Bacterial Spot",
    "Tomato with Early Blight": "Tomato - Early Blight",
    "Tomato with Late Blight": "Tomato - Late Blight",
    "Tomato with Leaf Mold": "Tomato - Leaf Mold",
    "Tomato with Septoria Leaf Spot": "Tomato - Septoria Spot",
    "Tomato with Spider Mites or Two-spotted Spider Mite": "Tomato - Spider Mite",
    "Tomato with Target Spot": "Tomato - Target Spot",
    "Tomato Yellow Leaf Curl Virus": "Tomato - Yellow Leaf Curl",
    "Tomato Mosaic Virus": "Tomato - Mosaic Virus",
    "Healthy Tomato Plant": "Tomato - Healthy"
}

@app.get("/")
def read_root():
    return {"status": "ready", "engine": "Multi-Expert Hybrid", "env": ENV_MODE}

@app.post("/predict")
async def predict(
    file: UploadFile = File(...),
    latitude: float = Form(None),
    longitude: float = Form(None)
):
    try:
        # Load Experts
        general_expert, plant_specialist, pest_expert = get_experts()
        contents = await file.read()
        
        # Quality Check
        image, density = focalize_leaf(contents)
        if image is None:
            return {"class": "UNKNOWN", "confidence": 0.0, "ai_details": "No leaf detected (too low plant density).", "status": "success"}

        # STEP 1: Generalist Query (The "Broad Reach" model)
        gen_res = general_expert(image) if general_expert else []
        spec_res = plant_specialist(image) if plant_specialist else []
        pest_res = pest_expert(image) if pest_expert else []

        best_prediction = {"class": "UNKNOWN", "score": 0.0, "expert": "none"}

        # LOGIC:
        # 1. If Generalist is VERY confident in a specific disease, trust it.
        # 2. If Generalist detects a plant type but not sure of disease, ask Specialist.
        # 3. If Specialist is confident in a known class, trust Specialist (it has better granularity for those 38).
        # 4. If nothing is confident, try Pest.
        gen_class, gen_score = None, 0.0
        if gen_res:
            label = gen_res[0]['label']
            print(f"DEBUG GEN RAW OUTPUT: '{label}' | Map value: {GENERALIST_MAP.get(label)}")
            if GENERALIST_MAP.get(label):
                gen_class = GENERALIST_MAP.get(label)
                gen_score = gen_res[0]['score']

        spec_class, spec_score = None, 0.0
        if spec_res:
            s_label = spec_res[0]['label']
            print(f"DEBUG SPEC RAW OUTPUT: '{s_label}' | Map value: {SPECIALIST_MAP.get(s_label)}")
            if SPECIALIST_MAP.get(s_label):
                spec_class = SPECIALIST_MAP.get(s_label)
                spec_score = spec_res[0]['score']

        best_prediction = {"class": "UNKNOWN", "score": 0.0, "expert": "none"}

        # Conflict Resolution Engine:
        if gen_class and spec_class:
            is_gen_unique = "Rice" in gen_class or "Wheat" in gen_class
            
            if is_gen_unique:
                 # For Rice/Wheat, Generalist is the absolute authority.
                 if spec_score > (gen_score + 0.50): # Only override if Specialist is absurdly confident and Gen is totally unsure
                      best_prediction = {"class": spec_class, "score": spec_score, "expert": "Specialist"}
                 else:
                      best_prediction = {"class": gen_class, "score": gen_score, "expert": "Generalist"}
            else:
                 # For Tomato, Potato, Corn, Apple, etc... Specialist is ALWAYS the authority because it knows 38 classes. 
                 # Generalist will ALWAYS mathematically hallucinate "Potato" with 90%+ confidence for Tomato leaves due to its tiny 13-class limits.
                 # NEVER allow Generalist to override Specialist for these crops!
                 best_prediction = {"class": spec_class, "score": spec_score, "expert": "Specialist"}
                      
        elif spec_class:
            best_prediction = {"class": spec_class, "score": spec_score, "expert": "Specialist"}
        elif gen_class:
            best_prediction = {"class": gen_class, "score": gen_score, "expert": "Generalist"}

        # Fallback: Pest expert
        if pest_res:
            p_score = pest_res[0]['score']
            if p_score > 0.40 and p_score > best_prediction['score']:
                best_prediction = {"class": f"Pest: {pest_res[0]['label']}", "score": p_score, "expert": "Entomology"}

        # Final Handling for "Random Images"
        if best_prediction['score'] < 0.12:
             best_prediction = {"class": "UNKNOWN", "score": best_prediction['score'], "expert": "System Rejection"}

        final_class = best_prediction['class']
        print(f"Prediction: {final_class} ({best_prediction['score']*100:.1f}%) via {best_prediction['expert']}")

        log_scan(final_class, float(best_prediction['score']), latitude, longitude)

        return {
            "class": final_class,
            "confidence": float(best_prediction['score']),
            "ai_details": f"Source: {best_prediction['expert']} (Density: {density:.1f}%)",
            "status": "success"
        }

    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e), "status": "failed"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)
