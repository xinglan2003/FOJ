// backend/controllers/forumController.js
const { Post, Comment, User } = require('../models');

// 创建帖子
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  if (!title || !content) {
    return res.status(400).json({ message: '标题和内容都是必填的。' });
  }

  try {
    const post = await Post.create({ title, content, userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 获取帖子列表
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: 'author', attributes: ['id', 'nickname'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 获取单个帖子详情
exports.getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'nickname'] },
        {
          model: Comment,
          as: 'comments',
          include: [{ model: User, as: 'author', attributes: ['id', 'nickname'] }],
          order: [['createdAt', 'ASC']],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: '帖子不存在。' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 发表评论
exports.addComment = async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  const userId = req.user.id;

  if (!content) {
    return res.status(400).json({ message: '评论内容不能为空。' });
  }

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: '帖子不存在。' });
    }

    const comment = await Comment.create({ content, postId, userId });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};
