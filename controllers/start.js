const Post = require("../models/Post");
const Comment = require("../models/Comment");

module.exports = {

  getStart: async (req, res) => {
    try {
      const posts = await Post.find({ user:req.user.id });
      res.render("start.ejs", { posts: posts, user:req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
