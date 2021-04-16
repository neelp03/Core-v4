const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const {
  checkIfTokenSent,
  checkIfTokenValid
} = require('../util/token-functions');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND
} = require('../../util/constants').STATUS_CODES;
const addErrorLog = require('../util/logging-helpers');
const membershipState = require('../../util/constants').MEMBERSHIP_STATE;

router.get('/getBlogs', (req, res) => {
  Blog.find({}).then(blog => res.status(OK).send(blog));
});

router.post('/editBlog', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.MEMBER)) {
    return res.sendStatus(UNAUTHORIZED);
  }

  const { _id, title, author, body, date } = req.body;

  Blog.findOne({ _id })
    .then(blog => {
      blog.title = title || blog.title;
      blog.author = author || blog.author;
      blog.body = body || blog.body;
      blog.date = date || blog.date;
      blog
        .save()
        .then(ret => {
          res
            .status(OK)
            .json({ ret, item: 'Blog updated successfully' });
        })
        .catch(error => {
          res.status(BAD_REQUEST).send({
            error,
            message: 'Blog was not updated'
          });
        });
    })
    .catch(error => {
      res.status(NOT_FOUND).send({ error, message: 'Blog not found' });
    });
});

router.post('/addBlog', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.MEMBER)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  const newBlog = new Blog({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    date: req.body.date,
  });

  Blog.create(newBlog, (error, post) => {
    if (error) {
      return res.sendStatus(BAD_REQUEST);
    }
    return res.status(OK).json(post);
  });
});

router.post('/deleteBlog', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.MEMBER)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  Blog.deleteOne({ _id: req.body._id }, (error, form) => {
    if (error) {
      const info = {
        errorTime: new Date(),
        apiEndpoint: 'Blog/deleteBlog',
        errorDescription: error
      };
      addErrorLog(info);
      return res.sendStatus(BAD_REQUEST);
    }
    if (form.n < 1) {
      return res.sendStatus(NOT_FOUND);
    } else {
      return res.status(OK).send({ message: `${req.body._id} was deleted.` });
    }
  });
});

module.exports = router;
