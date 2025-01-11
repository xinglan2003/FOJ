// backend/controllers/ratingController.js
const { Rating, User } = require('../models');
const { calculateElo } = require('../utils/ratingSystem');

// 获取排行榜
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Rating.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'nickname'] }],
      order: [['elo', 'DESC']],
      limit: 100,
    });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};

// 更新评分
exports.updateRating = async (req, res) => {
  const { winnerId, loserId } = req.body;

  if (!winnerId || !loserId) {
    return res.status(400).json({ message: '获胜者和失败者ID都是必填的。' });
  }

  try {
    const winner = await Rating.findOne({ where: { userId: winnerId } });
    const loser = await Rating.findOne({ where: { userId: loserId } });

    if (!winner || !loser) {
      return res.status(404).json({ message: '用户评分记录未找到。' });
    }

    const [winnerNewElo, loserNewElo] = calculateElo(winner.elo, loser.elo);

    winner.elo = winnerNewElo;
    loser.elo = loserNewElo;

    await winner.save();
    await loser.save();

    res.json({ winner, loser });
  } catch (error) {
    res.status(500).json({ message: '服务器错误。', error: error.message });
  }
};
