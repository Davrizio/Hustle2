const UserPrefs = require("../models/UserPrefs");

 
module.exports = {

  postThemeChangeDark: async (req, res) => {
    try {
      await UserPrefs.updateOne(
        { user: req.user.id },
        {
          dark: "business",
          user: req.user.id
        },
        {upsert: true}
      );
      console.log("Theme Updated!");
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },

  postThemeChangeLight: async (req, res) => {
    try {
      await UserPrefs.updateOne(
        { user: req.user.id },
        {
          dark: "nord",
          user: req.user.id
        },
        {upsert: true}
      );
      console.log("Theme Updated!");
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
}