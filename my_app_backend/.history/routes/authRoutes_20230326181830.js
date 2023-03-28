const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth =require('../helpers/authHelper')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/verify', auth. authController.verifyCode);

module.exports = router;