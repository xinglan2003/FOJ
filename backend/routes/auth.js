// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// 注册路由
router.post('/register', async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: '邮箱已被注册' });
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const user = await User.create({
      email,
      nickname,
      password: hashedPassword,
    });

    res.status(201).json({ message: '注册成功' });
  } catch (error) {
    next(error); // 传递给全局错误处理
  }
});

// 登录路由
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: '用户不存在' });
    }

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '密码错误' });
    }

    // 生成 JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: '登录成功', token });
  } catch (error) {
    next(error); // 传递给全局错误处理
  }
});

module.exports = router;
