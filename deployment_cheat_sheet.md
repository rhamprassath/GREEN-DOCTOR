# Deployment Cheat Sheet

Use this quick reference whenever you want to update your app.

> **⚠️ Important**: You typically need **Git** installed to deploy the backend automatically. Since `git` was not found in your terminal, you might need to install it from [git-scm.com](https://git-scm.com/downloads) or use GitHub Desktop.

> **🏁 Professional Workflow**: Use `git sync-all` to push to both GitHub and Hugging Face simultaneously.

## 1. Backend Updates (Hugging Face)
**When:** You want better performance (16GB RAM).

1.  Create a **Space** on Hugging Face (Docker).
2.  Connect GitHub or upload `backend/` and `Dockerfile`.
3.  Add `app_port: 10000` to your Space's `README.md` metadata.
4.  Copy the URL (e.g., `https://user-space.hf.space`) and update `mockAI.js`.

---

## 2. Backend Updates (Render)
**When:** You changed Python files, `requirements.txt`, or `Dockerfile`.

1.  **Save your changes.**
2.  **Push to GitHub.**
3.  **Done!** Watch it update on your [Render Dashboard](https://dashboard.render.com/).

---

## 3. Frontend Updates (Fast)
**When:** You changed JavaScript code.

1.  **Run:** `npx eas-cli update --branch preview --message "Small fix"`
2.  **Done!** App updates instantly.

---

## 4. Frontend Rebuild (Slow)
**When:** You added a new package or changed `app.json`.

1.  **Run:** `npx eas-cli build -p android --profile preview`
2.  **Install** the new APK from the link provided.
