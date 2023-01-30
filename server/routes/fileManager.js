const express = require('express');

const {createFile, updateFile, getFile} = require('../controllers/fileManager.js');

const router = express.Router();

router.post('/create-file', createFile);
router.post('/save-password', updateFile);
router.post('/get-passwords', getFile);
module.exports = router;