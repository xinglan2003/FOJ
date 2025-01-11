// backend/routes/problem.js
const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// 创建题目（仅 admin 和 manager）
router.post('/', authenticate, authorize(['admin', 'manager']), problemController.createProblem);

// 获取题目列表
router.get('/', problemController.getProblems);

// 获取题目详情
router.get('/:id', problemController.getProblemById);

module.exports = router;
