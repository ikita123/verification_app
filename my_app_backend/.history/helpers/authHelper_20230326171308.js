const accountSid = 'ACa073a7c1e51f51d5e239e7e1eb488413';
const authToken = 'df3d9fb1d0afce6b2f0ad3ea246598dc';
const client = require('twilio')(accountSid, authToken);

const twilioPhone = '9993633373';

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
