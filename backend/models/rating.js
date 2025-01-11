// backend/models/rating.js
module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
      elo: {
        type: DataTypes.INTEGER,
        defaultValue: 1500,
      },
    }, {});
  
    return Rating;
  };
  