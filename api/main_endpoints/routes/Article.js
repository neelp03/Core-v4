const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
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

router.get('/getArticles', (req, res) => {
  Article.find({}).then(article => res.status(OK).send(article));
});

router.post('/editArticle', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.MEMBER)) {
    return res.sendStatus(UNAUTHORIZED);
  }

  const { _id, title, author, body, date } = req.body;

  Article.findOne({ _id })
    .then(article => {
      article.title = title || article.title;
      article.author = author || article.author;
      article.body = body || article.body;
      article.date = date || article.date;
      article
        .save()
        .then(ret => {
          res
            .status(OK)
            .json({ ret, item: 'Article updated successfully' });
        })
        .catch(error => {
          res.status(BAD_REQUEST).send({
            error,
            message: 'Article was not updated'
          });
        });
    })
    .catch(error => {
      res.status(NOT_FOUND).send({ error, message: 'Article not found' });
    });
});

router.post('/addArticle', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.MEMBER)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  const newArticle = new Article({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    date: req.body.date,
  });

  Article.create(newArticle, (error, post) => {
    if (error) {
      return res.sendStatus(BAD_REQUEST);
    }
    return res.status(OK).json(post);
  });
});

router.post('/deleteArticle', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.MEMBER)) {
    return res.sendStatus(UNAUTHORIZED);
  }
  Article.deleteOne({ _id: req.body._id }, (error, form) => {
    if (error) {
      const info = {
        errorTime: new Date(),
        apiEndpoint: 'Article/deleteArticle',
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
