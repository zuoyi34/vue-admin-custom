# Stage 1: build
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --unsafe-perm
# 给 bin 文件夹递归加执行权限
RUN chmod -R +x ./node_modules/.bin
COPY . .
RUN npx vite build

# Stage 2: serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
