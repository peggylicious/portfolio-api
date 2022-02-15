const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const { body, validationResult } = require("express-validator");

const AuthUser = require("../models/auth");

module.exports.login = (req, res, next) => {
    // Look for user with email
    let foundUser;
    const user = new AuthUser({
      email: req.body.email,
      password: req.body.password,
    });
    AuthUser.findOne({ email: req.body.email })
      .then((userExists) => {
        console.log("User is " , userExists)
  
        if (userExists === null) {
          return res.status(401).json({ message: "User does not exists" });
        }
        console.log("Body Pass ", req.body.password, " | Db Pass ", userExists.password)
        let a =  bcrypt.compare(req.body.password, userExists.password);
        foundUser = userExists
       return a
      })
      .then((passwordIsCorrect) => {
        console.log("Password is", passwordIsCorrect)
        if (!passwordIsCorrect) {
          // console.log("My", result)
          return res.status(401).json({
            message: "Auth failed 1",
          });
        }
        var token = jwt.sign(
          { email: req.body.email, tid: foundUser._id },
          "shhhhh"
        );
        console.log("Token ", token);
        // localStorage.setItem("token", token)
        // res.redirect('/')
  
        return res.status(200).json({ message: "Auth successful", token: token, loggedUserId: foundUser._id });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }