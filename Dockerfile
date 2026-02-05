# ===== STAGE 1: BUILD =====
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ===== STAGE 2: NGINX =====
FROM nginx:alpine

# Hapus default config kalau mau custom
# RUN rm /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
