// backend/routes/forum.js
const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const authenticate = require('../middleware/authenticate');

// 创建帖子
router.post('/posts', authenticate, forumController.createPost);

// 获取帖子列表
router.get('/posts', forumController.getPosts);

// 获取单个帖子详情
router.get('/posts/:id', forumController.getPostById);

// 发表评论
router.post('/posts/:id/comments', authenticate, forumController.addComment);

module.exports = router;
