// backend/controllers/authController.js
const { User, Rating } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 注册
exports.register = async (req, res) => {
  const { email, nickname, password } = req.body;

  if (!email || !nickname || !password) {
    return res.status(400).json({ message: '所有字段都是必填的。' });
  }

  try {
    const existingUser = await User.findOne({ where: { nickname } });
    if (existingUser) {
      return res.status(400).json({ message: '昵称已存在。' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, nickname, password: hashedPassword });

    // 初始化评分
    await Rating.create({ userId: user.id });

    res.status(201).json({ message: '用户注册成功。' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 登录
exports.login = async (req, res) => {
  const { nickname, password } = req.body;

  if (!nickname || !password) {
    return res.status(400).json({ message: '所有字段都是必填的。' });
  }

  try {
    const user = await User.findOne({ where: { nickname } });
    if (!user) {
      return res.status(400).json({ message: '用户不存在。' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '密码错误。' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};


// 获取当前用户信息
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'nickname', 'email', 'role', 'avatar', 'loginDays', 'trainingVolume'],
    });
    if (!user) {
      return res.status(404).json({ message: '用户未找到。' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};