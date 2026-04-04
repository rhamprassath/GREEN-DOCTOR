from transformers import pipeline, AutoImageProcessor
print("Testing AI Model Loading...")
try:
    processor = AutoImageProcessor.from_pretrained("google/mobilenet_v2_1.0_224")
    classifier = pipeline("image-classification", model="linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification", image_processor=processor)
    print("Model Loaded Successfully!")
except Exception as e:
    print(f"FAILED: {e}")
