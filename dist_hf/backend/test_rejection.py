import requests
from PIL import Image
import io
import time

BASE_URL = "http://localhost:8000" # Test locally first

def test_rejection(color, name):
    print(f"\n--- Testing {name} ({color}) ---")
    img = Image.new('RGB', (224, 224), color=color)
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()

    try:
        response = requests.post(
            f"{BASE_URL}/predict",
            files={"file": ("test.jpg", img_byte_arr, "image/jpeg")}
        )
        if response.status_code == 200:
            data = response.json()
            print(f"Result: {data.get('class')}")
            print(f"Details: {data.get('ai_details')}")
        else:
            print(f"Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Request failed: {e}")

# Color tests
# White (Non-plant)
test_rejection((255, 255, 255), "Pure White")
# Blue (Non-plant)
test_rejection((0, 0, 255), "Pure Blue")
# Bright Green (Likely Plant)
test_rejection((34, 139, 34), "Forest Green")
