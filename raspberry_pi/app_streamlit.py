import streamlit as st
import cv2
import numpy as np
import os
import sys

# Try to import TFLite runtime
try:
    import tflite_runtime.interpreter as tflite
except ImportError:
    try:
        import tensorflow.lite as tflite
    except ImportError:
        st.error("TFLite runtime not found. Please install tflite-runtime.")
        st.stop()

# --- Page Config ---
st.set_page_config(page_title="Green Doctor AI - Real Time", layout="wide")
st.title("🍃 Green Doctor: Real-Time Plant Health Monitor")
st.markdown("---")

# --- Model Loading ---
@st.cache_resource
def load_interpreter():
    model_path = os.path.join(os.path.dirname(__file__), "..", "backend", "model.tflite")
    if not os.path.exists(model_path):
        st.error(f"Model file not found at {model_path}")
        return None
    
    interpreter = tflite.Interpreter(model_path=model_path)
    interpreter.allocate_tensors()
    return interpreter

def load_labels():
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

# --- UI Layout ---
col1, col2 = st.columns([2, 1])

with col1:
    st.subheader("Live Feed")
    frame_placeholder = st.empty()

with col2:
    st.subheader("Detection Results")
    res_placeholder = st.empty()
    conf_placeholder = st.empty()
    status_placeholder = st.empty()

# --- Main Logic ---
interpreter = load_interpreter()
if interpreter:
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    input_shape = input_details[0]['shape']
    height, width = input_shape[1], input_shape[2]
    labels = load_labels()

    # Camera Control
    run_cam = st.toggle("Enable Camera", value=True)
    cap = cv2.VideoCapture(0)

    while run_cam:
        ret, frame = cap.read()
        if not ret:
            st.warning("Failed to access camera.")
            break

        # 1. Preprocess
        img = cv2.resize(frame, (width, height))
        img = img.astype(np.float32) / 255.0
        input_data = np.expand_dims(img, axis=0)

        # 2. Predict
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()
        output_data = interpreter.get_tensor(output_details[0]['index'])
        
        pred_idx = np.argmax(output_data[0])
        confidence = output_data[0][pred_idx]
        
        # 3. UI Update
        label = "Searching..."
        color = "white"
        
        if confidence > 0.4:
            label = labels[pred_idx]
            color = "green" if "Healthy" in label else "red"
        
        # Display frame
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame_placeholder.image(frame_rgb, channels="RGB")
        
        # Display Stats
        res_placeholder.markdown(f"### Diagnosis: **:{color}[{label}]**")
        conf_placeholder.progress(float(confidence), text=f"Confidence: {confidence*100:.1f}%")
        
        if color == "green":
             status_placeholder.success("Plant looks healthy!")
        elif color == "red":
             status_placeholder.error("Warning: Disease potential detected.")

    cap.release()
else:
    st.error("Could not load AI engine.")
