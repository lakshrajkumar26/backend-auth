const  jwt = require("jsonwebtoken");

const verifyJwt = (req,res,next) => {
try{


 const token = req.cookies.token;
 //check is token avail
 if(!token) return res.send(401).json({err : "Access desied.No token provided"});

 const decoded = jwt.verify(token , "secretkey"); //no need to store token ig coz same secretkey

 //put it in req.body  => so i can use it in my main fn 
 req.userInfo = decoded;
 console.log(req.userInfo.email);
 next();
}
catch(err){
    return res.status(400).json({err : "invalid jwt or expires"})
}
}
module.exports = verifyJwt; 