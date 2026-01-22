from transformers import pipeline
import os

# Allow insecure downloads if needed (trying to match app.py env)
os.environ["TORCH_FORCE_WEIGHTS_ONLY_LOAD"] = "0"

def download_models():
    print("Downloading General Expert (Swin Transformer)...")
    try:
        pipeline("image-classification", model="microsoft/swin-tiny-patch4-window7-224")
        print("General Expert Downloaded!")
    except Exception as e:
        print(f"General Expert Failed: {e}")

    print("Downloading Rice Expert (ViT)...")
    try:
        pipeline("image-classification", model="wambugu71/crop_leaf_diseases_vit")
        print("Rice Expert Downloaded!")
    except Exception as e:
        print(f"Rice Expert Failed: {e}")

if __name__ == "__main__":
    download_models()
