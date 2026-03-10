# Green Doctor - Documentation Index

All documentation for the Green Doctor app is available in this folder.

## 📱 Distribution Guides

### [Play Store Guide](playstore_guide.md) ⭐ RECOMMENDED
Complete step-by-step guide to publish on Google Play Store
- **Cost**: $25 USD (one-time)
- **Best for**: Professional distribution to farmers
- **Farmers can**: Download from Play Store like any other app

### [Implementation Plan](implementation_plan.md)
Quick guide for building APK files for direct sharing
- **Cost**: Free
- **Best for**: Quick testing or small-scale distribution
- **Farmers need**: Manual APK installation

## 🔄 Update Guides

### [OTA Guide](ota_guide.md)
How to push updates without farmers reinstalling
- Push JavaScript changes instantly
- No reinstall needed
- Works for UI fixes, translations, bug fixes

### [Update Strategy](update_strategy.md)
Complete strategy for different types of updates
- Backend-only updates
- App UI updates
- When to use OTA vs new APK

### [Update Guide](update_guide.md)
Quick reference for pushing backend changes

## 📊 Project Documentation

### [Walkthrough](walkthrough.md)
Summary of all features and improvements made

### [Task List](task.md)
Development checklist and progress tracking

### [Roadmap](roadmap.md)
Future features and improvements planned

## 🚀 Quick Start

**For Play Store Publishing:**
1. Read [playstore_guide.md](playstore_guide.md)
2. Create Google Play Console account ($25)
3. Build AAB: `npx eas build -p android --profile production`
4. Submit to Play Store

**For Direct APK Sharing:**
1. Build APK: `npx eas build -p android --profile preview`
2. Download and share APK via WhatsApp

**For Updates:**
1. Small changes: `eas update --channel production --message "Bug fix"`
2. Major changes: Rebuild and resubmit

## 📧 Support

All guides are in Markdown format (.md) and can be:
- Opened in any text editor
- Viewed in VS Code with preview
- Converted to PDF using online tools
- Shared with team members

---

**Location**: `D:\antigravity leaf disease\GreenDoctor\docs\`

**Last Updated**: January 26, 2026
