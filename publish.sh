#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status.

DOCKER_USERNAME=${DOCKER_USERNAME:-""}
DOCKER_PASSWORD=${DOCKER_PASSWORD:-""}
IMAGE_NAME="docker-homework"

if [ -z "$DOCKER_USERNAME" ] || [ -z "$DOCKER_PASSWORD" ]; then
  echo "Docker credentials are missing. Please set them in GitHub Secrets."
  exit 1
fi

echo "🔑 Logging in to Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

echo "🚀 Building backend Docker image..."
docker build -t $DOCKER_USERNAME/$IMAGE_NAME-backend:latest -f backend/Dockerfile ./backend

echo "📤 Pushing backend image..."
docker push $DOCKER_USERNAME/$IMAGE_NAME-backend:latest

echo "🚀 Building frontend Docker image..."
docker build -t $DOCKER_USERNAME/$IMAGE_NAME-frontend:latest -f frontend/Dockerfile ./frontend

echo "📤 Pushing frontend image..."
docker push $DOCKER_USERNAME/$IMAGE_NAME-frontend:latest

echo "✅ Successfully built and pushed images to Docker Hub!"
