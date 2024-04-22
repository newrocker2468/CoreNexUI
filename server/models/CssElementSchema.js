const mongoose = require("mongoose");
const CssElementSchema = new mongoose.Schema({
  html: {
    type: String,
    required: true,
  },
  css: {
    type: String,
    required: true,
  },
elementtype:{
  type: String,
  required: true,
},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
const CssElement = mongoose.model("csselements", CssElementSchema);
module.exports = CssElement;