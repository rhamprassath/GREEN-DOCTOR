import requests
import sys

URL = "https://rhamprassath-greendoctor-backend.hf.space/predict"
IMAGE_PATH = "C:/Users/rhamp/.gemini/antigravity/brain/bb0c56fa-8248-4732-a0f4-92047c5a6c81/media__1775121571543.png"

try:
    with open(IMAGE_PATH, 'rb') as f:
        files = {'file': ('image.png', f, 'image/png')}
        print(f"Sending POST request to {URL}...")
        response = requests.post(URL, files=files, timeout=30)
        
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")

except Exception as e:
    print(f"Error: {e}")
