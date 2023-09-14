const User = require("../models/User");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const cls = require('cls-hooked');
const namespace = cls.createNamespace('my-namespace');

let passwordResetUser;
let passwordResetToken;


function passwordResetUserAndToken() {
  const req = namespace.get('request');
  passwordResetUser = req.query.user;
  passwordResetToken = req.query.token;
}

module.exports = {
  getReset: (req, res) => {
    res.render("passwordReset.ejs");
  },

  getResetUserInput: (req, res) => {
    res.render("passwordResetUserInput.ejs");
    namespace.run(() => {
      namespace.set('request', req);
      passwordResetUserAndToken();
    });
  },

  postResetCheck: async (req, res) => {
    try {
      const schema = Joi.object({ email: Joi.string().email().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res.status(400).send("user with given email doesn't exist");

      let token = await Token.findOne({ userId: user._id });
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex")
        }).save();
      }

      const link = `${process.env.BASE_URL}/passwordReset/?user=${user._id}&token=${token.token}`;
      await sendEmail(user.email, "Password reset", link);
      req.flash("success", { msg: "Email has been sent!" });
      res.redirect("/");
    } catch (error) {
      req.flash("errors", { msg: "Ooops! An Error Occurred" });
      console.log(error);
    }
  },

  postReset: async (req, res) => {
    try {
      const schema = Joi.object({ password: Joi.string().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await User.findById(passwordResetUser);
      if (!user) return req.flash("errors", { msg: "Invalid link or link expired" }), res.redirect("/");

      const token = await Token.findOne({
        userId: user._id,
        token: passwordResetToken
      });
      if (!token) return req.flash("errors", { msg: "Invalid link or link expired" }), res.redirect("/");

      user.password = req.body.password;
      await user.save();
      await token.delete();

      req.flash("success", { msg: "Success! Your Password has been changed. Please login with new password" });
      res.redirect("/login");
    } catch (error) {
      req.flash("errors", { msg: "Ooops! An Error Occurred" });
      console.log(error);
    }
  }
};
