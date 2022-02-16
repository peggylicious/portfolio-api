const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const { body, validationResult } = require("express-validator");

const AuthUser = require("../models/auth");
const myValidator = require("../middleware/validator");
const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/signup", 
    body("email").isEmail(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 3 }),
    body("confirmPassword").isLength({ min: 3 }),
    // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
