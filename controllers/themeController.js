const UserPrefs = require("../models/UserPrefs");

 
module.exports = {

  postThemeChangeDark: async (req, res) => {
    try {
      await UserPrefs.findOneAndUpdate(
        {
          dark: "business",
        }
      );
      console.log("Theme Updated!");
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },

  postThemeChangeLight: async (req, res) => {
    try {
      await UserPrefs.findOneAndUpdate(
        {
          dark: "nord",
        }
      );
      console.log("Theme Updated!");
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
}