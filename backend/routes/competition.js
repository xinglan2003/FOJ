// backend/routes/competition.js
const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// 创建比赛（仅 admin 和 manager）
router.post('/', authenticate, authorize(['admin', 'manager']), competitionController.createCompetition);

// 获取比赛列表
router.get('/', competitionController.getCompetitions);

// 报名参赛（仅用户）
router.post('/:id/register', authenticate, authorize(['user']), competitionController.registerCompetition);

// 导入题目到比赛（仅 admin 和 manager）
router.post('/:id/problems', authenticate, authorize(['admin', 'manager']), competitionController.importProblems);

module.exports = router;
