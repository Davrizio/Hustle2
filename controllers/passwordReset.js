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
  console.log(req.query);
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
      res.render("index.ejs");
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  },

  postReset: async (req, res) => {
    console.log(passwordResetUser, passwordResetToken)
    try {
      const schema = Joi.object({ password: Joi.string().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await User.findById(passwordResetUser);
      if (!user) return res.status(400).send("invalid link or expired userID");

      const token = await Token.findOne({
        userId: user._id,
        token: passwordResetToken
      });
      if (!token) return res.status(400).send("Invalid link or expired Token");

      user.password = req.body.password;
      await user.save();
      await token.delete();

      res.send("password reset sucessfully.");
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  }
};
