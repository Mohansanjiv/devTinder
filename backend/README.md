- create a repository
- initialize the repository
- node_modules, package.json,package.lock.json
- install express
- create a server
- Listen to port 7777
- write request handlers for /test ./hello
- install nodemon and update scripts inside package.json
- difference between keret and tilde
- what are dependencies and dev dependencies
- what is the use of "-g" while npm install
- install postman app and make a workspace/collections >test api call
- write logic to handle GET, POST, PATCH, DELETE,API Calls and test them on postman
- explore routing and use of ? ,_, {},_ in the routes
- use of regex in routes /a/ , /.\*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

- Mutilple Routes Handlers - ply with the code
- next()
- next function and errors along with errors
- app.use("/route",rH,[rH2,rH3],rH4)
- what is a middleware why do we need it?
- Now express JS basically handles requests behind
- Difference app.use and app.all
- write a dummy auth middleware for admin
- write a dummy auth middlware for user routes, except /user/login
- error Handling using app.use("/",(err,req,res,next)=>{})

- create a free cluster on connectDB on mongoDB official website (Mongo Atlas)
- install mongoose library
- connect your application to the database "connection-url"/devTinder
- call the connectDB function and connect database before starting application on 7777

- create a userSchema & user Model
- create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try , catch

- JS Object vs JSON(difference)
- Add the express.json middleware to your app
- make your signup API dynamic to receive data from the end user
- User.findOne with duplicate email ids, which object returned
- API -Get user by email
- API - Feed API - GET/feed - get all the users from the database

- explore schematype options from the documents
- add required, unique, lowercase, min, max,trim
- add default,
- create a custom validate functions gender
- improve the DB schema -PUT all appropiate validations on each field in schema
- add timestamps to the underschema

- create a cusstom validatw function for gender
- improve the DB schema -PUT all appropiate validation of each filed of schmea
- Add API level validation on Patch request and signup post api
- DATA Sanitizing -Add API validation for each field

- install validator liberary function and use for validation
- NEVER TRUST req.body

- validate the signup API
- install bcrypt package
- create passwordHash using bcrypt.hash & save the user is encripted password
- create login Api
- compare Passwords and throw error if email or password is valid

- install cookie-parse
- just send a dummy cookie to user
- create GET /profile API and check if get cookie back
- install jsonwebtoken
- IN login API, after email and password validation, create a JWT token and send to user in side cookies
- read the cookies inside your profile API and the logged in user

- create and add userAuth middleware in profile and a new sendConnectionRequest API
- set the expiry jwt token and cookies for 7 days
- create userSchema methods to getJWT()
- create userSchema methods method to comparepassword(passwordInputByUser)

- explore tinder APIs
- create a list all API you can think of in devTinder
- group of multiple routes under respective routers
- read documentation for express.Router
- create routes folder for managing auth,profile, request routers
- create authRouter, profileRouter, requestRouter,
- Import these routers in app.js
- create POST /logout API
- create PATCH /profile/edit
- create PATCH/profile/password API forgot password API
- make you validate all data in every POST, PATCH apis

- create connection request schema
- send connection request API
- Proper validation of Data
- think about ALL corner cases
- $or query $and query in mongoose
- schema.pre("save") function
- read more about indexes in mongodb
- why do we need index in db
- what are advantages and disadvantages creating index, compound index
- read this article about compound index - https://www.mongodb.com/docs/languages/scala/scala-driver/v5.3/indexes/compound-index/

- write code with proper validations for POST /request/review/:status/:requestId
- Thought process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received with all the checks
