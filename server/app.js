const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

var corsOptions = {
  origin: "*", // restrict calls to those this address
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", () => {
  console.log("error connecting to mongo");
});
app.use(express.json()); //repalcement of bodyparser
require("./app/routes/notes.routes")(app);
require("./app/routes/auth.routes")(app);
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Server is runnng at port", process.env.PORT);
});
