var express = require('express');
var router = express.Router();
var studentModel = require('../models/students')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
