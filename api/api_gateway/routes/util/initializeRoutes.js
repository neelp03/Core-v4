const express = require('express');
const axios = require('axios');
const { STATUS_CODES } = require('../../../util/constants');
const { FORBIDDEN, UNAUTHORIZED, OK } = STATUS_CODES;

function initializeRoutes(routes){
  let router = express.Router();
  routes.map((currentRoute) => {
    if (currentRoute.post) {
      router.post(currentRoute.route, (req, res) => {
        if (currentRoute.protected) {
          if (!checkIfTokenSent(req)) {
            return res.sendStatus(FORBIDDEN);
          } else if (!checkIfTokenValid(req)) {
            return res.sendStatus(UNAUTHORIZED);
          }
        }
        // forward it to one of the blue boxes
        axios
          .post(currentRoute.url + currentRoute.route)
          .then((result) => {
            res.status(OK).send(result.data);
          })
          .catch((error) => {
            res.sendStatus(error.response.status);
          });
      });
    } else {
      router.get(currentRoute.route, (req, res) => {
        if (currentRoute.protected) {
          if (!checkIfTokenSent(req)) {
            return res.sendStatus(FORBIDDEN);
          } else if (!checkIfTokenValid(req)) {
            return res.sendStatus(UNAUTHORIZED);
          }
        }
        // forward it to one of the blue boxes
        axios
          .get(currentRoute.url + currentRoute.route)
          .then((result) => {
            res.sendStatus(OK).send(result.data);
          })
          .catch((error) => {
            res.sendStatus(error.response.status);
          });
      });
    }
  });
  return router;
}

module.exports = {initializeRoutes};
