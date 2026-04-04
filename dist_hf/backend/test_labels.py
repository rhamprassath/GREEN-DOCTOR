from transformers import AutoConfig

try:
    print("Checking Generalist (ViT)...")
    config1 = AutoConfig.from_pretrained("wambugu71/crop_leaf_diseases_vit")
    print(list(config1.id2label.values()))
except Exception as e:
    print("Error Gen:", e)

print("-" * 50)

try:
    print("Checking Specialist (MobileNet)...")
    config2 = AutoConfig.from_pretrained("linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification")
    print(list(config2.id2label.values()))
except Exception as e:
    print("Error Spec:", e)
