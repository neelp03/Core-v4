const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
    OK,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    CONFLICT
  } = require('../../util/constants').STATUS_CODES;
const Tag = require('../models/Tag');
const User = require('../models/User');

// get all the tags
router.post("/getTags", (req,res) => {
    Tag.find({}, (error, tags) => {
        if(error){
            return res.status(BAD_REQUEST).send({ message: 'Bad Request'});
        } 
        res.status(OK).send(tags);
    });
});

router.post("/add", (req,res) => {
    Tag.create(req.body, (error, tag) => {
        if(error){
            return res.status(BAD_REQUEST).send({ message: 'Bad Request, maybe tag role is already taken'});
        }
        res.status(OK).send(tag);
    });
        
});

router.post("/delete", (req,res) => {
    if(!req.body.role)
        return res.status(BAD_REQUEST).send({ message: 'Need tag role to delete' });

    const query = {role: req.body.role};
    Tag.findOneAndDelete(query, (error, result) => {
        if(error) 
            return res.status(BAD_REQUEST).send({ message: 'Bad Request'});
        else 
            return res.status(OK).send({message:"Deleted that tag " + req.body.role});
    })
});

module.exports = router;