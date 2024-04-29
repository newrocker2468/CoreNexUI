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
    default: {
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
        ref: "csselements",
      },
    ],
    Permissions: [
      {
        type: String,
        default: "Newuser",
      },
    ],
    emailVerified: Boolean,
    emailVerificationToken: String,
    otp: String,
  },
  { timestamps: true }
);

const Userdb = mongoose.model('users',userSchema);
module.exports = Userdb;