# prepare_hf_upload.ps1
# Creates a clean distribution folder for Hugging Face Spaces

$ErrorActionPreference = "Stop"
$sourceDir = Get-Location
$distDir = Join-Path $sourceDir "dist_hf"

Write-Host "📦 Preparing GreenDoctor Backend for Hugging Face Deployment..." -ForegroundColor Cyan

# 1. Clean previous dist
if (Test-Path $distDir) {
    Remove-Item $distDir -Recurse -Force
}
New-Item -ItemType Directory -Path $distDir | Out-Null

# 2. Copy Dockerfile
Write-Host "   -> Copying Dockerfile..."
Copy-Item "Dockerfile" $distDir

# 3. Copy Backend Folder (Excluding junk)
Write-Host "   -> Copying Backend..."
$backendDest = Join-Path $distDir "backend"
New-Item -ItemType Directory -Path $backendDest | Out-Null

Get-ChildItem "backend" | Where-Object { 
    $_.Name -notin @("__pycache__", "venv", ".env", "scans.db", ".git", ".DS_Store", "model.h5", "model.tflite") 
} | Copy-Item -Destination $backendDest -Recurse

# 4. Create .dockerignore
Write-Host "   -> Creating .dockerignore..."
$dockerIgnoreContent = @"
__pycache__
*.pyc
*.pyo
*.pyd
.Python
env/
venv/
pip-log.txt
pip-delete-this-directory.txt
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
*.log
.git
.mypy_cache
.pytest_cache
.hypotheses
"@
Set-Content -Path (Join-Path $distDir ".dockerignore") -Value $dockerIgnoreContent

# 5. Create README.md for Metadata
Write-Host "   -> Creating README.md (Metadata)..."
$readmeContent = @"
---
title: GreenDoctor Backend
emoji: 🌿
colorFrom: green
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
license: apache-2.0
---

# Green Doctor AI Backend

This is the backend for the Green Doctor mobile app, supporting Leaf Disease Detection for generic and specific crops.

## Endpoints
- \`POST /predict\`: Main inference endpoint.
"@
Set-Content -Path (Join-Path $distDir "README.md") -Value $readmeContent

Write-Host "`n✅ Package Ready!" -ForegroundColor Green
Write-Host "--------------------------------------------------------"
Write-Host "📂 Location: $distDir"
Write-Host "👉 UPLOAD INSTRUCTIONS:"
Write-Host "1. Go to https://huggingface.co/new-space"
Write-Host "2. Create a Space (SDK: Docker)"
Write-Host "3. Upload ALL files inside the 'dist_hf' folder to your Space."
Write-Host "   (Or use git: git push https://huggingface.co/spaces/YOUR_USER/YOUR_SPACE main)"
Write-Host "--------------------------------------------------------"
