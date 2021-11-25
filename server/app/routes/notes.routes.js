const db = require("../models");
const authJwt = require("../middlewares/authJwt");
const Notes = db.notes;
const User = db.user;
// const cron = require("node-cron");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
      //can be done by cors package
    );
    next();
  });

  app.get("/home", [authJwt.verifyToken], async (req, res) => {
    try {
      //   var x = 0;
      //   var task = cron.schedule(" */5 * * * * *", async function () {
      //     console.log("running a task every 5 sec 3 times" + new Date());
      //     if (x < 4) {
      const notes = await User.findOne({ _id: req.userId })
        .select("-password")
        .populate({
          path: "note_created",
          // select: "_id",
          match: {
            revision_date: {
              $lte: new Date(new Date().toDateString()).getTime() + 86000000,
              $gte: new Date(new Date().toDateString()),
            },
          },
        });
      //       // .exec({ $set: { noteToReviseToday: notes.note_created } });
      console.log("object");
      console.log(notes);
      notes.noteToReviseToday = notes.note_created;
      await notes.save();
      console.log(notes.note_created);
      //       x++;
      res.status(200).send(notes);
      //     } else {
      //       task.stop();
      //       console.log("stopped");
      //       task.stop();
      //     }
      //   });
      //   if (x < 4) {
      //     task.start();
      //     function myFunction() {
      //       setTimeout(function () {
      //         console.log("Stopped");
      //         task.stop();
      //       }, 20000);
      //     }
      //     myFunction();
      //   }
    } catch (err) {
      res.status(500).send({ err: err });
    }
  });
  app.get("/today", [authJwt.verifyToken], async (req, res) => {
    try {
      // const notes = await User.findOne({ _id: req.userId }).populate(
      //   "note_created",
      //   "_id revision_date"
      // );
      const notes = await User.findOne({ _id: req.userId })
        .select("-password")
        .populate({
          path: "note_created",
          // select: "_id",
          match: {
            revision_date: {
              $lte: new Date(new Date().toDateString()).getTime() + 86000000,
              $gte: new Date(new Date().toDateString()).getTime() - 19801000,
            },
          },
        });
      // .exec({ $set: { noteToReviseToday: notes.note_created } });

      notes.noteToReviseToday = notes.note_created;
      await notes.save();
      const due = await Notes.find({
        revised: false,
        revision_date: { $lte: new Date() - 86400000 },
      });
      console.log(due);
      // console.log(notes.note_created);
      res.status(200).send({ notes, due });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  });
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
        code,
        tags,
        revision_date,
        noted_by,
      } = req.body;

      if (!topic || !quick_rev) {
        console.log("object");

        return res
          .status(400)
          .send({ error: "please enter Topic and quickRevision" });
      }
      const note = new Notes({
        topic,
        level,
        problem,
        notes,
        quick_rev,
        code,
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
  app.patch("/editnotes", [authJwt.verifyToken], async (req, res) => {
    try {
      console.log(req.body.noteId);
      const notes = await Notes.findOneAndUpdate(
        { _id: req.body.noteId },
        req.body.newdata,
        { upsert: true }
      );
      console.log(notes);
      res.status(200).send(notes);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err });
    }
  });
  app.patch("/revised", [authJwt.verifyToken], async (req, res) => {
    try {
      console.log(req.body.noteId);
      const notes = await Notes.findOneAndUpdate(
        { _id: req.body.noteId },
        { $set: { revised: true } },
        { upsert: true }
      );
      console.log(notes);
      res.status(200).send(notes);
    } catch (err) {
      console.log(err);
      res.status(500).send({ err: err });
    }
  });
};
