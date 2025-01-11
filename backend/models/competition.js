// backend/models/competition.js
module.exports = (sequelize, DataTypes) => {
    const Competition = sequelize.define('Competition', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('ACM', 'OI'),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('upcoming', 'ongoing', 'completed'),
        defaultValue: 'upcoming',
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, {});
  
    return Competition;
  };
  