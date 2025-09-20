# vue-admin-custom

项目为 Vue 3 + TypeScript + Element Plus 管理后台，已对接以下后端接口（你提供）:
- POST /login
- GET /users
- POST /users/add
- DELETE /users/{username}
- GET /customers
- DELETE /customers/{customer_id}
- GET /devices
- GET /device/{device_id}
- GET /devices/{device_id}/contacts
- GET /devices/{device_id}/messages
- GET /devices/{device_id}/photos
- GET /devices/{device_id}/location
- GET /devices/{device_id}/apps

快速启动:
1. 安装依赖: npm install
2. 本地运行: npm run dev
3. 打包: npm run build
4. Docker: docker build -t vue-admin-custom . && docker run -p 8080:80 vue-admin-custom

环境变量: .env -> VITE_BASE_API (已默认指向 https://mybackend1-production.up.railway.app)
