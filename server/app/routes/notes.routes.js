const db = require("../models");
const Notes = db.notes;
const User = db.user;

module.exports = function (app) {
  app.get("/", async (req, res) => {
    console.log("Backend Frontend Connected");
    res.send("success");
  });
};
