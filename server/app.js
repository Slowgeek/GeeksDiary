const express = require("express");
const app = express();
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
//import routes
require("./app/routes/notes.routes")(app);

//DB connection
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});
mongoose.connection.on("error", () => {
  console.log("error connecting to mongo");
});

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Server is runnng at port", process.env.PORT);
});
