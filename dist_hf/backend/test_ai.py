from transformers import pipeline
print("Testing AI Model Loading...")
classifier = pipeline("image-classification", model="linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification")
print("Model Loaded Successfully!")
