const express = require('express');
const { userAuth } = require('../middleware/auth');
const { ConnectionRequest } = require('../models/connectionRequest');
const User = require('../models/user');

const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName age photoUrl gender about skills "
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedUser = req.user;

        if (!loggedUser) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        console.log("Fetching connection requests for:", loggedUser._id);

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedUser._id,
            status: "interested",
        }).populate("fromUserId", "firstName lastName age photoUrl skills gender");

        console.log("Fetched Connection Requests:", connectionRequests.length);

        res.status(200).json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });
    } catch (error) {
        console.error("Error fetching connection requests:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});
userRouter.get('/user/connections',userAuth,async(req,res)=>{
    try {
        const loggedUser = req.user;
        const connectionRequest= await ConnectionRequest.find({
            $or:[
                {toUserId:loggedUser._id,status:"accepted"},
                {fromUserId:loggedUser._id,status:"accepted"}
            ],
        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

        const data =connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString() === loggedUser._id.toString()){
                return row.toUserId;
            }else{
                return row.fromUserId;
            }
        });
        res.status(200).json({
            message:"Data fetched successfully",
            data:data,
        });
    } catch (error) {
        res.status(500).json({message:"Internal server error",error:error.message});
    }
})
userRouter.get('/feed',userAuth, async(req,res)=>{
   try {
      
    const page = parseInt(req.query.page) || 1;
    let  limit = parseInt(req.query.limit) || 10;
    limit = limit>50 ? 50 : limit;

    const skip = (page -1 )*limit;

     
    const loggedUser =req.user;
    const connectionRequests = await ConnectionRequest.find({
        $or:[{fromUserId:loggedUser._id},{toUserId:loggedUser._id}],
    }).select("fromUserId toUserId");


    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req)=>{
        hideUsersFromFeed.add(req.fromUserId.toString());
        hideUsersFromFeed.add(req.toUserId.toString());
    }); 
    console.log(hideUsersFromFeed);

   const users = await User.find({
   $and:[{_id:{$nin:Array.from(hideUsersFromFeed)}},{_id:{$ne:loggedUser._id}}],
   }).select(USER_SAFE_DATA).skip(skip).limit(limit);

   res.send(users);
   } catch (error) {
     res.status(400).json({
        message:error.message
     })
   }
});
module.exports = { userRouter };
