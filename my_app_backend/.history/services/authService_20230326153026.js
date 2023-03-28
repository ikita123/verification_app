const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationCode } = require('../');
const User = require('../models/user');

const JWT_SECRET = 'your_jwt_secret_key';

class AuthService {
  async register(userData) {
    try {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return { success: false, message: 'Email already exists' };
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({
        email: userData.email,
        password: hashedPassword,
        phone: userData.phone,
      });
      await user.save();
      const verificationCode = await sendVerificationCode(userData.phone);
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { success: true, message: 'User registered successfully', token, verificationCode };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error registering user' };
    }
  }

  async login(userData) {
    try {
      const user = await User.findOne({ email: userData.email });
      if (!user) {
        return { success: false, message: 'Invalid credentials' };
      }
      const passwordMatch = await bcrypt.compare(userData.password, user.password);
      if (!passwordMatch) {
        return { success: false, message: 'Invalid credentials' };
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { success: true, message: 'User logged in successfully', token };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error logging in user' };
    }
  }

  async verifyCode(userId, code) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return { success: false, message: 'Invalid user' };
      }
      if (code !== user.verificationCode) {
        return { success: false, message: 'Invalid verification code' };
      }
      user.verificationCode = '';
      user.isVerified = true;
      await user.save();
      return { success: true, message: 'Phone number verified successfully' };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Error verifying code' };
    }
  }
}

module.exports = AuthService;
