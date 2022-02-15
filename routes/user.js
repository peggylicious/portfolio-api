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
    body("password").isLength({ min: 5 }),
    body("confirmPassword").isLength({ min: 5 }),
    // .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    //   AuthUser.findOne
    AuthUser.findOne({ email: req.body.email }).then((userfound) => {
      console.log("My user ", userfound);
      if (req.body.email === undefined) {
        console.log(req);
        return res.status(500).json({
          message:
            "No data was submitted. Make sure you are using the correct headers / content-type",
        });
      }
      if (userfound !== null) {
        console.log("Null of ", userfound);
        return res.status(401).json({ message: "User already exists" });
      }
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        // Frontend should verify that both passwords are same b4 sending to Backend
        const user = new AuthUser({
          id: mongoose.Types.ObjectId,
          name: req.body.name,
          email: req.body.email,
          password: hash,
          confirmPassword: hash,
        });
        // Store hash in your password DB.
        console.log(userfound, "else");
        return user
          .save()
          .then((newUser) => {
            console.log("newUser ", newUser);
            res.status(200).json({ message: "User created" });
          })
          .catch((err) => {
            res.status(500).json({ err });
          });
      });
      //   else{

      //   }
    });
  }
);

router.post("/login", authController.login);

module.exports = router;
