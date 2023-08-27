const cloudinary = require("../middleware/cloudinary");
const Client = require("../models/clients");
const Exercise = require("../models/Post");
const Comment = require("../models/Comment");
const clientPost = require("../models/clientEx");
const clientAppt = require("../models/appts");


module.exports = {

  getClient: async (req, res) => {
    try {
      const posts = await Client.find({ user:req.user.id });
      const elist = await Exercise.find({ user:req.user.id });
      res.render("clients.ejs", { posts: posts, user:req.user, elist: elist });
    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Client.findById(req.params.id);
      const elist = await Exercise.find({ user: req.user.id });
      const cworkout = await clientPost.find({ user: req.user.id });
      const cappt = await clientAppt.find({ user: req.user.id });
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      res.render("client.ejs", { post: post, user:req.user, comments:comments, elist:elist, cworkout:cworkout, cappt:cappt});
    } catch (err) {
      console.log(err);
    }
  },

  createPost: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      await Client.create({
        name:req.body.name,
        image:result.secure_url,
        cloudinaryId:result.public_id,
        address:req.body.address,
        phone:req.body.phone,
        email:req.body.email,
        user:req.user.id,
      });
      res.redirect("/clients");
    } catch (err) {
      console.log(err);
    }
  },

  editPost: async (req, res) => {
    try {
      await Client.findOneAndUpdate(
        { _id:req.params.id },
        {
          name:req.body.editName,
          address:req.body.editAddress,
          phone:req.body.editPhone,
          email:req.body.editEmail,
        }
      );
      res.redirect(`/client/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      let post = await Client.findById({ _id:req.params.id });
      const clientApptList = await clientAppt.find()
      const clientAppointments = clientApptList.find(({client}) => client == req.params.id)
      await cloudinary.uploader.destroy(post.cloudinaryId);
      await Client.deleteOne({ _id: req.params.id });
      await clientAppt.deleteMany({client: clientAppointments.client});
      res.redirect("/clients");
    } catch (err) {
      res.redirect("/clients");
    }
  },
};
