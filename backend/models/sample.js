// backend/models/sample.js
module.exports = (sequelize, DataTypes) => {
    const Sample = sequelize.define('Sample', {
      input: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      output: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {});
  
    return Sample;
  };
  