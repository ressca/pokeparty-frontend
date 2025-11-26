# Stage 1: Build
FROM node:20-slim AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies
RUN npm ci --silent

# Add build argument and environment variable
ARG VITE_POKEPARTY_API_URL
ENV VITE_POKEPARTY_API_URL=$VITE_POKEPARTY_API_URL

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:1.24

# Copy only built static files
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]