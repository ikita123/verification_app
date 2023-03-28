const AuthService = require('../services/authService');
const authService = new AuthService();

exports.register = async (req, res) => {
  const result = await authService.register(req.body);
  return res.status(result.success ? 200 : 400).json(result);
};

exports.login = async (req, res) => {
  const result = await authService.login(req.body);
  return res.status(result.success ? 200 : 400).json(result);
};

exports.verifyCode = async (req, res) => {
  const result = await authService.verifyCode(req.user.userId, req.body.code);
  return res.status(result.success ? 200 : 400).json(result);
};
