const cloudinary = require("../middleware/cloudinary");
const Client = require("../models/clients");

module.exports = {

  editPhoto: async (req, res) => {
    try {
      let post = await Client.findById({ _id:req.params.id });
      await cloudinary.uploader.destroy(post.cloudinaryId);
      const editResult = await cloudinary.uploader.upload(req.file.path);
      await Client.findOneAndUpdate(
        { _id: req.params.id },
        {
          image: editResult.secure_url,
          cloudinaryId: editResult.public_id,
        }
      );
      console.log("Client Photo Edited!");
      res.redirect("/clients");
    } catch (err) {
      console.log(err);
    }
  },
};
