const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = 5000;

app.use(mainRoutes);

app.listen(port, (err) => {
  err ? console.log(err) : console.log("Server started");
});

mongoose
  .connect(
    "mongodb+srv://Igor:somepassword1999@main.2p6yd.mongodb.net/ItGram?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB connected"));
