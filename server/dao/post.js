const Post = require('./../../database/models/post');

class PostDAO {
  constructor() {
    this.createPost = this.createPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
  };

  createPost(post) {
    return Post.create(post);
  };

  getPosts() {
    return Post.findAll();
  }
};

module.exports = new PostDAO;
