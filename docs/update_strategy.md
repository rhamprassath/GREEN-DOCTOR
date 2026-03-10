# How to Update the App After Distribution

After farmers install your APK, there are **2 types of updates** you can make:

---

## 🔧 Type 1: Backend-Only Changes (Easy - No New APK Needed!)

If you only change the **backend AI logic**, farmers don't need to reinstall anything!

### What Counts as Backend-Only:
- ✅ Improving AI accuracy
- ✅ Adding new disease detection models
- ✅ Fixing bugs in the prediction logic
- ✅ Changing treatment recommendations in the database

### How to Update:
```powershell
# 1. Make changes to backend files (backend/app.py, etc.)
# 2. Commit and push
git add .
git commit -m "Improved AI accuracy for tomato diseases"
git push hf master

# That's it! Hugging Face auto-deploys in 2-3 minutes
# Farmers' apps will automatically use the new backend
```

**Result**: Farmers keep using the same APK, but they get the improved AI instantly! ✨

---

## 📱 Type 2: App UI/Feature Changes (Requires New APK)

If you change the **mobile app itself**, farmers need a new APK.

### What Counts as App Changes:
- ❌ Adding new screens (like a new "Weather Forecast" feature)
- ❌ Changing button layouts or colors
- ❌ Adding new translations
- ❌ Fixing UI bugs

### How to Update:

#### Step 1: Make Your Changes
Edit any files in `screens/`, `constants/`, etc.

#### Step 2: Update Version Number
Edit `app.json`:
```json
{
  "expo": {
    "version": "1.1.0",  // <-- Change from 1.0.0 to 1.1.0
    ...
  }
}
```

#### Step 3: Rebuild APK
```powershell
npx eas build -p android --profile preview
```

#### Step 4: Distribute New APK
- Download the new APK from the build link
- Share it with farmers via WhatsApp
- **Important**: Farmers must **uninstall the old app** and install the new one

---

## 🚀 Pro Tip: Over-The-Air (OTA) Updates

If you want farmers to get app updates **without reinstalling**, you can set up Expo's OTA updates:

### Enable OTA (One-Time Setup):
1. The app is already configured for OTA (see `app.json` - `updates` section)
2. When you make **small changes** (not native code), run:
   ```powershell
   eas update --branch production --message "Fixed Tamil translations"
   ```
3. Farmers' apps will download the update **automatically** next time they open it!

### OTA Limitations:
- ✅ Works for: JavaScript changes, UI tweaks, translations
- ❌ Doesn't work for: New native dependencies, permission changes

---

## 📊 Summary Table

| Change Type | Backend Update | New APK Needed | OTA Update |
|-------------|----------------|----------------|------------|
| AI Model Improvement | ✅ Yes | ❌ No | ❌ No |
| New Disease Added | ✅ Yes | ❌ No | ❌ No |
| UI Color Change | ❌ No | ✅ Yes | ✅ Yes (if OTA enabled) |
| New Screen Added | ❌ No | ✅ Yes | ✅ Yes (if OTA enabled) |
| New Permission Needed | ❌ No | ✅ Yes | ❌ No |

---

## 🎯 Recommended Workflow

1. **For AI/Backend fixes**: Just push to Hugging Face → Instant update
2. **For small UI changes**: Use OTA updates → Farmers get it automatically
3. **For major features**: Build new APK → Share via WhatsApp

This way, you minimize the number of times farmers need to reinstall! 🌿
