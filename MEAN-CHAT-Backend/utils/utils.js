const mongoose=require("mongoose");
const salt="Awareness";

const connectDb=async()=>{
    let db=await mongoose.connect("mongodb+srv://Mohit_Jain:itachi133%40@cluster0.bfliw.mongodb.net/ChatApp?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
     
    if(typeof(db)==Error){
        throw new Error("Sorry Couldnt connect");
    }
    return db;
}



module.exports={
    salt:salt,
    connectDb:connectDb,
  
}