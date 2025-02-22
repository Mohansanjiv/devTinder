const User = require("../models/user");
const jwt = require('jsonwebtoken');


const userAuth = async (req, res, next) => {
  try {
    const {token}= req.cookies;
    if(!token){
        throw new Error("token is not valid");
    }
    const decodedObj =await jwt.verify(token,"wamikaStms");
     const {_id}= decodedObj;
     const user = await  User.findById(_id);
      req.user=user;
      next(); 
  } catch (error) {
    res.status(400).send("ERROR"+error.message)
  }
}

module.exports={userAuth}




// const adminAuth =(req,res,next)=>{
//    console.log("you are checked ")
//    const token ="xyz";
//    const isAdminAuthorized= token== "xyz";
//    if (!isAdminAuthorized) {
//       res.status(401).send("unauthorized request");
//    }else{
//       next();
//    }
// }

// const userAuth =(req,res,next)=>{
//    console.log("you are checked ")
//    const token ="xyz";
//    const isAdminAuthorized= token== "xyz";
//    if (!isAdminAuthorized) {
//       res.status(401).send("unauthorized request");
//    }else{
//       next();
//    }
// }

// module.exports={
//     adminAuth,userAuth
// }