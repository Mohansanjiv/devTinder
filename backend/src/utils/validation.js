const validator = require('validator');

const validateSignUpData = (req) => {
  const { firstName, lastName, password } = req.body;

  // Trim input fields to remove unnecessary whitespace
  const trimmedFirstName = firstName?.trim();
  const trimmedLastName = lastName?.trim();
  const trimmedEmailId = emailId?.trim();

  // Validate name fields
  if (!trimmedFirstName || !validator.isAlpha(trimmedFirstName, 'en-US', { ignore: " -" })) {
    throw new Error("First name is not valid. Only alphabets, spaces, or hyphens are allowed.");
  }

  if (!trimmedLastName || !validator.isAlpha(trimmedLastName, 'en-US', { ignore: " -" })) {
    throw new Error("Last name is not valid. Only alphabets, spaces, or hyphens are allowed.");
  }

  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    throw new Error("Please enter a strong password with at least 8 characters, including an uppercase letter, a number, and a special character.");
  }
};

const validateEditProfileData =(req)=>{
  
  const allowedEditFields=[
       "firstName",
       "lastName",
       "emailId",
       "photoUrl",
       "gender",
       "age",
       "about",
       "skills",
      ];
      const isEditAllowed =Object.keys(req.body).every((field)=>allowedEditFields.includes(field));
   console.log(isEditAllowed)
      return isEditAllowed;
}

module.exports = { validateSignUpData,validateEditProfileData };
