// backend/models/course.js
module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      videoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {});
  
    return Course;
  };
  