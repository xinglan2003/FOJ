// backend/controllers/competitionController.js
const { Competition, Problem, CompetitionProblem, Participant } = require('../models');

// 创建比赛
exports.createCompetition = async (req, res) => {
  const { name, type, startTime, endTime } = req.body;
  const userId = req.user.id;

  if (!name || !type || !startTime || !endTime) {
    return res.status(400).json({ message: '所有字段都是必填的。' });
  }

  try {
    const competition = await Competition.create({ name, type, startTime, endTime });
    res.status(201).json(competition);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 获取比赛列表
exports.getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.findAll({
      include: [{ model: Problem, as: 'problems', through: { attributes: [] } }],
      order: [['startTime', 'DESC']],
    });
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 报名参赛
exports.registerCompetition = async (req, res) => {
  const competitionId = req.params.id;
  const userId = req.user.id;

  try {
    const competition = await Competition.findByPk(competitionId);
    if (!competition) {
      return res.status(404).json({ message: '比赛不存在。' });
    }

    if (competition.status !== 'upcoming') {
      return res.status(400).json({ message: '比赛当前不允许报名。' });
    }

    // 创建参赛者记录
    const participant = await Participant.create({ competitionId, userId });
    res.status(201).json(participant);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 导入题目到比赛
exports.importProblems = async (req, res) => {
  const competitionId = req.params.id;
  const { problemIds } = req.body;

  try {
    const competition = await Competition.findByPk(competitionId);
    if (!competition) {
      return res.status(404).json({ message: '比赛不存在。' });
    }

    const problems = await Problem.findAll({ where: { id: problemIds } });
    await competition.addProblems(problems);

    res.json({ message: '题目已导入到比赛。' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};
