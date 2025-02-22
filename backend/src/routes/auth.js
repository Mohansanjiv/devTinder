const express = require('express')
const User = require('../models/user')
// const { validateSignUpData } = require('./utils/validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const authRouter = express.Router()

// Signup Route
authRouter.post('/signup', async (req, res) => {
  try {
    // validateSignUpData(req)
    const userId = uuidv4()
    console.log('hi mera uuid ' + userId)
    const {
      firstName,
      lastName,
      emailId,
      password,
      dob,
      gender,
      photoUrl,
      skills
    } = req.body

    if (!firstName || !emailId || !password || !dob || !gender) {
      return res.status(400).send({
        status: 'error',
        message:
          'Missing required fields: firstName, emailId, password, dob, or gender.'
      })
    }
    console.log(emailId)
    const passwordHash = await bcrypt.hash(password, 10)
    const userData = new User({
      id: uuidv4(),
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      dob,
      gender,
      photoUrl,
      skills
    })
    await userData.save()
    res
      .status(200)
      .send({ status: 'success', message: 'User is added successfully' })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

authRouter.post('/signin', async (req, res) => {
  try {
    const { emailId, password } = req.body
    const user = await User.findOne({ emailId })
    if (!user) {
      throw new Error('invalid crendentials')
    }

    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {
      const token = await user.getJWT()
      res.cookie('token', token, {
        expires: new Date(Date.now() + 8 * 900000),
        httpOnly: true
      })
      res.status(201).send({message:'login successfull',user:user})
    } else {
      throw new Error('invalid crendentials')
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

// authRouter.post('/forget-password', async (req, res) => {
//   try {
//        const token=req.body;
//        console.log(token)
//     res
//       .cookie('token', null, {
//         expires: new Date(Date.now()),
//         httpOnly: true
//       })
//       .send('logout successfully')
//   } catch (error) {
//     res.status(400).send(error.message)
//   }
// })

authRouter.post('/logout', async (req, res) => {
  try {
    res
      .cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
      })
      .send('logout successfully')
  } catch (error) {
    res.status(400).send(error.message)
  }
})
module.exports = { authRouter }
