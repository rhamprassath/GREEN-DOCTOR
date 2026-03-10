# Green Doctor for Raspberry Pi

This folder contains scripts to run the Green Doctor AI locally on a Raspberry Pi.

## Prerequisites
- A Raspberry Pi 4 or 5 (recommended for real-time performance).
- Raspberry Pi OS (64-bit recommended).
- A USB Camera or Raspberry Pi Camera Module.
- A display (HDMI or touch screen).

## Installation

1. **Install System Dependencies**:
   ```bash
   sudo apt update
   sudo apt install -y python3-opencv libatlas-base-dev
   ```

2. **Install Python Libraries**:
   ```bash
   pip3 install numpy opencv-python
   # Install TFLite runtime (recommended for Pi)
   pip3 install tflite-runtime
   ```

## Running the App

### Option 1: Live Web Stream (Backend Style)
You can run the full backend server on the Pi to serve the mobile app:
```bash
cd backend
python3 app.py
```

### Option 2: Live Screen Detection (Streamlit - Recommended)
This provides a modern, interactive web interface. Highly recommended if you have a display connected or want to access the Pi from another computer on the network.

1. **Install Requirements**:
   ```bash
   pip3 install -r requirements_pi.txt
   ```

2. **Run Streamlit**:
   ```bash
   cd raspberry_pi
   streamlit run app_streamlit.py
   ```

### Option 3: Basic Real-Time Display (OpenCV)
Run this for a lightweight, native window experience:

```bash
cd raspberry_pi
python3 realtime_pi.py
```

## Troubleshooting
- **Camera Error**: Ensure the camera is enabled in `raspi-config`.
- **Performance**: If the frame rate is low, try reducing the camera resolution in `realtime_pi.py` or `app_streamlit.py`.
- **Model Path**: Ensure `backend/model.tflite` exists before running.
