// backend/models/participant.js
module.exports = (sequelize, DataTypes) => {
    const Participant = sequelize.define('Participant', {
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rank: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    }, {});
  
    return Participant;
  };
  