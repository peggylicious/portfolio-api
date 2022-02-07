const mongoose = require('mongoose');
const { Schema } = mongoose;

const portfolioSchema = mongoose.Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    projectTool: String, 
    descr: String,
    githubUrl: String,
    photo: String,
    status: String
    // author: {type: Schema.Types.ObjectId, ref: 'users'}
  });

  module.exports = mongoose.model('Portfolios', portfolioSchema)