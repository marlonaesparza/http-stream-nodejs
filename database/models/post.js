const { connection, sequelize } = require('./../index');

const Post = connection.define('Post', {
  id: {
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  text: {
    type: sequelize.DataTypes.STRING,
    allowNull: true,
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
