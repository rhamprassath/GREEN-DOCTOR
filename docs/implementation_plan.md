# Finalizing App for Farmer Distribution

This plan outlines the steps to move from a development environment to a "real-time" app that can be installed on farmers' phones.

## User Review Required

> [!IMPORTANT]
> To share the app with farmers, we will generate an **APK file**. This file can be shared via WhatsApp or Bluetooth and installed directly on any Android phone.

## Proposed Changes

### [Component Name] Backend Deployment
Ensure the AI backend is live on Hugging Face Spaces.

#### [MODIFY] [aiService.js](file:///d:/antigravity%20leaf%20disease/GreenDoctor/services/aiService.js)
- Verify the `BACKEND_API_URL` is pointing to the final production URL.

### [Component Name] Frontend Build
Generate the distribution-ready APK.

#### [ACTION] Build Command
Run the following command in your terminal to create the APK:
```powershell
npx eas build -p android --profile preview
```

## Verification Plan

### Manual Verification
1. **Build Success**: Monitor the EAS build progress and download the resulting `.apk` file.
2. **Installation**: Install the APK on a physical Android device.
3. **Real-time Scan**: Test the scan feature while connected to mobile data to ensure it reaches the Hugging Face backend.
