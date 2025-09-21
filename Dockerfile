# 使用轻量 Nginx 镜像作为生产环境
FROM nginx:stable-alpine

# 将本地 dist 文件夹复制到 Nginx 默认静态文件目录
COPY dist/ /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
