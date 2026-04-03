from datetime import datetime

def get_seasonal_experts():
    # Only load the two most reliable models
    # 1. Plant Disease Specialist (The 'Good' model from a month ago)
    # 2. Pest & Insect Detector (Essential for crop protection)
    experts = [
        {"id": "specialist", "name": "Plant Health Specialist", "model": "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification"},
        {"id": "pest", "name": "Entomology Expert", "model": "dennisjnr/insect-classification"}
    ]
    
    return experts
