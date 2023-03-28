const twilio = require('twilio');

const accountSid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

const authToken = 'your_auth_token';
const twilioPhone = 'your_twilio_phone_number';

const sendVerificationCode = async (phone) => {
  const client = twilio(accountSid, authToken);
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  await client.messages.create({
    to: phone,
    from: twilioPhone,
    body: `Your verification code is ${verificationCode}`,
  });
  return verificationCode;
};

module.exports = { sendVerificationCode };