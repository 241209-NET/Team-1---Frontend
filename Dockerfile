# React-Vite Dockerfile
# Using node to compile the app
FROM node:23-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm i -g serve
RUN npm run build
# Using nginx as a web server to host the app
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]