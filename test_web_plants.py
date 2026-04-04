import requests
import os

TEST_IMAGES = {
    "Tomato_Septoria": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Septoriaphotos_011.jpg/800px-Septoriaphotos_011.jpg",
    "Potato_Blight": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Potato_blight.jpg/800px-Potato_blight.jpg",
    "Apple_Scab": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Apple_scab.jpg",
    "Corn_Rust": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Rust_on_corn_leaf.jpg/800px-Rust_on_corn_leaf.jpg",
}

API_URL = "https://rhamprassath-greendoctor-backend.hf.space/predict"

def verify_all_plants():
    print("🌍 Downloading & Testing Web Images against HuggingFace Engine...")
    print("-" * 60)
    for name, url in TEST_IMAGES.items():
        try:
            print(f"Downloading {name} from {url[:50]}...")
            img_data = requests.get(url, timeout=10).content
            
            # Post to HuggingFace
            print(f"🧪 Testing {name} on HuggingFace Space...")
            files = {'file': (f'{name}.jpg', img_data, 'image/jpeg')}
            response = requests.post(API_URL, files=files, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                print(f"✅ RESULT for {name}:")
                print(f"   ► Class: {result.get('class')}")
                print(f"   ► Confidence: {result.get('confidence', 0)*100:.1f}%")
                print(f"   ► AI Engine: {result.get('ai_details')}")
            else:
                print(f"❌ FAILED for {name}: {response.status_code} - {response.text}")
                
        except Exception as e:
            print(f"⚠️ Error testing {name}: {e}")
        print("-" * 60)

if __name__ == "__main__":
    verify_all_plants()
