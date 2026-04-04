from datetime import datetime

def get_seasonal_experts():
    experts = [
        {"id": "generalist", "name": "Generalist Expert", "model": "wambugu71/crop_leaf_diseases_vit"},
        {"id": "specialist", "name": "Plant Health Specialist", "model": "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"}
    ]
    return experts
