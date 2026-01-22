# Green Doctor Deployment Guide

This guide describes how to deploy the Green Doctor application, which consists of a FastAPI backend and a React Native (Expo) frontend.

## 1. Backend Deployment (Render)

We recommend using **Render** for the backend because it natively supports Docker and is free to start.

### Prerequisites
- A GitHub account.
- This project pushed to a GitHub repository.

### Steps
1.  **Sign up/Log in** to [Render](https://render.com/).
2.  Click **"New +"** and select **"Web Service"**.
3.  Connect your GitHub repository.
4.  Configure the service:
    - **Name**: `greendoctor-backend`
    - **Runtime**: **Docker** (Render should auto-detect the Dockerfile).
    - **Region**: Choose one close to you (e.g., Singapore or Frankfurt).
    - **Instance Type**: **Free** (or Starter for better performance).
5.  Click **"Create Web Service"**.
6.  Wait for the build to finish. Once deployed, copy the **Service URL** (e.g., `https://greendoctor-backend.onrender.com`).

---

## 2. Frontend Configuration

Before building the app, you need to tell the frontend where to find your live backend.

1.  Open `d:/antigravity leaf disease/GreenDoctor/services/mockAI.js` (or wherever your API URL is defined).
2.  Replace the local URL (`http://...:8000`) with your new Render URL.
    ```javascript
    // Example change
    // const API_URL = "http://192.168.1.5:8000";
    const API_URL = "https://greendoctor-backend.onrender.com"; 
    ```
3.  Commit and push this change to GitHub.

---

## 3. Frontend Deployment (Expo EAS)

Use Expo Application Services (EAS) to build the app for Android/iOS.

### Prerequisites
- EAS CLI installed: `npm install -g eas-cli` (You already have this).
- Expo account: Login with `eas login`.

### Steps to Build APK (Android)
1.  Run the build command:
    ```bash
    eas build -p android --profile preview
    ```
2.  Wait for the build to complete. EAS will provide a download link for the `.apk` file.
3.  Install this APK on your Android device to test.

### Steps to Publish/Update (Over-the-Air)
If you just changed JavaScript code (no new native libraries), you can update instantly:
```bash
eas update --branch preview --message "Updated backend URL"
```

---

## 4. Automatic Updates (CI/CD)

### Backend (Automatic)
Render has **Auto-Deploy** enabled by default.
1.  Whenever you push a change to your GitHub repository (`git push origin main`), Render will detect the commit.
2.  It automatically rebuilds your Docker container and redeploys your site.
3.  **Result**: Your backend updates automatically with every push.

### Frontend (Semi-Automatic)
For the mobile app, it depends on what you changed:

#### Type A: JavaScript/Styling Changes (Fast)
If you only changed `.js` files (screens, logic, colors):
- You don't need to re-download the APK.
- Run this command to push the update instantly to all users:
    ```bash
    eas update --branch preview --message "Description of changes"
    ```
- **Result**: The app on the user's phone will download the new code next time it opens.

#### Type B: Native Changes (Slow)
If you installed a new library (e.g., `expo-camera`) or changed `app.json` (icons, names):
- You **MUST** build a new APK:
    ```bash
    eas build -p android --profile preview
    ```
- **Result**: You must download and install the new APK manually.
