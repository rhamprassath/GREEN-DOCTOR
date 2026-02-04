# Use official Python runtime as a parent image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install system dependencies required for OpenCV
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY backend/requirements.txt ./backend/requirements.txt

# Install python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Pre-download AI models to bake them into the image
# This prevents timeouts and slow startup on Render
COPY backend/download_models.py ./backend/download_models.py
RUN python backend/download_models.py

# Copy the rest of the application code
COPY backend ./backend

# Expose port 7860 (Hugging Face Spaces Default)
EXPOSE 7860

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=7860
ENV PYTHONUNBUFFERED=1
ENV TF_USE_LEGACY_KERAS=1

# Create a non-root user with ID 1000 (Required for HF Spaces)
RUN useradd -m -u 1000 user

# Change ownership of the app directory to the new user
RUN chown -R user:user /app

USER user
ENV HOME=/home/user \
	PATH=/home/user/.local/bin:$PATH

# Command to run the application
# We use shell form to ensure environment variables are expanded correctly
CMD ["sh", "-c", "uvicorn backend.app:app --host 0.0.0.0 --port $PORT"]
