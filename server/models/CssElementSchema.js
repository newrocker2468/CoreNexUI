const mongoose = require("mongoose");
const CssElementSchema = new mongoose.Schema({
  html:{
    type: String,
    required: true,
  },
    css:{
        type: String,
        required: true,
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const CssElement = mongoose.model("CssElement", CssElementSchema);
module.exports = CssElement;