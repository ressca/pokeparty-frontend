# Stage 1: Build
FROM node:18-slim AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:stable

# Copy only built static files
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]