const mongoose = require("mongoose");


const csschallengesSchema = mongoose.Schema({
  id: String,
  title: String,
  sdesc: String,
  description: String,
  img: String,
  status: String,
  date: { from: String, to: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
}, { timestamps: true });


const Csschallengesdb = mongoose.model('csschallenges', csschallengesSchema);

module.exports = Csschallengesdb;