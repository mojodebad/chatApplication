const express=require("express");
const bodyparser= require("body-parser");
const PORT=3000;

const {SubscriptionServer}=require("subscriptions-transport-ws");
const {graphqlHTTP}=require("express-graphql");
const graphql=require("graphql");
const app=express();
const schema=require("./schema");
const resolver=require("./resolver");
const utils=require("./utils/utils");
const cors=require("cors");
const SubsResolver=require("./subscriptionresolver");

app.use(bodyparser.json());
app.use(cors());

// utils.connectServer(app);
const http = require('http').createServer(app);
// const io=require("socket.io")(http,{
//     cors: {
//         origin: `localhost:${1111}`,
//         methods: ["GET", "POST"]
//       }
// });
app.use("/",graphqlHTTP({
    graphiql:{subscriptionEndpoint:`ws://localhost:${1111}/subscriptions`},
    schema:schema,
    rootValue:resolver
}));
utils.connectDb().then((db)=>{
    http.listen(PORT,()=>{
        console.log("connected with backend"); 
    });
},(err)=>{
    console.log("Couldnot start server");
    console.error(err);
});

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

