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
      // if (!email || !username) {
      //   return res.status(400).send({ error: "please add all the fields" });
      // }
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
  app.post("/signin", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!password || !username) {
        return res.status(400).send({ error: "please add all the fields" });
      }
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(404).send({ message: "User Not Found" });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      console.log(user);

      var token = jwt.sign({ id: user.id }, JWT, {
        expiresIn: 86400, // 24 hours
      });
      console.log(token);
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  });
};
