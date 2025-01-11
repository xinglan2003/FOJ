// backend/controllers/compilerController.js
const { compileAndRun } = require('../utils/dockerCompiler');
const { Submission, Problem, User } = require('../models');

// 提交代码
exports.submitCode = async (req, res) => {
  const { problemId, code, language } = req.body;
  const userId = req.user.id;

  if (!problemId || !code || !language) {
    return res.status(400).json({ message: '所有字段都是必填的。' });
  }

  try {
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
      return res.status(404).json({ message: '题目不存在。' });
    }

    // 评测代码
    const result = await compileAndRun(code, language);

    // 保存提交记录
    const submission = await Submission.create({
      problemId,
      userId,
      code,
      language,
      result: result.error ? 'WA' : 'AC',
      details: result.error || result.stdout,
    });

    res.json({ status: submission.result, details: submission.details });
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};
