const cloudinary = require("../middleware/cloudinary");
const Appts = require("../models/appts");
const ClientList = require("../models/clients");
const Exercise = require("../models/Post");
const Comment = require("../models/Comment");
const clientPost = require("../models/clientEx");
const UserPrefs = require("../models/UserPrefs");


module.exports = {
   
  getAppts: async (req, res) => {
    try {
      const posts = await Appts.find({ user: req.user.id });
      const clientList = await ClientList.find({ user: req.user.id });
      const userPrefs = await UserPrefs.find({ user: req.user.id });
      res.render("appointments.ejs", { posts: posts, user: req.user, clientList: clientList, userPrefs: userPrefs});
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const apptPost = await Appts.findById(req.params.id);
      const post = await ClientList.findById(req.params.id);
      const elist = await Exercise.find({ user: req.user.id });
      const cworkout = await clientPost.find({ user: req.user.id });
      const clientList = await ClientList.find({ user: req.user.id });
      const comments = await Comment.find({ post: req.params.id});
      const userPrefs = await UserPrefs.find({ user: req.user.id });
      res.render("appointment.ejs", { apptPost: apptPost, user: req.user, comments: comments, elist: elist, cworkout: cworkout, post: post, clientList: clientList, userPrefs: userPrefs });
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      await Appts.create({
        date: req.body.date,
        client: req.body.client,
        user: req.user.id,
      });
      console.log("Appointment has been added!");
      res.redirect("/appointments");
    } catch (err) {
      console.log(err);
    }
  },

  editPost: async (req, res) => {
    try {
      await Appts.findOneAndUpdate(
        { _id: req.params.id },
        {
          date: req.body.editDate,
          client: req.body.editClient,
        }
      );
      console.log("Date Updated!");
      res.redirect("appointments");
    } catch (err) {
      console.log(err);
    }
  },

  notePost: async (req, res) => {
    try {
      await Appts.findOneAndUpdate(
        { _id: req.params.id },
        { note: req.body.note }
      );
      console.log("Note Updated!");
      res.redirect(`/appointment/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      let post = await Appts.findById({ _id: req.params.id });
      await Appts.remove({ _id: req.params.id });
      console.log("Deleted Appointment");
      res.redirect("/appointments");
    } catch (err) {
      res.redirect("/appointments");
    }
  },

  deletePostFromClient: async (req, res) => {
    try {
      let post = await Appts.findById({ _id: req.params.id });
      await Appts.remove({ _id: req.params.id });
      console.log("Deleted Appointment");
      res.redirect(`/client/${post.client}`);
    } catch (err) {
      res.redirect("/appointments");
    }
  },
};
