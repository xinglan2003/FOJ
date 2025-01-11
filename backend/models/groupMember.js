// backend/models/groupMember.js
module.exports = (sequelize, DataTypes) => {
    const GroupMember = sequelize.define('GroupMember', {
      role: {
        type: DataTypes.ENUM('owner', 'member'),
        defaultValue: 'member',
      },
    }, {});
  
    return GroupMember;
  };
  