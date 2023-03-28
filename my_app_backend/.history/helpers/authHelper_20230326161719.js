const messagebird = require('messagebird')('uhIeLZaDcBvLi7QZxx5xNesO0');
const messageBirdPhone = '<YOUR-MESSAGEBIRD-PHONE-NUMBER>';

const sendVerificationCode = async (phone) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  const params = {
    originator: messageBirdPhone,
    recipients: [phone],
    body: `Your verification code is ${verificationCode}`,
  };
  try {
    const response = await messagebird.messages.create(params);
    console.log(response);
    return verificationCode;
  } catch (err) {
    console.error(err);
    throw new Error('Failed to send SMS message');
  }
};

module.exports = { sendVerificationCode };