const express = require('express');
const routes = express.Router();
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

routes.get("/route/page", (req, res) => {
    res.send("welcome to new page");
})


/* without bcrypt

router.post('/register' , async (req,res) => {
  const data = req.body;
    try{
      const response = await user.create({
        username : data.username,
        email :data.email,
        password : data.password,
      })
      res.send(response);
    }
    catch (err){
        console.log(err);
    }
})  
with bcrypt 
*/


routes.post("/register", async (req, res) => {
    const data = req.body;
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPass = await bcrypt.hash(data.password, salt);
        console.log("hashedPass :", hashedPass)
        const newUser = await user.create({
            username: data.username,
            email: data.email,
            password: hashedPass
        })
        const token = jwt.sign({ id: newUser._id, email: newUser.email, username: newUser.username }, "secretkey", { expiresIn: "1h" })
        console.log("token :", token);
        //setting cookie 

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
        })
        res.status(200).json(newUser);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

routes.post('/login', async (req, res) => {
    const { email, password } = req.body;   // this way
    try {
        // const email= email;
        // const pass = password;
        const searchedUser = await user.findOne({ email: email })
        //validator
        if (!searchedUser) return res.send("invalid email or password")

        const isMatch = await bcrypt.compare(password, searchedUser.password)

        if (!isMatch) return res.send("wrong password")

        //  if (isMatch) return console.log("password matched") , res.send(searchedUser);

        const token = jwt.sign({ id: searchedUser._id, email: searchedUser.email, username: searchedUser.username }, "secretkey", { expiresIn: "1h" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  //  false in dev (true in production over HTTPS)
            sameSite: 'Lax' // or 'None' if cross-site and using secure: true
        })

        res.status(200).json({ message: "successfully logined", token: token, user: searchedUser });

    }
    catch (err) {
     console.log(err)
    }
})


routes.post('/logout', (req, res) => {
    try {
        res.clearCookie( "token" ,{
            httpOnly:true,
            secure:false,
        });
        res.status(200).json({msg : "Logged out successfully and cookie cleared"});
    }
    catch (err) {
        res.status(500).json({err : "Logout Failed"});
    }
})



module.exports = routes