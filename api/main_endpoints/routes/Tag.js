const express = require('express');
const router = express.Router();
const {
    OK,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    CONFLICT
  } = require('../../util/constants').STATUS_CODES;
const Tag = require('../models/Tag');

// get all the tags
router.get("/", (req,res) => {
    Tag.find({}, (error, tags) => {
        if(error){
            return res.status(BAD_REQUEST).send({ message: 'Bad Request'});
        } 
        res.status(OK).send(tags);
    });
});

// add tag or edit depends on header
router.post("/", (req,res) => {
    if(req.body.delete) {
        delete req.body.delete;
        Tag.deleteOne(req.body, (error, tag) => {
            if(error){
                return res.status(BAD_REQUEST).send({ message: 'Bad Request'});
            }
            res.status(OK).send({message:"Deleted that tag"});
        })
    }
    else{
        Tag.create(req.body, (error, tag) => {
            if(error){
                return res.status(BAD_REQUEST).send({ message: 'Bad Request'});
            }
            res.status(OK).send(tag);
        });
    }
    
});

module.exports = router;