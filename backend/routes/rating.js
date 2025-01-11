// backend/routes/rating.js
const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// 获取排行榜
router.get('/leaderboard', ratingController.getLeaderboard);

// 更新评分（仅 admin 和 manager）
router.post('/update', authenticate, authorize(['admin', 'manager']), ratingController.updateRating);

module.exports = router;
