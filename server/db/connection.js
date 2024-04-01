const mongoose = require("mongoose");
const uri = process.env.DATABASE;
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
