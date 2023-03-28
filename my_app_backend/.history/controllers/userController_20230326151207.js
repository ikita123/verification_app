const User = require('../models/user');
const twilioHelper = require('../helpers/twilio.helper');

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

async function verifyUser(phone, code) {
  const user = await User.findOne({ phone });

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
