// backend/controllers/problemController.js
const { Problem, Sample, Tag } = require('../models');

// 创建题目
exports.createProblem = async (req, res) => {
  const { title, description, timeLimit, memoryLimit, tags, samples } = req.body;
  const userId = req.user.id;

  if (!title || !description || !timeLimit || !memoryLimit) {
    return res.status(400).json({ message: '所有字段都是必填的。' });
  }

  try {
    const problem = await Problem.create({ title, description, timeLimit, memoryLimit, createdBy: userId });

    // 处理标签
    if (tags && tags.length > 0) {
      const tagInstances = await Tag.findAll({ where: { name: tags } });
      await problem.setTags(tagInstances);
    }

    // 处理样例
    if (samples && samples.length > 0) {
      for (const sample of samples) {
        await Sample.create({ input: sample.input, output: sample.output, problemId: problem.id });
      }
    }

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 获取题目列表
exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.findAll({
      include: [{ model: Tag, as: 'tags', through: { attributes: [] } }],
      order: [['createdAt', 'DESC']],
    });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 获取题目详情
exports.getProblemById = async (req, res) => {
  const problemId = req.params.id;

  try {
    const problem = await Problem.findByPk(problemId, {
      include: [
        { model: Tag, as: 'tags', through: { attributes: [] } },
        { model: Sample, as: 'samples' },
      ],
    });

    if (!problem) {
      return res.status(404).json({ message: '题目不存在。' });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};
