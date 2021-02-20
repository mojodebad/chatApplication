const mongoose=require("mongoose");
const { User } = require("./User");

const ChatSchema=mongoose.Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    },
   message:{
       type:String,  
   }
},{
   timestamps:true
});
const Chat=mongoose.model("Chat",ChatSchema);
const ChatRoomSchema=mongoose.Schema({
    name:mongoose.SchemaTypes.String,
    creator:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    chats:[{
        type:mongoose.Types.ObjectId,
        ref:"Chat"
    }]
    })


module.exports.ChatRoom=mongoose.model("ChatRoom",ChatRoomSchema);
module.exports.Chat=Chat;