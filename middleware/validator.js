const express = require("express");


const { body, validationResult } = require('express-validator');
module.exports = (req, res, next) => {
  console.log("REQ")

      // username must be an email
      console.log(body('name'))
  body('name').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 })
  next()
}

// module.exports = bodyValidator