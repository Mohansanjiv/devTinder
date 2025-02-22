// const express = require('express')
// const { userAuth } = require('../middleware/auth')
// const { ConnectionRequest } = require('../models/connectionRequest')
// const User = require('../models/user')

// const requestRouter = express.Router()

// requestRouter.post(
//   '/request/send/:status/:toUserId',
//   userAuth,
//   async (req, res) => {
//     try {
//       const fromUserId = req.user._id
//       const toUserId = req.params.toUserId
//       const status = req.params.status

//       const allowedStatus = ['ignored', 'interested']
//       if (!allowedStatus.includes(status)) {
//         return res
//           .status(400)
//           .json({ message: 'invalid status type:' + status })
//       }
//       const toUser = await User.findById(toUserId);
//       if (!toUser) {
//         return res.status(404).send('user not found')
//       }
//       const existingConnectionRequest = await ConnectionRequest.findOne({
//         $or: [
//           { fromUserId, toUserId },
//           { fromUserId: toUserId, toUserId: fromUserId }
//         ]
//       })
//       if (existingConnectionRequest) {
//         return res.status(400).send('Connection already exists')
//       }

//       const connectionRequest = new ConnectionRequest({
//         fromUserId,
//         toUserId,
//         status
//       })
//       const data = await connectionRequest.save()
//       console.log(data)
//       res.status(201).send(data)
//     } catch (error) {
//       throw new Error(error.message)
//     }
//   }
// )

// module.exports = { requestRouter }
const express = require('express')
const { userAuth } = require('../middleware/auth')
const { ConnectionRequest } = require('../models/connectionRequest')
const User = require('../models/user')
const mongoose = require('mongoose')

const requestRouter = express.Router()

requestRouter.post(
  '/request/send/:status/:toUserId',
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id
      const toUserId = req.params.toUserId
      const status = req.params.status

      // Validate status
      const allowedStatus = ['ignored', 'interested']
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: `Invalid status type: ${status}` })
      }

   
      // Check if the user exists
      const toUser = await User.findById(toUserId)
      if (!toUser) {
        console.log('User not found with customId:', toUserId)
        return res.status(404).json({ message: 'User not found' })
      }

      // Check for existing connection requests
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }
        ]
      })

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message:'Connection request already exists' })
      }

      // Create a new connection request
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
      })

      const data = await connectionRequest.save()
      console.log(data)
      res.status(201).json({ message:req.user.firstName+" is " + status + ' in '+toUser.firstName})
    } catch (error) {
      console.error('Error:', error.message)
      res
        .status(500)
        .json({ message: 'An error occurred', error: error.message })
    }
  }
)

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
   try {
      const loggedInUser =req.user._id;
      console.log(loggedInUser)
      const {status,requestId}=req.params;
      console.log(requestId)
      const allowedStatus =["accepted","rejected"];
      if(!allowedStatus.includes(status)){
         return res.status(400).json({message:"status not allowed"})
      }


      const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested"
      });

      if(!connectionRequest){
         return res.status(404).json({message:"Connection not found"});
      }
      connectionRequest.status =status;

      const data =await connectionRequest.save();
      res.json({message:"connection request "+ status, data});
   } catch (error) {
      return res.status(400).send("ERROR"+error.message)
   }
})
module.exports = { requestRouter }
