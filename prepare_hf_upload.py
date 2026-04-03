import os
import shutil
import sys

def main():
    print("📦 Preparing GreenDoctor Backend for Hugging Face Deployment...")
    
    # Define paths
    source_dir = os.getcwd()
    dist_dir = os.path.join(source_dir, "dist_hf")
    
    # 1. Clean previous dist (preserve .git)
    if os.path.exists(dist_dir):
        print("   -> Cleaning dist_hf (preserving .git)...")
        for item in os.listdir(dist_dir):
            if item == ".git":
                continue
            item_path = os.path.join(dist_dir, item)
            try:
                if os.path.isfile(item_path) or os.path.islink(item_path):
                    os.unlink(item_path)
                elif os.path.isdir(item_path):
                    shutil.rmtree(item_path)
            except Exception as e:
                print(f"      ! Could not delete {item}: {e}")
    else:
        os.makedirs(dist_dir)
    
    # 2. Copy Dockerfile
    print("   -> Copying Dockerfile...")
    if os.path.exists("Dockerfile"):
        shutil.copy("Dockerfile", dist_dir)
    else:
        print("Error: Dockerfile not found!")
        return

    # 3. Copy Backend Folder
    print("   -> Copying Backend...")
    backend_src = os.path.join(source_dir, "backend")
    backend_dest = os.path.join(dist_dir, "backend")
    
    # Ignore patterns
    ignore_func = shutil.ignore_patterns("__pycache__", "venv", ".env", "scans.db", ".git", ".DS_Store", "model.h5", "model.tflite")
    
    shutil.copytree(backend_src, backend_dest, ignore=ignore_func)
    
    # 4. Create .dockerignore
    print("   -> Creating .dockerignore...")
    dockerignore_content = """__pycache__
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
"""
    with open(os.path.join(dist_dir, ".dockerignore"), "w", encoding="utf-8") as f:
        f.write(dockerignore_content)

    # 5. Create README.md
    print("   -> Creating README.md (Metadata)...")
    readme_content = """---
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
- `POST /predict`: Main inference endpoint.
"""
    with open(os.path.join(dist_dir, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme_content)

    print("\n✅ Package Ready!")
    print("--------------------------------------------------------")
    print(f"📂 Location: {dist_dir}")
    print("👉 UPLOAD INSTRUCTIONS:")
    print("1. Go to https://huggingface.co/new-space")
    print("2. Create a Space (SDK: Docker)")
    print("3. Upload ALL files inside the 'dist_hf' folder to your Space.")
    print("   (Or use git: git push https://huggingface.co/spaces/YOUR_USER/YOUR_SPACE main)")
    print("--------------------------------------------------------")

if __name__ == "__main__":
    main()
