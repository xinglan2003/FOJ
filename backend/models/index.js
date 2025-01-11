// backend/models/index.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Problem = require('./problem')(sequelize, Sequelize);
db.Sample = require('./sample')(sequelize, Sequelize);
db.Tag = require('./tag')(sequelize, Sequelize);
db.Competition = require('./competition')(sequelize, Sequelize);
db.CompetitionProblem = require('./competitionProblem')(sequelize, Sequelize);
db.Participant = require('./participant')(sequelize, Sequelize);
db.Rating = require('./rating')(sequelize, Sequelize);
db.Course = require('./course')(sequelize, Sequelize);
db.Friend = require('./friend')(sequelize, Sequelize);
db.Group = require('./group')(sequelize, Sequelize);
db.GroupMember = require('./groupMember')(sequelize, Sequelize);

// Define associations
// User - Post
db.User.hasMany(db.Post, { foreignKey: 'userId', as: 'posts' });
db.Post.belongsTo(db.User, { foreignKey: 'userId', as: 'author' });

// Post - Comment
db.Post.hasMany(db.Comment, { foreignKey: 'postId', as: 'comments' });
db.Comment.belongsTo(db.Post, { foreignKey: 'postId', as: 'post' });

// User - Comment
db.User.hasMany(db.Comment, { foreignKey: 'userId', as: 'comments' });
db.Comment.belongsTo(db.User, { foreignKey: 'userId', as: 'author' });

// Problem - Sample
db.Problem.hasMany(db.Sample, { foreignKey: 'problemId', as: 'samples' });
db.Sample.belongsTo(db.Problem, { foreignKey: 'problemId', as: 'problem' });

// Problem - Tag
db.Problem.belongsToMany(db.Tag, { through: 'ProblemTags', as: 'tags' });
db.Tag.belongsToMany(db.Problem, { through: 'ProblemTags', as: 'problems' });

// Competition - CompetitionProblem - Problem
db.Competition.belongsToMany(db.Problem, { through: db.CompetitionProblem, as: 'problems' });
db.Problem.belongsToMany(db.Competition, { through: db.CompetitionProblem, as: 'competitions' });

// Competition - Participant - User
db.Competition.belongsToMany(db.User, { through: db.Participant, as: 'participants' });
db.User.belongsToMany(db.Competition, { through: db.Participant, as: 'competitions' });

// User - Rating
db.User.hasOne(db.Rating, { foreignKey: 'userId', as: 'rating' });
db.Rating.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// Admin and Manager roles can manage courses
db.User.hasMany(db.Course, { foreignKey: 'creatorId', as: 'courses' });
db.Course.belongsTo(db.User, { foreignKey: 'creatorId', as: 'creator' });

// Friend relationships
db.User.belongsToMany(db.User, { through: db.Friend, as: 'friends', foreignKey: 'userId', otherKey: 'friendId' });

// Group chat
db.Group.belongsTo(db.User, { foreignKey: 'ownerId', as: 'owner' });
db.Group.belongsToMany(db.User, { through: db.GroupMember, as: 'members' });
db.User.belongsToMany(db.Group, { through: db.GroupMember, as: 'groups' });

module.exports = db;
