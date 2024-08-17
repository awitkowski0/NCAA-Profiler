# Stage 1: Build the Vite app
FROM node:20 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the app using a lightweight web server
FROM node:20-alpine as production

# Set the working directory in the container
WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /app/dist ./dist

# Install a simple server to serve the built app
RUN npm install -g serve

# Expose port 8080
EXPOSE 8080

# Serve the application
CMD ["serve", "-s", "dist", "-l", "8080"]
