const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    googleId:String,
    githubId:String,
    displayName:String,
    email:String,
    image:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

const Userdb = mongoose.model('users',userSchema);
module.exports = Userdb;