// backend/utils/ratingSystem.js

// 简单的 Elo 评分系统
function calculateElo(winnerElo, loserElo, k = 32) {
    const expectedWinner = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const expectedLoser = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));
  
    const winnerNewElo = Math.round(winnerElo + k * (1 - expectedWinner));
    const loserNewElo = Math.round(loserElo + k * (0 - expectedLoser));
  
    return [winnerNewElo, loserNewElo];
  }
  
  module.exports = { calculateElo };
  