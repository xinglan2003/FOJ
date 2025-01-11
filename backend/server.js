// backend/server.js

const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { sequelize, User } = require('./models');
const authRoutes = require('./routes/auth');
const forumRoutes = require('./routes/forum');
const problemRoutes = require('./routes/problem');
const competitionRoutes = require('./routes/competition');
const ratingRoutes = require('./routes/rating');
const trainingRoutes = require('./routes/training');
const chatRoutes = require('./routes/chat');
const compilerRoutes = require('./routes/compiler');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // 在生产环境中，建议指定具体的前端域名以增强安全性
    methods: ['GET', 'POST'],
  },
});

// ---------------------------
// 中间件配置
// ---------------------------

// 配置CORS，允许跨域请求
app.use(cors({
  origin: '*', // 根据实际情况调整，例如 'http://localhost:3000'
}));

// 解析JSON请求体
app.use(express.json());

// ---------------------------
// 路由配置
// ---------------------------

// 认证相关路由
app.use('/api/auth', authRoutes);

// 论坛相关路由
app.use('/api/forum', forumRoutes);

// 题库相关路由
app.use('/api/problem', problemRoutes);

// 比赛相关路由
app.use('/api/competition', competitionRoutes);

// 评分系统相关路由
app.use('/api/rating', ratingRoutes);

// 培训（教室功能）相关路由
app.use('/api/training', trainingRoutes);

// 聊天相关路由
app.use('/api/chat', chatRoutes);

// 在线编译器相关路由
app.use('/api/compiler', compilerRoutes);

// 测试连接路由
app.get('/', (req, res) => {
  res.send('OJ Backend Running');
});

// ---------------------------
// Socket.io 实时功能
// ---------------------------

io.on('connection', (socket) => {
  console.log('新用户连接:', socket.id);

  // 聊天功能：加入聊天房间
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} 加入房间 ${roomId}`);
    io.to(roomId).emit('user-connected', socket.id);
  });

  // 聊天功能：发送消息
  socket.on('send-message', (roomId, message) => {
    console.log(`来自 ${socket.id} 的消息到房间 ${roomId}: ${message}`);
    io.to(roomId).emit('receive-message', socket.id, message);
  });

  // 培训教室功能：加入教室房间
  socket.on('join-training-room', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} 加入培训教室房间 ${roomId}`);
    io.to(roomId).emit('user-joined', socket.id);
  });

  // 可以根据需求扩展更多的实时事件处理

  // 用户断开连接
  socket.on('disconnect', () => {
    console.log('用户断开连接:', socket.id);
    // 可选：通知其他房间成员用户已断开
  });
});

// ---------------------------
// 全局错误处理中间件
// ---------------------------

// 定义全局错误处理中间件
app.use((err, req, res, next) => {
  console.error('全局错误处理:', err);

  // 设置默认状态码和消息
  const statusCode = err.status || 500;
  const message = err.message || '服务器内部错误';

  res.status(statusCode).json({ message });
});

// ---------------------------
// 创建 Admin 账号
// ---------------------------

const bcrypt = require('bcrypt');

const createAdmin = async () => {
  try {
    // 查找是否已存在 admin 账号
    const admin = await User.findOne({ where: { nickname: 'admin' } });
    if (!admin) {
      // 加密密码
      const hashedPassword = await bcrypt.hash('TXW20030416txw', 10);
      // 创建 admin 账号
      await User.create({
        email: 'admin@example.com',
        nickname: 'admin',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Admin 账号已创建');
    } else {
      console.log('Admin 账号已存在');
    }
  } catch (error) {
    console.error('创建 Admin 账号时出错:', error);
  }
};

// ---------------------------
// 启动服务器
// ---------------------------

const PORT = process.env.PORT || 5000;

// 同步数据库并启动服务器
sequelize.sync({ alter: true }).then(() => {
  createAdmin();
  server.listen(PORT, () => {
    console.log(`服务器正在运行在端口 ${PORT}`);
  });
}).catch((error) => {
  console.error('无法连接到数据库:', error);
});
