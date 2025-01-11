// backend/controllers/trainingController.js
const { Course } = require('../models');

// 创建课程（仅 admin 和 manager）
exports.createCourse = async (req, res) => {
  const { title, videoUrl } = req.body;
  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: '课程标题是必填的。' });
  }

  try {
    const course = await Course.create({ title, videoUrl, creatorId: userId });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 获取课程列表
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: User, as: 'creator', attributes: ['id', 'nickname'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};
