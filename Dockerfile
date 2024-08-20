FROM python:3.9-slim

# Use an official Node.js runtime as a parent image
# FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install SQLite3
RUN apt-get update && \
    apt-get install -y sqlite3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN npm install

# Install Python packages
RUN pip install pyserial
RUN pip install flask

COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]