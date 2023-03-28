const accountSid = 'ACa073a7c1e51f51d5e239e7e1eb488413';
const authToken = 'df3d9fb1d0afce6b2f0ad3ea246598dc';
const client = require('twilio')(accountSid, authToken);
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';


const twilioPhone = '+13655445422';

const sendVerificationCode = async (phone) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const message = `Your verification code is ${verificationCode}`;
  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: phone
    });
    console.log(response);
    return verificationCode;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to send SMS message');
  }
};



function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Token invalid' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}


module.exports = { sendVerificationCode,authMiddleware };
