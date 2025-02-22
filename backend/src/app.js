const express = require('express')
const connectDB = require('./config/database')
const {authRouter}=require('./routes/auth')
const {profileRouter}=require('./routes/profile')
const {requestRouter}=require('./routes/request')
const {userRouter}=require('./routes/user')
const app = express()

const cookieParser = require('cookie-parser')

// Middleware
app.use(cookieParser())
app.use(express.json())

app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',requestRouter)
app.use('/',userRouter)



// Connect to Database and Start Serve
connectDB()
  .then(() => {
    console.log('Database connection is established')
    app.listen(7777, () => {
      console.log('Backend server is listening on port 7777')
    })
  })
  .catch(err => {
    console.error('Database connection failed:', err.message)
  })
