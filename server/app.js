const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();



mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });



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
  