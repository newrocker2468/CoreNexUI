const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
    // googleId:String,
    // githubId:String,
    // displayName:String,
    // email:String,
    // image:String,
    // bio:String,
    // createdAt:{
    //     type:Date,
    //     default:Date.now
    // }

    google: {
      Id: String,
      displayName: String,
      image: String,
      bio: String,
    },
    github: {
      Id: String,
      displayName: String,
      image: String,
      bio: String,
    },
    email: {
      type: String,
      unique: true,
    },
    lastLoggedInWith: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    cssElements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CssElement",
      },
    ],
  },
  { timestamps: true }
);

const Userdb = mongoose.model('users',userSchema);
module.exports = Userdb;