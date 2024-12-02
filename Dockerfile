# Use the official Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire project into the working directory
COPY . .

# Build the application
RUN npm run build

# Use a minimal Node.js image for production
FROM node:18-alpine AS runner

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]