# OTA (Over-The-Air) Updates Guide

OTA updates let you push **JavaScript changes** to farmers' phones **without them reinstalling the APK**!

---

## ✅ What's Already Configured

Your app is **ready for OTA updates**! I've added the update channels to `eas.json`.

### How It Works:
1. Farmers install the APK once
2. You make changes to UI, screens, or logic
3. You publish an update: `eas update --channel production`
4. Next time farmers open the app, it **automatically downloads** the update in the background
5. The update applies on the **next app restart**

---

## 🚀 How to Publish OTA Updates

### Scenario 1: Fix a UI Bug
```powershell
# 1. Make your changes (e.g., fix a button color in HomeScreen.js)

# 2. Publish the update
eas update --channel production --message "Fixed home button color"

# 3. That's it! Farmers get it automatically
```

### Scenario 2: Add New Translation
```powershell
# 1. Edit constants/translations.js

# 2. Publish
eas update --channel production --message "Added new Tamil translations"
```

### Scenario 3: Update Treatment Recommendations
```powershell
# 1. Edit constants/diseases.js

# 2. Publish
eas update --channel production --message "Updated tomato blight treatment"
```

---

## ⚡ What Can Be Updated via OTA?

### ✅ YES - These Work with OTA:
- JavaScript code changes
- UI layout changes (screens, buttons, colors)
- Text and translations
- Disease database updates
- Treatment recommendations
- Navigation changes
- Most bug fixes

### ❌ NO - These Need New APK:
- Adding new native dependencies (npm packages with native code)
- Changing app permissions (camera, location)
- Updating Expo SDK version
- Changing app icon or splash screen

---

## 📱 Farmer Experience

When you publish an OTA update:

1. **Farmer opens app** → App checks for updates in background
2. **Update found** → Downloads silently (usually < 1 MB)
3. **Next time they open app** → New version loads automatically!

**No notification, no reinstall, completely seamless!** ✨

---

## 🔍 How to Check Update Status

### View Published Updates:
```powershell
eas update:list --branch production
```

### View Update Details:
```powershell
eas update:view [update-id]
```

---

## 🎯 Best Practices

### 1. Test Before Publishing
```powershell
# Publish to preview channel first
eas update --channel preview --message "Testing new feature"

# Install preview APK on your test phone
# Test thoroughly
# Then publish to production
eas update --channel production --message "New feature tested and ready"
```

### 2. Use Descriptive Messages
```powershell
# ❌ Bad
eas update --channel production --message "update"

# ✅ Good
eas update --channel production --message "Fixed calculator crash for large acreage values"
```

### 3. Version Your Updates
Keep track in your commit messages:
```powershell
git commit -m "v1.0.1 - Fixed Tamil font rendering"
eas update --channel production --message "v1.0.1 - Fixed Tamil font rendering"
```

---

## 🆘 Rollback if Something Goes Wrong

If an update causes issues:

```powershell
# 1. View recent updates
eas update:list --branch production

# 2. Rollback to previous version
eas update:rollback --branch production
```

---

## 📊 When to Use OTA vs New APK

| Scenario | Use OTA | Use New APK |
|----------|---------|-------------|
| Fixed button alignment | ✅ | ❌ |
| Updated disease info | ✅ | ❌ |
| Changed colors/fonts | ✅ | ❌ |
| Added new screen | ✅ | ❌ |
| Added camera permission | ❌ | ✅ |
| Upgraded Expo SDK | ❌ | ✅ |
| Added native library | ❌ | ✅ |

---

## 🎬 Quick Start Commands

```powershell
# Publish update to farmers
eas update --channel production --message "Your update description"

# Check what's published
eas update:list --branch production

# Rollback if needed
eas update:rollback --branch production
```

---

## 💡 Pro Tip: Update Workflow

1. **Make changes** to your code
2. **Test locally** with `npx expo start`
3. **Commit changes**: `git commit -m "Fixed bug"`
4. **Push to GitHub**: `git push origin master`
5. **Publish OTA**: `eas update --channel production --message "Fixed bug"`

Farmers get the update within minutes! 🚀
