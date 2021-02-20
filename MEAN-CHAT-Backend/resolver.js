const User = require("./models/User").User;
const bcrypt = require("bcrypt");
const salt = require("./utils/utils").salt;
const io= require("socket.io");
const validator = require("validator");
const mongoose = require("mongoose");
const { ChatRoom, Chat } = require("./models/chatroom");

const hello = () => {
    return "hey suagr wahts up";
}
const Login = ({ user }, resp, done) => {
    if (user.email == null && user.password == null && !validator.isEmail(user.email)) {
        console.log("not a valid email | password cannot be empty| email cannot be empty");
        return "data is invalid password needs to be there";
    }
    // console.log(user);
    return User.findOne({ email: user.email }, (err, re) => {
        if (re == null) {
            console.log("no user found")
            return { "err": "data not found" };
        }
        if (err) {
            return { "err": "internal server problem" }
        }

        bcrypt.compare(user.password, re.password, (er, same) => {

            if (er) {
                console.error(" an error happend " + er.toString());
            }
            if (same) {
                return re;
            }

        })
    });

}
const Signup = async ({ user }) => {
    console.log(user, salt);
    if (user.confirmPassword !== user.password) {
        throw Error("password and confirm password aren't equal");
    }
    let hashpass = await bcrypt.hash(user.password, 12)
    const usr = new User({ name: user.name, email: user.email, password: hashpass, mobile: user.mobile })
    await usr.save();
    return usr;
}
const getUsers = async () => {
    let data = await User.find({});
    console.log(data);
    return data;
}
const createChatRoom = async (args) => {
    console.log(args);
    const chatroom = new ChatRoom({ name: args.croom.name, creator: mongoose.Types.ObjectId(args.croom.creator.toString()), chats: [] });
    await chatroom.save();
    let data = await chatroom.populate("creator").execPopulate();
    if(data!=null){
          io.on('connection',(socket)=>{
            
            io.emit("created Chatroom",JSON.stringify({"data":{
                "_id": data._id,
                "name": data._doc.name,
                "creator": data._doc.creator,
                "chats": []
            }}));

          })
 
        
    }
    return {
        _id: data._id,
        name: data._doc.name,
        creator: data._doc.creator,
        chats: []
    };
}
const enterChat = async (args) => {
    const chatdetails = await ChatRoom.findOne({ _id: mongoose.Types.ObjectId(args.chatdata.chatroom) });
    await chatdetails.populate("chats").execPopulate();
    // console.log(chatdetails, args.chatdata.sender);
    const senderId = mongoose.Types.ObjectId(args.chatdata.sender);
    //   chatdetails.chats.push({sender:args.chatdata.sender,message:args.chatdata.message})
    const chat = new Chat({ sender: senderId, message: args.chatdata.message });
    await chat.save();
    chatdetails.chats.push(chat._id);
    console.log(chatdetails);
    return chatdetails.save().then((res) => {
        console.log(res);
        return chat._id.toString();
    }, (err) => {
        console.log(err);
        return "err";
    })

}
const getAllChatRoom = async () => {
    let data = await ChatRoom.find({}).populate("creator").exec();
    return data;
}
const getAllChats = async ({ id }) => {
    console.log(id);
    let data = await ChatRoom.find(mongoose.Types.ObjectId(id)).populate({ path: "chats", model: "Chat", populate: { path: "sender", model: "User" } });
    console.log(JSON.stringify(data));
    return (data[0].chats.length == 0) ? [] : [...data[0].chats];

}
const removeChat = async ({ id }) => {
    let oid = mongoose.Types.ObjectId(id);
    console.log(id + "and" + oid);
    let data = "";
    try {
        data = await Chat.deleteOne({ "_id": oid });
        let chatroom = await ChatRoom.findOne({ "$expr": oid });
        console.log(chatroom, oid);
        let index = chatroom.chats.findIndex(i => i == id);
        chatroom.chats.splice(index);
        await chatroom.save();
        console.log(data);
    }
    catch (err) {
        console.log(err);
        return false;
    }
    if (data != null) {
        return true;
    }
    else {
        return false;
    }

}
const removeChatRoom=async({id})=>{
    console.log(id);
    // let objId=new Obj
    try{
    const croom=await ChatRoom.findOne({"_id":mongoose.Types.ObjectId(id)}).populate({model:"Chat",path:"chats"});
   let testData=croom.chats.map(c=>mongoose.Types.ObjectId(c._id));
   console.log(testData);

        await croom.chats.pull();  
        await Chat.deleteMany({"_id":{"$in":testData}});    
  
    let data=await ChatRoom.deleteOne({"_id":mongoose.Types.ObjectId(id)});
    if(data){
        return true
    }
    else{
        return false
    }
}
    catch(err){
      return false
    }

}
module.exports = {
    hello: hello,
    Signup: Signup,
    Login: Login,
    removeChat: removeChat,
    getUsers: getUsers,
    createChatRoom: createChatRoom,
    enterChat: enterChat,
    getAllChatRoom: getAllChatRoom,
    getAllChats: getAllChats,
    removeChatRoom:removeChatRoom
}