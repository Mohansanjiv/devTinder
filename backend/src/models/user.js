const { mongoose } = require('mongoose')
const validate =require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
   id: {
        type: String,
        required: true,
        unique: true,
    },
  firstName: {
    type: String,
    required: true,
    minLength:4,
  },
  lastName: {
    type: String
  },
  emailId: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength:8,
    maxLength:100,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum:{
      values:["male","female","others"],
      message:`{VALUE} is not a valid gender`
    }
  },
  
  photoUrl: {
    type: String,
    default: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    validate(value){
       if(!validate.isURL(value)){
         throw new Error("please input the valid photo url"+value)
       }
  },
  },
  skills:{
    type:[String]
  },
  about:{
    type:String,
    maxLength:500,
  }
},
{
  timestamps:true,
})

userSchema.methods.getJWT = async function(){
  const user =this;
      const token =  await jwt.sign({_id:user }, 'wamikaStms',{expiresIn:'1d'});

      return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user =this;
  passwordHash=user.password;
  const isPasswordValid =await bcrypt.compare(passwordInputByUser, passwordHash);

  return isPasswordValid;
}
const User = mongoose.model('User', userSchema)
module.exports = User


