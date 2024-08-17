# Stage 1: Build the React app
FROM node:20 as build

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build your Next.js app for production
RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
