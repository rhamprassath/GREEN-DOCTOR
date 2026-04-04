import re

with open('backend/app.py', 'r', encoding='utf-8') as f:
    text = f.read()

new_map = """SPECIALIST_MAP = {
    "Apple Scab": "Apple - Scab",
    "Apple with Black Rot": "Apple - Black Rot",
    "Cedar Apple Rust": "Apple - Rust",
    "Healthy Apple": "Apple - Healthy",
    "Healthy Blueberry Plant": "Blueberry - Healthy",
    "Cherry with Powdery Mildew": "Cherry - Powdery Mildew",
    "Healthy Cherry Plant": "Cherry - Healthy",
    "Corn (Maize) with Cercospora and Gray Leaf Spot": "Corn - Gray Leaf Spot",
    "Corn (Maize) with Common Rust": "Corn - Common Rust",
    "Corn (Maize) with Northern Leaf Blight": "Corn - Northern Leaf Blight",
    "Healthy Corn": "Corn - Healthy",
    "Grape with Black Measles": "Grape - Black Measles",
    "Grape with Black Rot": "Grape - Black Rot",
    "Grape with Leaf Blight": "Grape - Leaf Blight",
    "Healthy Grape": "Grape - Healthy",
    "Orange with Citrus Greening": "Orange - Citrus Greening",
    "Peach with Bacterial Spot": "Peach - Bacterial Spot",
    "Healthy Peach": "Peach - Healthy",
    "Pepper Bell with Bacterial Spot": "Pepper - Bacterial Spot",
    "Healthy Pepper Bell": "Pepper - Healthy",
    "Potato with Early Blight": "Potato - Early Blight",
    "Potato with Late Blight": "Potato - Late Blight",
    "Healthy Potato Plant": "Potato - Healthy",
    "Healthy Raspberry Plant": "Raspberry - Healthy",
    "Healthy Soybean Plant": "Soybean - Healthy",
    "Squash with Powdery Mildew": "Squash - Powdery Mildew",
    "Strawberry with Leaf Scorch": "Strawberry - Leaf Scorch",
    "Healthy Strawberry Plant": "Strawberry - Healthy",
    "Tomato with Bacterial Spot": "Tomato - Bacterial Spot",
    "Tomato with Early Blight": "Tomato - Early Blight",
    "Tomato with Late Blight": "Tomato - Late Blight",
    "Tomato with Leaf Mold": "Tomato - Leaf Mold",
    "Tomato with Septoria Leaf Spot": "Tomato - Septoria Spot",
    "Tomato with Spider Mites or Two-spotted Spider Mite": "Tomato - Spider Mite",
    "Tomato with Target Spot": "Tomato - Target Spot",
    "Tomato Yellow Leaf Curl Virus": "Tomato - Yellow Leaf Curl",
    "Tomato Mosaic Virus": "Tomato - Mosaic Virus",
    "Healthy Tomato Plant": "Tomato - Healthy"
}"""

# Replace the specific block in the file
text = re.sub(r'SPECIALIST_MAP\s*=\s*\{[^}]+\}', new_map, text, count=1)

with open('backend/app.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("Replaced!")
