const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser= require("body-parser");
var cors = require('cors')
const portfolioRoutes = require('./routes/portfolio');
const authRoutes = require('./routes/user');

// const router = express.Router()

// Connect to DB
mongoose.connect('mongodb+srv://margaret:' + 'margaret' + '@cluster0.lxpah.mongodb.net/portfolio?retryWrites=true&w=majority', {
    // useMongoClient: true
    // useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });
app.use(cors())

app.use("/portfolio", portfolioRoutes)
app.use("/user", authRoutes)



module.exports = app;