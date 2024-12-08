# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the application code to the container
COPY . .

# Expose the application's port
EXPOSE 5000

# Set NODE_ENV to production for optimized performance
ENV NODE_ENV=production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
# Run the application
CMD ["node", "server.js"]
