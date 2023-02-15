const express = require('express');

const {createFile, addNewPassword, updatePassword, getFile} = require('../controllers/fileManager.js');

const router = express.Router();

router.post('/create-file', createFile);
router.post('/add-password', addNewPassword);
router.post('/save-password', updatePassword);
router.post('/get-passwords', getFile);
module.exports = router;