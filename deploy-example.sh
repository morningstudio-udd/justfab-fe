#!/bin/bash

# Set environment variables
BUILD_DIR="dist"
REMOTE_USER="username" # Replace with your username
REMOTE_HOST="host" # Replace with your host
REMOTE_DIR="/path/to/remote/directory" # Replace with the target directory path on hosting

# Step 1: Build the project
echo "Building the project..."
yarn build

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Exiting..."
  exit 1
fi

# Step 2: Connect to the server and upload the build files
echo "Deploying to the server..."
scp -r $BUILD_DIR/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR

# Check if the upload was successful
if [ $? -ne 0 ]; then
  echo "Deployment failed. Exiting..."
  exit 1
fi

echo "Deployment successful!"