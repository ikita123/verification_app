const User = require('../models/user');
const twilioHelper = require('../helpers/twilio.helper');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'my_secret_key';


async function registerUser(email, password, phone) {
  // generate random 6-digit verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // create new user
  const user = new User({
    email,
    password,
    phone,
    verificationCode
  });

  // send verification code via SMS
  await twilioHelper.sendVerificationCode(phone, verificationCode);

  // save user to database
  await user.save();

  return user;
}

async function verifyUser(phone, code, token) {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: decodedToken.userId, phone });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.verificationCode !== code) {
      throw new Error('Verification code is invalid');
    }

    user.isVerified = true;
    user.verificationCode = undefined;

    await user.save();

    return user;
  } catch (error) {
    throw new Error('Error verifying user');
  }
}


async function loginUser(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.password !== password) {
    throw new Error('Incorrect password');
  }

  return user;
}

module.exports = {
  registerUser,
  verifyUser,
  loginUser
};
