const mongoose = require("mongoose");
const notesUploadSchema = new mongoose.Schema({
notes:{
    id:String,
    topicName:String,
    description:String,
    img:String,
    date:{from:String, to:String},

},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });
const Notesdb = mongoose.model("Notes", notesUploadSchema);
module.exports = Notesdb;