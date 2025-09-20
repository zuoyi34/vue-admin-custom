# Stage 1: build
FROM node:22 AS build
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖，同时全局安装 Vite
RUN npm install -g vite@latest
RUN npm install

# 复制项目文件
COPY . .

# 构建前端
RUN vite build

# Stage 2: serve with nginx
FROM nginx:stable
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
