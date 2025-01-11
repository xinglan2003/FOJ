// backend/models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      nickname: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'manager', 'user', 'blacklist'),
        defaultValue: 'user',
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue: '', // URL 或文件路径
      },
      loginDays: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      trainingVolume: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    }, {});
  
    return User;
  };
  