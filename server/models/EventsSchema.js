const mongoose = require("mongoose");
const EventsSchema = new mongoose.Schema({
events:{
    id:String,
    eventName:String,
    description:String,
    img:String,
    status:String,
    date:{from:String, to:String},
},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });
const Eventsdb = mongoose.model("Events", EventsSchema);
module.exports = Eventsdb;