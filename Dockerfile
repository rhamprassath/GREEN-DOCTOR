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

# Expose port 10000
EXPOSE 10000

# Set environment variables for Render
ENV PORT=10000
ENV RENDER=true
ENV PYTHONUNBUFFERED=1

# Command to run the application using uvicorn directly
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "10000"]
