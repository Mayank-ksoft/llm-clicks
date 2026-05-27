# Multi-stage build for smaller production image
FROM node:22-alpine AS builder

WORKDIR /app

# Install all deps (including dev) for the build
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund

# Build the Vite frontend
COPY . .
RUN npm run build

# ---------------- Production stage ----------------
FROM node:22-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Install only production deps
COPY package.json package-lock.json* ./
RUN npm install --omit=dev --no-audit --no-fund

# Copy built assets and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

EXPOSE 3000

CMD ["npm", "start"]
