const express = require("express");
const app = express();
const db = require('./dbConn/db');
const user = require("./models/user");
const userRoutes = require('./routes/userRoutes');
const verifyJwt = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const CORS = require("cors");


app.use(CORS({
  origin: 'http://localhost:5173', // React app URL
  credentials: true               //  Required for cookies
}));
app.use(cookieParser());
app.use(express.json());


app.get("/protectedroute",verifyJwt, (req , res)=>{
    res.send(`Home Page and Logged In User : ${req.userInfo.email} and ${req.userInfo.username}`)
})


app.use("/user" , userRoutes);

app.listen(3000, ()=>{
    console.log("server running on 3000")
});