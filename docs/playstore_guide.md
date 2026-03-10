# Google Play Store Publishing Guide

This guide will help you publish **Green Doctor** to the Google Play Store so farmers can download it like any other app.

---

## 📋 Prerequisites

### 1. Google Play Console Account
- **Cost**: $25 USD (one-time registration fee)
- **URL**: https://play.google.com/console/signup
- **Payment**: Credit/Debit card required
- **Verification**: Takes 1-2 days for Google to verify your account

### 2. Required Assets
You'll need to prepare these before submission:

#### App Icon (Already Done ✅)
- Your `assets/logo.png` is ready

#### Screenshots (Need to Create)
- **Minimum**: 2 screenshots
- **Recommended**: 4-8 screenshots
- **Size**: 1080x1920 pixels (phone screenshots)
- **Content**: Show key features (scanning, results, calculator, etc.)

#### Feature Graphic
- **Size**: 1024x500 pixels
- **Content**: Banner image with app name and tagline

---

## 🚀 Step-by-Step Publishing Process

### Phase 1: Prepare Production Build

#### Step 1: Update App Configuration

Edit `app.json`:
```json
{
  "expo": {
    "version": "1.0.0",  // Keep this for first release
    "android": {
      "versionCode": 1,  // Add this - increment for each update
      "package": "com.rhamprassath.GreenDoctor"
    }
  }
}
```

#### Step 2: Build Production AAB (Android App Bundle)

```powershell
# Build for Play Store (AAB format, not APK)
npx eas build -p android --profile production
```

**Why AAB instead of APK?**
- Play Store requires AAB format
- Smaller download size for users
- Automatic optimization for different devices

**Build Time**: 10-15 minutes

---

### Phase 2: Create Play Store Listing

#### Step 1: Sign in to Play Console
1. Go to https://play.google.com/console
2. Click "Create app"
3. Fill in basic details:
   - **App name**: Green Doctor - Plant Disease AI
   - **Default language**: English (United States)
   - **App or game**: App
   - **Free or paid**: Free

#### Step 2: Fill Store Listing

**Short description** (80 characters max):
```
AI-powered plant disease detection for farmers. Scan leaves, get instant diagnosis.
```

**Full description** (4000 characters max):
```
🌿 Green Doctor - Your AI Farming Assistant

Green Doctor uses advanced artificial intelligence to help farmers identify plant diseases instantly. Simply take a photo of a leaf, and our AI will diagnose the problem and suggest treatments.

✨ KEY FEATURES:
• 📷 Instant Disease Detection - Scan any leaf with your camera
• 🤖 AI-Powered Analysis - Trained on 50+ plant diseases
• 🌾 Multi-Crop Support - Tomato, Potato, Paddy, Corn, and more
• 🗣️ Tamil & English - Full bilingual support
• 📊 Treatment Calculator - Get exact dosage for your land area
• 📜 Government Schemes - Access farming subsidies and programs
• 📈 Scan History - Track your farm's health over time

🎯 PERFECT FOR:
• Small-scale farmers
• Agricultural students
• Home gardeners
• Agricultural extension workers

🔬 HOW IT WORKS:
1. Open the app and select your language
2. Take a photo of the affected leaf
3. Get instant AI diagnosis
4. View treatment recommendations
5. Calculate exact remedy quantities

💡 SUPPORTED CROPS:
Tomato, Potato, Paddy (Rice), Corn, Pepper, Grape, Apple, Cherry, Peach, Strawberry, and many more!

🌍 OFFLINE CAPABLE:
Works even with limited internet connectivity

🆓 100% FREE:
No subscriptions, no hidden costs, no ads

Made with ❤️ for Indian farmers by ACGCET & UBA
```

#### Step 3: Upload Assets

**App Icon**:
- Upload: `assets/logo.png` (512x512 minimum)

**Screenshots** (You need to create these):
1. **Home Screen** - Show the main interface
2. **Scanner Screen** - Show camera scanning a leaf
3. **Results Screen** - Show diagnosis results
4. **Calculator Screen** - Show dosage calculator
5. **Tamil Language** - Show Tamil interface

**Feature Graphic**:
- Create a 1024x500 banner with:
  - App logo
  - Text: "Green Doctor - AI Plant Disease Detection"
  - Green agricultural theme

#### Step 4: Categorization

- **App category**: Productivity
- **Tags**: farming, agriculture, AI, plant disease, crop health
- **Content rating**: Everyone
- **Target audience**: Adults (18+)

---

### Phase 3: App Content & Privacy

#### Step 1: Privacy Policy (Required)

You need a privacy policy URL. Here's a template:

**Create a simple privacy policy** at https://www.privacypolicygenerator.info/

**Key points to include**:
- App collects location data (for disease mapping)
- App uses camera (for leaf scanning)
- Data is sent to AI backend for analysis
- No personal information is collected
- No data is sold to third parties

**Host it**: Use GitHub Pages or Google Sites (free)

#### Step 2: Data Safety

Declare what data you collect:
- ✅ Location data (approximate) - for disease mapping
- ✅ Photos - for AI analysis
- ❌ Personal information - NOT collected
- ❌ Financial information - NOT collected

#### Step 3: Content Rating

Answer Google's questionnaire:
- Violence: None
- Sexual content: None
- Language: None
- Controlled substances: None
- **Result**: Rated "Everyone"

---

### Phase 4: Upload & Release

#### Step 1: Upload AAB File

1. Go to "Production" → "Create new release"
2. Upload the `.aab` file from your EAS build
3. Add release notes:

```
Version 1.0.0 - Initial Release

✨ Features:
• AI-powered plant disease detection
• Support for 50+ diseases across multiple crops
• Tamil and English language support
• Dosage calculator for precise treatment
• Government schemes directory
• Scan history tracking

🌾 Perfect for farmers, gardeners, and agricultural students!
```

#### Step 2: Set Countries

- **Recommended**: Start with India only
- **Later**: Expand to other countries

#### Step 3: Review & Publish

1. Click "Review release"
2. Fix any warnings (if any)
3. Click "Start rollout to Production"

**Review Time**: 1-7 days (usually 2-3 days)

---

## 📱 After Publishing

### Farmers Can Now:
1. Open Google Play Store
2. Search "Green Doctor Plant Disease"
3. Click "Install"
4. Start using immediately!

### You Can:
- See download statistics
- Read user reviews
- Push updates via Play Store
- Use OTA updates for quick fixes

---

## 🔄 How to Update After Publishing

### For Small Changes (OTA):
```powershell
eas update --channel production --message "Fixed bug"
```
Users get update automatically!

### For Major Updates (New Version):
```powershell
# 1. Update version in app.json
{
  "version": "1.1.0",
  "android": {
    "versionCode": 2  // Increment this
  }
}

# 2. Build new AAB
npx eas build -p android --profile production

# 3. Upload to Play Console
# Go to Production → Create new release → Upload new AAB
```

---

## 💰 Cost Breakdown

| Item | Cost | Frequency |
|------|------|-----------|
| Google Play Developer Account | $25 USD | One-time |
| Expo EAS Build Service | Free (limited) | Monthly |
| Hugging Face Backend | Free | Monthly |
| **Total to Start** | **$25 USD** | **One-time** |

---

## 🎯 Quick Checklist

Before submitting to Play Store:

- [ ] Google Play Console account created ($25 paid)
- [ ] Privacy policy created and hosted
- [ ] App screenshots created (minimum 2)
- [ ] Feature graphic created (1024x500)
- [ ] AAB file built (`eas build -p android --profile production`)
- [ ] Store listing filled (description, category, etc.)
- [ ] Content rating completed
- [ ] Data safety section filled
- [ ] Release notes written
- [ ] Countries selected (India)
- [ ] Review submitted

---

## 🆘 Common Issues

### Issue 1: "App not optimized for devices"
**Solution**: Make sure you built AAB, not APK

### Issue 2: "Privacy policy required"
**Solution**: Create and host a privacy policy, add URL to store listing

### Issue 3: "Screenshots required"
**Solution**: Take at least 2 screenshots of your app (1080x1920)

### Issue 4: "Content rating incomplete"
**Solution**: Complete the content rating questionnaire in Play Console

---

## 🚀 Pro Tips

1. **Soft Launch**: Release to India first, gather feedback, then expand
2. **Beta Testing**: Use "Internal testing" track to test with 10-20 farmers first
3. **Keywords**: Use "plant disease", "farming", "agriculture" in description for better discovery
4. **Updates**: Push updates regularly to keep users engaged
5. **Reviews**: Respond to user reviews to build trust

---

## 📞 Support Resources

- **Play Console Help**: https://support.google.com/googleplay/android-developer
- **Expo Documentation**: https://docs.expo.dev/submit/android/
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/

---

## 🎬 Quick Start Commands

```powershell
# Build for Play Store
npx eas build -p android --profile production

# After Play Store approval, push OTA updates
eas update --channel production --message "Bug fixes"
```

**Estimated Time to Publish**: 3-7 days (including Google review)

Good luck with your Play Store launch! 🌿🚀
