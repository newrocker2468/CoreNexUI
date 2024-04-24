const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
  {
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
    password: {
      type: String,
    },
    lastLoggedInWith: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    cssElements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "csselements",
      },
    ],
    cssElementsInReview: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "needapproval",
      },
    ],
    Permissions: [
      {
        type: String,
        default: "Newuser",
      },
    ],
  },
  { timestamps: true }
);

const Userdb = mongoose.model('users',userSchema);
module.exports = Userdb;