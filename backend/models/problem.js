// backend/models/problem.js
module.exports = (sequelize, DataTypes) => {
    const Problem = sequelize.define('Problem', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      timeLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      memoryLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {});
  
    return Problem;
  };
  