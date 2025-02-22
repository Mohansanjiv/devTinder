
const express =require('express');
const { userAuth } = require('../middleware/auth');
const { validateEditProfileData } = require('../utils/validation');
const User = require('../models/user');


const profileRouter = express.Router();

// Feed Route
profileRouter.get('/profile/view', userAuth, async (req, res) => {

  try {
    res.status(200).send({ status: 'success', loggedUser: req.user })
  } catch (error) {
    console.error('Error fetching users:', error.message)
    res.status(500).send({
      status: 'error',
      message: 'An error occurred while fetching users',
      error: error.message
    })
  }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
       if(!validateEditProfileData(req)){
         throw new Error("invalid edit request")
       }
       const loggedInUser = req.user;
       console.log(loggedInUser)
        Object.keys(req.body).forEach((key)=>loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
       console.log(loggedInUser)
       res.status(201).send(loggedInUser)
    } catch (error) {
      res.status(400).send('Error: '+error.message)
    }
})

module.exports={profileRouter}