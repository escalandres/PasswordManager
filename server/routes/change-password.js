const express = require('express');

const {checkUser, newPassword} = require('../controllers/change-password.js');

const router = express.Router();

router.post('/check-user', checkUser);
router.post('/change-password1', newPassword);

module.exports = router;