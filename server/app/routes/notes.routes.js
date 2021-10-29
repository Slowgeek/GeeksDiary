const db = require("../models");
const authJwt = require("../middlewares/authJwt");
const Notes = db.notes;
const User = db.user;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
      //can be done by cors package
    );
    next();
  });

  app.get("/home", [authJwt.verifyToken], async (req, res) => {});

  app.get("/mynotes", [authJwt.verifyToken], async (req, res) => {
    try {
      const notes = await Notes.find({ noted_by: req.userId }).sort(
        "-createdAt"
      );
      console.log(notes);
      res.status(200).send(notes);
    } catch (err) {
      res.status(500).send({ err: err });
    }
  });
  app.post("/schedule", [authJwt.verifyToken], async (req, res) => {
    try {
      const {
        topic,
        level,
        problem,
        notes,
        quick_rev,
        tags,
        revision_date,
        noted_by,
      } = req.body;

      if (!problem || !quick_rev) {
        console.log("object");

        return res
          .status(400)
          .send({ error: "please enter problem and quickRevision" });
      }
      console.log("object");
      const note = new Notes({
        topic,
        level,
        problem,
        notes,
        quick_rev,
        tags,
        revision_date,
        noted_by,
      });
      console.log(note);
      await note.save();
      const user = await User.findByIdAndUpdate(
        { _id: req.userId },
        {
          $push: { note_created: note._id },
        },
        {
          new: true,
        }
      );
      // console.log(note);
      // console.log(user);
      res.send({ message: "Sheduled" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err });
    }
  });
  app.get("/displaynotes", [authJwt.verifyToken], async (req, res) => {
    try {
      console.log(req.query.noteId);
      const notes = await Notes.find({ _id: req.query.noteId });
      console.log(notes);
      res.status(200).send(notes);
    } catch (err) {
      res.status(500).send({ err: err });
    }
  });
};
