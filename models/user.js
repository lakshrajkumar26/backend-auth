const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({

   username :{
        type : String,
    },

    email:{
        type : String,
        unique: true,
        required : true,
        
    },
    password :{
        type:String,
    },
    
},{timestamps :  true })

const user  = mongoose.model("userdb",userSchema);

module.exports = user;