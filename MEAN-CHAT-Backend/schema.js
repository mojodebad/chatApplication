const {buildSchema}=require('graphql');

module.exports=buildSchema(`
type User{
    _id:ID!
    name:String!
    email:String!
    password:String!
    mobile:String!
}
input UserData{
      name:String!
      email:String!
      password:String!
      confirmPassword:String!
      mobile:String!
}
input loginData{
    email:String!
    password:String!
}
input chatroomdetails
{
    name:String!
    creator:String!
}
type Chat{
    sender:User!
    message:String!
    _id:String!
}
type ChatRoom{
    _id:ID!
    name:String!
    creator:User! 
    chats:[Chat]
}
input Chroom{
    name:String!
    creator:String!
}
type rootQuery{
    getAllChatRoom:[ChatRoom]
    hello:String!
    getUsers:[User!]!
    Login(user:loginData!):User! 
    getAllChats(id:String):[Chat]
}
input ChatInfo{
    chatroom:String!
    sender:String!
    message:String!
}
type rootMutation{
    Signup(user:UserData!):User!
    createChatRoom(croom:Chroom!):ChatRoom!  
    enterChat(chatdata:ChatInfo!):String!
    removeChat(id:String!):Boolean!
    removeChatRoom(id:String!):Boolean!
}
type rootSub{
    removedChatRoom:ChatRoom
    createdChatRoom:ChatRoom  
}
schema{
   query:rootQuery
   mutation:rootMutation
   subscription:rootSub
}`)