# How to Update Backend Changes

Since we removed the Heatmap and Soil Health features, you need to push these changes to your Hugging Face backend.

## 🚀 Quick Update Steps

### 1. Navigate to Backend Directory
```powershell
cd "d:\antigravity leaf disease\GreenDoctor"
```

### 2. Check What Changed
```powershell
git status
```

You should see modified files:
- `backend/app.py` (removed `/heatmap` and `/analyze-soil` endpoints)
- `screens/HomeScreen.js` (removed UI buttons)
- `App.js` (removed screen imports)

### 3. Stage All Changes
```powershell
git add .
```

### 4. Commit Changes
```powershell
git commit -m "Remove Heatmap and Soil Health features - focus on core disease detection"
```

### 5. Push to Hugging Face (Backend Auto-Deploys)
```powershell
git push hf main
```

### 6. Verify Backend is Updated
Wait 2-3 minutes, then visit:
https://rhamprassath-greendoctor-backend.hf.space/

You should see the backend restart with the cleaned-up code.

---

## 📱 For Future App Updates

After you've distributed the APK to farmers, if you make changes:

1. **Update the code** (like we just did)
2. **Rebuild the APK**: `npx eas build -p android --profile preview`
3. **Share the new APK** with farmers

> **Note**: Farmers will need to uninstall the old version and install the new APK manually, unless you set up OTA (Over-The-Air) updates with Expo.
