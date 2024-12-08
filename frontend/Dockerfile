# Frontend Dockerfile
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the environment file
COPY .env.production .env

# Build the React app for production
RUN npm run build

# Use nginx to serve the static files
FROM nginx:1.23
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
