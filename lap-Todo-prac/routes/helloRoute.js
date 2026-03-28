const express = require('express');
const router = express.Router();

const helloController = require('../controller/smsController');
router.get('', helloController.sayHello);

module.exports = router;