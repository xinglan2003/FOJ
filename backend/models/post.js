// backend/models/post.js
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      timestamps: true,
    });
  
    return Post;
  };
  