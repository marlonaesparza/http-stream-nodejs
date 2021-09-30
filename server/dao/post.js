const Post = require('./../../database/models/post');

class PostDAO {
  constructor() {
    this.createPost = this.createPost.bind(this);
    this.getAllPosts = this.getAllPosts.bind(this);
  };

  createPost(post) {
    return Post.create(post);
  };

  getAllPosts() {
    return Post.findAll();
  }
};

module.exports = new PostDAO;
