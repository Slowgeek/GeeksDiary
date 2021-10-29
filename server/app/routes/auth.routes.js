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
  // app.post("/signup", async (req, res) => {
  //   try {
  //     const notes = await Notes.find({ noted_by: "6127a87d3d83843224ade7ff" });
  //     console.log(notes);
  //     res.status(200).send(notes);
  //   } catch (err) {
  //     res.status(500).send({ err: err });
  //   }
  // });
  app.post(
    "/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail],
    async (req, res) => {
      try {
        const { username, email, password } = req.body;
        if (!email || !password || !username) {
          return res.status(400).send({ error: "please add all the fields" });
        }

        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, 10),
        });
        await user.save();

        res.status(200).send({ message: "User was registered successfully!" });
      } catch (err) {
        res.status(500).send({ err: err });
      }
    }
  );
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
