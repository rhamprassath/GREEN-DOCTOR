import requests
from PIL import Image
import io

# Create a small green image
img = Image.new('RGB', (224, 224), color = (0, 255, 0))
img_byte_arr = io.BytesIO()
img.save(img_byte_arr, format='JPEG')
img_byte_arr = img_byte_arr.getvalue()

print("Sending test image to /predict...")
try:
    response = requests.post(
        "http://localhost:10000/predict",
        files={"file": ("test.jpg", img_byte_arr, "image/jpeg")}
    )
    print("Response Status:", response.status_code)
    
    if response.status_code == 200:
        data = response.json()
        print("✓ Success!")
        print(f"  Class: {data.get('class', 'N/A')}")
        print(f"  Confidence: {data.get('confidence', 0)*100:.1f}%")
        print(f"  AI Details: {data.get('ai_details', 'N/A')}")
        print(f"  Status: {data.get('status', 'N/A')}")
    else:
        print("✗ Failed!")
        print("Data:", response.json())
except Exception as e:
    print("✗ Error:", e)
