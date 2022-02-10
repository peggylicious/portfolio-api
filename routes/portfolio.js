const express = require('express');
const mongoose = require("mongoose")
const router = express.Router()
const Portfolio = require("../models/portfolio")
const isLoggedIn = require("../middleware/isLoggedIn")

router.get('/', isLoggedIn, (req, res, next) => {
    Portfolio.find().then(result => res.status(200).json({result})).catch(err=>res.status(200).json(err))
})
router.post('/', isLoggedIn, (req, res, next) => {
    const newProject = new Portfolio({
        id: new mongoose.Types.ObjectId,
        title: req.body.title
    })
    newProject.save().then(result => {
        res.status(200).json({result})
    }).catch(err =>{
        res.status(500).json({err})
    })
    
})

module.exports = router
