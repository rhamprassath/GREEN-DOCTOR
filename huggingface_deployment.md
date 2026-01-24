# Hugging Face Spaces Deployment Guide

Hugging Face Spaces is an excellent alternative to Render for hosting AI-powered backends. It offers a generous free tier and is specifically designed for machine learning applications.

## 1. Why Hugging Face Spaces?

- **Generous Free Tier**: 16GB RAM and 2 vCPUs for free (CPU-basic).
- **Docker Support**: Uses your existing `Dockerfile`.
- **Built for AI**: Excellent performance for running models like the ones used in Green Doctor.

## 2. Prerequisites

- A [Hugging Face](https://huggingface.co/) account.
- Your project pushed to a GitHub repository OR ready to upload files.

## 3. Step-by-Step Setup

1.  **Create a New Space**:
    - Go to [huggingface.co/new-space](https://huggingface.co/new-space).
    - **Name**: `greendoctor-backend`.
    - **SDK**: Select **Docker**.
    - **Template**: Choose **Blank**.
    - **Visibility**: Public (or Private if you have a PRO account).
    - **License**: Apache 2.0 (recommended).

2.  **Add Your Code**:
    - You can either connect your GitHub repository or upload files directly.
    - Hugging Face will look for a `Dockerfile` in the root directory.

3.  **Port Configuration**:
    - Hugging Face Spaces default to port **7860**.
    - Your current `Dockerfile` uses port **10000**.
    - To fix this, you have two options:
        - **Option A**: Edit your `Dockerfile` to use port `7860`.
        - **Option B**: Add a `README.md` to your Space root with the following metadata:
          ```yaml
          ---
          title: GreenDoctor Backend
          emoji: 🌿
          colorFrom: green
          colorTo: leaf
          sdk: docker
          app_port: 10000
          ---
          ```

4.  **Environment Variables**:
    - Go to **Settings** > **Variables and secrets**.
    - Add `RENDER=true` (this tells your app it's in a production environment).

5.  **Build and Deploy**:
    - Once you commit your code (or push to the connected repo), Hugging Face will automatically start building the Docker image.
    - You can track progress in the **Logs** tab.

## 4. Getting Your Backend URL

Once deployed, your backend will be available at:
`https://<username>-<space-name>.hf.space`

**Example**: `https://johndoe-greendoctor-backend.hf.space`

## 5. Update Frontend

Don't forget to update the `API_URL` in your frontend code (e.g., `services/api.js` or `services/mockAI.js`) and redeploy your mobile app via Expo.
