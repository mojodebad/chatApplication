
const PORT = 3000;

const graphql = require("graphql");
const bodyparser=require("body-parser")
const scema = require("./schema");
const resolver = require("./resolver");
const utils = require("./utils/utils");
const cors = require("cors");
const { ApolloServer } = require("apollo-server");
const server=new ApolloServer({schema:scema,rootValue:resolver,playground:true});

// utils.connectServer(app);
// const io=require("socket.io")(http,{
//     cors: {
//         origin: `localhost:${1111}`,
//         methods: ["GET", "POST"]
//       }
// });
// const scemas=gql(`
// type User{
//     _id:ID!
//     name:String!
//     email:String!
//     password:String!
//     mobile:String!
// }
// input UserData{
//       name:String!
//       email:String!
//       password:String!
//       confirmPassword:String!
//       mobile:String!
// }
// input loginData{
//     email:String!
//     password:String!
// }
// input chatroomdetails
// {
//     name:String!
//     creator:String!
// }
// type Chat{
//     sender:User!
//     message:String!
//     _id:String!
// }
// type ChatRoom{
//     _id:ID!
//     name:String!
//     creator:User! 
//     chats:[Chat]
// }
// input Chroom{
//     name:String!
//     creator:String!
// }
// type rootQuery{
//     getAllChatRoom:[ChatRoom]
//     hello:String!
//     getUsers:[User!]!
//     Login(user:loginData!):User! 
//     getAllChats(id:String):[Chat]
// }
// input ChatInfo{
//     chatroom:String!
//     sender:String!
//     message:String!
// }
// type rootMutation{
//     Signup(user:UserData!):User!
//     createChatRoom(croom:Chroom!):ChatRoom!  
//     enterChat(chatdata:ChatInfo!):String!
//     removeChat(id:String!):Boolean!
//     removeChatRoom(id:String!):Boolean!
// }
// type rootSub{
//     removedChatRoom:ChatRoom
//     createdChatRoom:ChatRoom  
// }
// schema{
//    query:rootQuery
//    mutation:rootMutation
//    subscription:rootSub
// }`);

// app.use((req, res) => {
//     res.status(200);
//     res.send('Hello!');
//     res.end();
//   });
server.applyMiddleware(bodyparser.json());
server.applyMiddleware(bodyparser.raw());
server.applyMiddleware(cors());
utils.connectDb().then((db) => {
    if (db) {
        server.listen({port:3000}, () => {
            console.log("connected with backend");
        });
    }

}, (err) => {
    console.log("Couldnot start server");
    console.error(err);
});

// const sc1=gql
// io.listen(1111,()=>{
//    new SubscriptionServer({
//        schema:schema,
//        rootValue:SubsResolver,
//    },{
//        server:io,
//        port:1111
//    })    
// })

// io.on("connection",(socket)=>{
//     console.log("User connected");
//     socket.on("Newchatroom",(Chatroom)=>{
//         console.log("webShocket"+Chatroom);
//     })
//     socket.on("Newchat",(chat)=>{
//         console.log("webShocket"+chat);
//     })
// })

