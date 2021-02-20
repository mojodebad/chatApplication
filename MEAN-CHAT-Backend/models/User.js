const mongoose=require("mongoose");
const UserSchema= mongoose.Schema({
  email:String,
  name:String,
  password:String,
  mobile:String
});

module.exports.User=mongoose.model("User",UserSchema);