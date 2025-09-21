# 阶段 1：构建前端
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# 阶段 2：运行静态文件
FROM nginx:alpine

# 设置环境变量传给 nginx
ENV PORT=80

# 拷贝构建结果
COPY --from=builder /app/dist /usr/share/nginx/html

# 拷贝 nginx 模板文件
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

# 自动用 envsubst 替换 $PORT 并启动 nginx
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

EXPOSE 80
