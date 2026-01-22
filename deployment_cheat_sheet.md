# Deployment Cheat Sheet

Use this quick reference whenever you want to update your app.

> **⚠️ Important**: You typically need **Git** installed to deploy the backend automatically. Since `git` was not found in your terminal, you might need to install it from [git-scm.com](https://git-scm.com/downloads) or use GitHub Desktop.

## 1. Backend Updates (Automatic)
**When:** You changed Python files (`app.py`, `backend/`), `requirements.txt`, or `Dockerfile`.

1.  **Save your changes.**
2.  **Push to GitHub:**
    *   **Option A (Terminal):**
        ```bash
        git add .
        git commit -m "Update backend"
        git push origin main
        ```
    *   **Option B (GitHub Desktop / Web):** Drag and drop your files to update your repository.
3.  **Done!** Go to your [Render Dashboard](https://dashboard.render.com/) to watch it update automatically.

---

## 2. Frontend Updates (Fast)
**When:** You changed JavaScript (`.js`), Screens, or Styles.

1.  **Open a new terminal.**
2.  **Run this command:**
    ```bash
    npx eas-cli update --branch preview --message "Small fix"
    ```
3.  **Done!** Users will see the change next time they restart the app.

---

## 3. Frontend Rebuild (Slow)
**When:** You added a new package (`npm install ...`) or changed `app.json`.

1.  **Open a new terminal.**
2.  **Run this command:**
    ```bash
    npx eas-cli build -p android --profile preview
    ```
3.  **Wait** for the link.
4.  **Download** and reinstall the APK on your phone.
