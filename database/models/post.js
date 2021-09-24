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
  videoPath: {
    type: sequelize.DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  thumbnailPath: {
    type: sequelize.DataTypes.STRING,
    allowNull: true,
    unique: false
  }
}, {
  tableName: 'posts'
});

Post.sync({force: true})
  .then(() => {
    console.log('Posts table created succesfully.');
  })

module.exports = Post;
