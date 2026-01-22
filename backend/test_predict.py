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
        "http://localhost:8000/predict",
        files={"file": ("test.jpg", img_byte_arr, "image/jpeg")}
    )
    print("Response:", response.status_code)
    print("Data:", response.json())
except Exception as e:
    print("Error:", e)
