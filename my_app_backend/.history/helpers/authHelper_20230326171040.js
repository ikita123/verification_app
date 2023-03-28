const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = require('twilio')(accountSid, authToken);

const twilioPhone = 'your_twilio_phone_number';

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

module.exports = { sendVerificationCode };
