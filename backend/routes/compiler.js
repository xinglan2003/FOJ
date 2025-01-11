// backend/routes/compiler.js
const express = require('express');
const router = express.Router();
const compilerController = require('../controllers/compilerController');
const authenticate = require('../middleware/authenticate');

// 提交代码
router.post('/submit', authenticate, compilerController.submitCode);

module.exports = router;
