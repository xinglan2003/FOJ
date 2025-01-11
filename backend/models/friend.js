// backend/models/friend.js
module.exports = (sequelize, DataTypes) => {
    const Friend = sequelize.define('Friend', {
      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
      },
    }, {});
  
    return Friend;
  };
  