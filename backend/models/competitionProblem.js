// backend/models/competitionProblem.js

module.exports = (sequelize, DataTypes) => {
    const CompetitionProblem = sequelize.define('CompetitionProblem', {
      competitionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Competitions',
          key: 'id',
        },
      },
      problemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Problems',
          key: 'id',
        },
      },
    }, {
      timestamps: false,
    });
  
    return CompetitionProblem;
  };
  