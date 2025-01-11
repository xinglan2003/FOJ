// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// 添加好友
router.post('/add-friend', authenticate, chatController.addFriend);

// 接受好友请求
router.post('/accept-friend', authenticate, chatController.acceptFriend);

// 创建群聊
router.post('/create-group', authenticate, authorize(['admin', 'manager', 'user']), chatController.createGroup);

// 实现实时聊天
// 在 server.js 中处理 Socket.io 事件

module.exports = router;
