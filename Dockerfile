FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* bun.lock* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Vite frontend
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment variable for production port
ENV PORT=3000
ENV NODE_ENV=production

# Start the Express server (serves API + static files)
CMD ["node", "--import", "tsx", "server/index.ts"]
