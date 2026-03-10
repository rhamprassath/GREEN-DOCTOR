import requests
from PIL import Image
import io

def test_backend():
    url = "https://rhamprassath-greendoctor-backend.hf.space/predict"
    
    # Create a simple green image (Leaf-like)
    img = Image.new('RGB', (224, 224), color = (34, 139, 34)) # Forest Green
    
    # Save to buffer
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_byte_arr.seek(0)
    
    files = {'file': ('test.jpg', img_byte_arr, 'image/jpeg')}
    
    try:
        print(f"Sending request to {url}...")
        response = requests.post(url, files=files)
        print(f"Status: {response.status_code}")
        print("Raw Response:")
        print(response.text)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_backend()
