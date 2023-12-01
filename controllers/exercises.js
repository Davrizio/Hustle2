const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const UserPrefs = require("../models/UserPrefs");

module.exports = {

  getWorkout: async (req, res) => {
    try {
      const posts = await Post.find({ user:req.user.id });
      const userPrefs = await UserPrefs.find({ user: req.user.id });
      res.render("exercises.ejs", { posts: posts, user:req.user, userPrefs: userPrefs});
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({post:req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user:req.user, comments: comments, clist:clist });
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      await Post.create({
        title:req.body.title,
        caption: req.body.caption,
        likes: 0,
        user:req.user.id,
      });
      res.redirect("/exercises");
    } catch (err) {
      console.log(err);
    }
  },

  editPost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id:req.params.id },
        { caption:req.body.edit}
      );
      res.redirect("/exercises");
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      let post = await Post.findById({ _id:req.params.id });
      await Post.remove({ _id:req.params.id });
      res.redirect("/exercises");
    } catch (err) {
      res.redirect("/exercises");
    }
  },
};
