# Build 阶段
FROM node:22-alpine AS build
WORKDIR /app

# 复制 package.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制项目代码并 build
COPY . .
RUN npm run build

# Production 阶段
FROM nginx:stable-alpine
# 将 dist 文件夹复制到 Nginx 默认服务目录
COPY --from=build /app/dist /usr/share/nginx/html
# 覆盖 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
