const { connection, sequelize } = require('./../index');

const Post = connection.define('Post', {
  id: {
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  title: {
    type: sequelize.DataTypes.STRING(30),
    allowNull: false,
    unique: false
  },
  description: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  mediaPath: {
    type: sequelize.DataTypes.STRING,
    allowNull: true,
    unique: false
  }
}, {
  tableName: 'posts'
});

Post.sync({force: true})
  .then(() => {
    console.log('Posts talbe created succesfully');
  })

module.exports = Post;
