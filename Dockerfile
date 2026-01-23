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

# Copy the rest of the application code
COPY backend ./backend

# Expose port 8000
EXPOSE 8000

# Set environment variable to ensure output is flushed immediately
ENV PYTHONUNBUFFERED=1

# Command to run the application
CMD ["python", "backend/app.py"]
