#!/bin/bash

# Stop execution on any error
set -e

# Build Backend Docker Image
echo "🚀 Building Backend Docker Image..."
docker build -t web-backend -f backend/Dockerfile ./backend

# Build Frontend Docker Image
echo "🌐 Building Frontend Docker Image..."
docker build -t web-frontend -f frontend/Dockerfile ./frontend

# Build Docker Compose Images
echo "🔗 Building Docker Compose Images..."
docker-compose build

# List created Docker images
echo "✅ Docker Images Built:"
docker images | grep web

# Success message
echo -e "\n🎉 Build completed successfully! 🚀"
echo "👉 Now, run the following command to launch the app:"
echo "   docker-compose up --build"
