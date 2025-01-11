# 使用官方 Node.js 镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖，忽略对等依赖冲突
RUN npm install --legacy-peer-deps

# 复制所有文件
COPY . .

# 暴露端口（假设后端运行在5000端口）
EXPOSE 5000

# 启动应用
CMD ["npm", "start"]
