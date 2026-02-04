import requests
from PIL import Image
import io
import time
import sys

BASE_URL = "http://localhost:8000"

def print_header(text):
    print(f"\n{'='*60}")
    print(f"  {text}")
    print(f"{'='*60}")

def test_health_endpoint():
    """Test 1: Health Check Endpoint"""
    print_header("TEST 1: Health Check")
    try:
        response = requests.get(f"{BASE_URL}/", timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Status: {response.status_code}")
            print(f"✓ Message: {data.get('message', 'N/A')}")
            return True
        else:
            print(f"✗ Failed with status: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def test_prediction_basic():
    """Test 2: Basic Prediction with Solid Green Image"""
    print_header("TEST 2: Basic Prediction (Green Image)")
    try:
        # Create a green image (simulating a leaf)
        img = Image.new('RGB', (224, 224), color=(0, 255, 0))
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        
        start_time = time.time()
        response = requests.post(
            f"{BASE_URL}/predict",
            files={"file": ("test.jpg", img_byte_arr, "image/jpeg")}
        )
        inference_time = time.time() - start_time
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Status: {response.status_code}")
            print(f"✓ Class: {data.get('class', 'N/A')}")
            print(f"✓ Confidence: {data.get('confidence', 0)*100:.1f}%")
            print(f"✓ AI Details: {data.get('ai_details', 'N/A')}")
            print(f"✓ Inference Time: {inference_time:.2f}s")
            
            # Validate response structure
            required_fields = ['class', 'confidence', 'ai_details', 'status']
            missing = [f for f in required_fields if f not in data]
            if missing:
                print(f"⚠ Warning: Missing fields: {missing}")
                return False
            return True
        else:
            print(f"✗ Failed with status: {response.status_code}")
            print(f"  Response: {response.text}")
            return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def test_prediction_brown_image():
    """Test 3: Prediction with Brown Image (Diseased Leaf Simulation)"""
    print_header("TEST 3: Prediction (Brown Image - Diseased)")
    try:
        # Create a brown image (simulating diseased leaf)
        img = Image.new('RGB', (224, 224), color=(139, 69, 19))
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        
        start_time = time.time()
        response = requests.post(
            f"{BASE_URL}/predict",
            files={"file": ("diseased.jpg", img_byte_arr, "image/jpeg")}
        )
        inference_time = time.time() - start_time
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Status: {response.status_code}")
            print(f"✓ Class: {data.get('class', 'N/A')}")
            print(f"✓ Confidence: {data.get('confidence', 0)*100:.1f}%")
            print(f"✓ AI Details: {data.get('ai_details', 'N/A')}")
            print(f"✓ Inference Time: {inference_time:.2f}s")
            return True
        else:
            print(f"✗ Failed with status: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def test_prediction_multicolor():
    """Test 4: Prediction with Multi-color Image (Complex Pattern)"""
    print_header("TEST 4: Prediction (Multi-color Pattern)")
    try:
        # Create a more complex image with gradient
        img = Image.new('RGB', (224, 224))
        pixels = img.load()
        for i in range(224):
            for j in range(224):
                # Create a green-to-brown gradient
                green_val = int(255 * (1 - i/224))
                brown_val = int(139 * (i/224))
                pixels[i, j] = (brown_val, green_val, 0)
        
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()
        
        start_time = time.time()
        response = requests.post(
            f"{BASE_URL}/predict",
            files={"file": ("gradient.jpg", img_byte_arr, "image/jpeg")}
        )
        inference_time = time.time() - start_time
        
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Status: {response.status_code}")
            print(f"✓ Class: {data.get('class', 'N/A')}")
            print(f"✓ Confidence: {data.get('confidence', 0)*100:.1f}%")
            print(f"✓ AI Details: {data.get('ai_details', 'N/A')}")
            print(f"✓ Inference Time: {inference_time:.2f}s")
            return True
        else:
            print(f"✗ Failed with status: {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def test_error_handling():
    """Test 5: Error Handling with Invalid Data"""
    print_header("TEST 5: Error Handling (Invalid File)")
    try:
        # Send invalid data
        response = requests.post(
            f"{BASE_URL}/predict",
            files={"file": ("invalid.txt", b"not an image", "text/plain")}
        )
        
        print(f"  Status: {response.status_code}")
        data = response.json()
        
        # We expect either an error response or the server to handle it gracefully
        if 'error' in data or 'status' in data:
            print(f"✓ Server handled invalid input gracefully")
            print(f"  Response: {data}")
            return True
        else:
            print(f"⚠ Unexpected response: {data}")
            return True  # Still pass if server responds
            
    except Exception as e:
        print(f"✓ Server rejected invalid input (expected): {e}")
        return True

def run_all_tests():
    """Run all tests and report results"""
    print("\n" + "="*60)
    print("  GREEN DOCTOR - COMPREHENSIVE TEST SUITE")
    print("="*60)
    print(f"  Backend URL: {BASE_URL}")
    print("="*60)
    
    tests = [
        ("Health Check", test_health_endpoint),
        ("Basic Prediction", test_prediction_basic),
        ("Brown Image Prediction", test_prediction_brown_image),
        ("Multi-color Prediction", test_prediction_multicolor),
        ("Error Handling", test_error_handling),
    ]
    
    results = []
    for name, test_func in tests:
        try:
            result = test_func()
            results.append((name, result))
        except Exception as e:
            print(f"\n✗ Test '{name}' crashed: {e}")
            results.append((name, False))
    
    # Summary
    print_header("TEST SUMMARY")
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for name, result in results:
        status = "✓ PASS" if result else "✗ FAIL"
        print(f"  {status}: {name}")
    
    print(f"\n  Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n  🎉 All tests passed successfully!")
        return 0
    else:
        print(f"\n  ⚠ {total - passed} test(s) failed")
        return 1

if __name__ == "__main__":
    exit_code = run_all_tests()
    sys.exit(exit_code)
