const db = require("../models");
const Notes = db.notes;
const User = db.user;
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT = process.env.JWT_SEC;
const { verifySignUp } = require("../middlewares"); //no need to go one folder doen due to index file

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
      //can be done by cors package
    );
    next();
  });

  app.post("/sawo", async (req, res) => {
    try {
      const { payload } = req.body;
      console.log(payload);
      const user = await User.findOne({
        email: req.body.payload.identifier,
      });
      if (!user) {
        res.status(200).json({ newUser: true });
        return;
      }
      var token = jwt.sign({ id: user.id + payload.verification_token }, JWT, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
        newUser: false,
      });
      console.log(user);
      res.status(200).send({ message: "payload Recieved" });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  });
  app.post("/signup", async (req, res) => {
    try {
      const { username, email } = req.body;

      console.log(email);
      const user = new User({
        username: req.body.username,
        email: req.body.email,
      });
      await user.save();

      res.status(200).send({ message: "User was registered successfully!" });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  });
};
