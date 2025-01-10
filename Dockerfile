# React-Vite Dockerfile
# Using node to compile the app
FROM node:23-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
# Using nginx as a web server to host the app
FROM nginx:latest AS host
COPY --from=build /app/dist /usr/share/nginx/html