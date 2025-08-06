# Stage 1: Build React app
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Fix permission issue with cross-env
RUN chmod +x node_modules/.bin/*

RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine

# Copy build to Nginx public folder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config if you have one
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
