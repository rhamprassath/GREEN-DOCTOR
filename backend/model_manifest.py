from datetime import datetime

def get_seasonal_experts():
    month = datetime.now().month
    
    # Base models that always load
    experts = [
        {"id": "general", "model": "microsoft/swin-tiny-patch4-window7-224"},
        {"id": "specialist", "model": "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"},
        {"id": "pest", "model": "dennisjnr/insect-classification"}
    ]
    
    # Seasonal Crop Experts
    if month in [6, 7, 8, 9, 10]: # Kharif (Monsoon)
        experts.append({"id": "seasonal", "name": "Paddy/Cereal Expert", "model": "wambugu71/crop_leaf_diseases_vit"})
    elif month in [11, 12, 1, 2, 3]: # Rabi (Winter)
        experts.append({"id": "seasonal", "name": "Wheat/Potato Expert", "model": "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"}) # Example
    else: # Zaid (Summer)
        experts.append({"id": "seasonal", "name": "Vegetable Expert", "model": "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"})
        
    return experts
