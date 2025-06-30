const mongoose = require("mongoose")

const URL = "mongodb://localhost:27017/newuser" 

mongoose.connect(URL),{ 
    useNewUrlParser: true,
  useUnifiedTopology: true,};

const db = mongoose.connection;

db.on( "connected" , ()=> {
    console.log("connection");
})

db.on( "disconnected" , ()=> {
    console.log("disconnection");
})


db.on( "error" , (err)=> {
    console.log("error",err);
})
module.exports = db;