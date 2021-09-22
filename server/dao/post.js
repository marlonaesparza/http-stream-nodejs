const Post = require('./../../database/models/post');

class PostDAO {
  constructor() {
    this.createPost = this.createPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
  };

  createPost(postInfo) {
    let { text, mediaPath } = postInfo;
    let post = { text, mediaPath };

    return Post.create(post);
  };

  getPosts() {
    return Post.findAll();
  }
};

module.exports = new PostDAO;
