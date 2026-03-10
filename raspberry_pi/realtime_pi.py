import cv2
import numpy as np
import os
import sys

# Try to import TFLite runtime, fallback to full tensorflow if needed
try:
    import tflite_runtime.interpreter as tflite
except ImportError:
    try:
        import tensorflow.lite as tflite
    except ImportError:
        print("Error: TFLite runtime not found. Please install tflite-runtime.")
        sys.exit(1)

def load_labels():
    """
    Labels from the PlantVillage dataset used in the model.
    Matches the mapping in backend/app.py
    """
    return [
        "Apple - Scab", "Apple - Black Rot", "Apple - Cedar Rust", "Apple - Healthy",
        "Blueberry - Healthy", "Cherry - Powdery Mildew", "Cherry - Healthy",
        "Corn - Gray Leaf Spot", "Corn - Common Rust", "Corn - Leaf Blight", "Corn - Healthy",
        "Grape - Black Rot", "Grape - Black Measles", "Grape - Leaf Blight", "Grape - Healthy",
        "Orange - Huanglongbing", "Peach - Bacterial Spot", "Peach - Healthy",
        "Pepper - Bacterial Spot", "Pepper - Healthy", "Potato - Early Blight",
        "Potato - Late Blight", "Potato - Healthy", "Raspberry - Healthy",
        "Soybean - Healthy", "Squash - Powdery Mildew", "Strawberry - Leaf Scorch",
        "Strawberry - Healthy", "Tomato - Bacterial Spot", "Tomato - Early Blight",
        "Tomato - Late Blight", "Tomato - Leaf Mold", "Tomato - Septoria Spot",
        "Tomato - Spider Mite", "Tomato - Target Spot", "Tomato - Yellow Leaf Curl",
        "Tomato - Mosaic Virus", "Tomato - Healthy"
    ]

def main():
    # 1. Load Model
    model_path = os.path.join(os.path.dirname(__file__), "..", "backend", "model.tflite")
    if not os.path.exists(model_path):
        print(f"Error: Model file not found at {model_path}")
        return

    interpreter = tflite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()

    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    
    # Assuming input size is 224x224 based on MobilenetV2 defaults
    input_shape = input_details[0]['shape']
    height, width = input_shape[1], input_shape[2]
    
    labels = load_labels()

    # 2. Initialize Camera
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open camera.")
        return

    print("--- Green Doctor Real-Time Detection ---")
    print("Starting video stream... Press 'q' to quit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # 3. Preprocess Frame
        # Resize to model input size
        img = cv2.resize(frame, (width, height))
        # Convert to float32 and normalize if necessary (MobileNetV2 usually expects [0, 1] or [-1, 1])
        # Based on training script ImageDataGenerator(rescale=1./255)
        img = img.astype(np.float32) / 255.0
        # Add batch dimension
        input_data = np.expand_dims(img, axis=0)

        # 4. Run Inference
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])
        
        # 5. Process Results
        pred_idx = np.argmax(output_data[0])
        confidence = output_data[0][pred_idx]
        
        label = "Unknown"
        if confidence > 0.4: # Simple threshold
            if pred_idx < len(labels):
                label = labels[pred_idx]
        
        # 6. UI Overlay
        color = (0, 255, 0) if "Healthy" in label else (0, 0, 255)
        if label == "Unknown" or confidence < 0.4:
            color = (255, 255, 255)
            text = "Searching for leaf..."
        else:
            text = f"{label} ({confidence*100:.1f}%)"

        cv2.putText(frame, text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)
        cv2.imshow("Green Doctor AI - Real-Time", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Cleanup
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
