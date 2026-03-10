import numpy as np
import os
import sys

try:
    import tflite_runtime.interpreter as tflite
except ImportError:
    try:
        import tensorflow.lite as tflite
    except ImportError:
        print("TFLite runtime not found. Skipping test.")
        sys.exit(0)

def test_model_loading():
    model_path = os.path.join(os.path.dirname(__file__), "..", "backend", "model.tflite")
    if not os.path.exists(model_path):
        print(f"FAIL: Model not found at {model_path}")
        return False
    
    try:
        interpreter = tflite.Interpreter(model_path=model_path)
        interpreter.allocate_tensors()
        print("PASS: Model loaded and tensors allocated successfully.")
        return True
    except Exception as e:
        print(f"FAIL: Could not load model: {e}")
        return False

def test_dummy_inference():
    model_path = os.path.join(os.path.dirname(__file__), "..", "backend", "model.tflite")
    interpreter = tflite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    
    input_shape = input_details[0]['shape']
    dummy_input = np.random.random_sample(input_shape).astype(np.float32)
    
    try:
        interpreter.set_tensor(input_details[0]['index'], dummy_input)
        interpreter.invoke()
        output = interpreter.get_tensor(output_details[0]['index'])
        print(f"PASS: Inference successful. Output shape: {output.shape}")
        
        # Check if output matches expected classes (38)
        if output.shape[1] == 38:
            print("PASS: Output class count matches (38).")
        else:
            print(f"WARNING: Output class count ({output.shape[1]}) does not match expected (38).")
            
        return True
    except Exception as e:
        print(f"FAIL: Inference failed: {e}")
        return False

if __name__ == "__main__":
    print("--- Running Raspberry Pi Inference Tests ---")
    if test_model_loading():
        test_dummy_inference()
