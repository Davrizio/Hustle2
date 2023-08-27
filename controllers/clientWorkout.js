const cloudinary = require("../middleware/cloudinary");
const ClientExercise = require("../models/clientEx");
const Comment = require("../models/Comment");
const Appts = require("../models/appts");
const ClientList = require("../models/clients");
const { getAppts, getPost } = require("./appts");

module.exports = {

  getWorkout: async (req, res) => {
    try {
      const posts = await PostExercise.find({ user:req.user.id });
      res.render("clientWorkout.ejs", { posts:posts, user:req.user});
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await ClientExercise.findById(req.params.id);
      const comments = await Comment.find({post:req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("clientWorkout.ejs", { post:post, user: req.user, comments:comments});
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    const exAppt = req.body.appointment
    try {
      await ClientExercise.create({
        exercise:req.body.exercise,
        repititions:req.body.repititions,
        instruction:req.body.instruction,
        sets:req.body.sets,
        weight:req.body.weight,
        appointment:req.body.appointment,
        client:req.body.client,
        user:req.user.id,
      });
      console.log("Execise has been added to client workout!");
      res.redirect(`/appointment/${exAppt}`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      let post = await ClientExercise.findById({ _id:req.params.id });
      await ClientExercise.remove({ _id:req.params.id });
      console.log("Deleted Exercise");
      res.redirect(`/appointment/${post.appointment}`);
    } catch (err) {
      res.redirect(`/appointments`);
    }
  },
};
