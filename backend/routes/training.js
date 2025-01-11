// backend/routes/training.js
const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/trainingController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// 创建课程
router.post('/', authenticate, authorize(['admin', 'manager']), trainingController.createCourse);

// 获取课程列表
router.get('/', trainingController.getCourses);

// 实现教室实时通信
// 这里需要使用 Socket.io 在 server.js 中进行处理

module.exports = router;
