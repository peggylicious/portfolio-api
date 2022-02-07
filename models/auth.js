const mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = mongoose.Schema({
    name:  String, // String is shorthand for {type: String}
    email: String,
    password: String, 
    confirmPassword: String,
  });

  module.exports = mongoose.model('User', authSchema)