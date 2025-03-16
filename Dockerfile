# Use Node.js base image
FROM node:18-alpine

# Create and set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application files
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
