const express = require("express");


const { body, validationResult } = require('express-validator');
let bodyValidator = function(req, res, next) {
      // username must be an email
  body('name').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 })
  next()
}

module.exports = bodyValidator