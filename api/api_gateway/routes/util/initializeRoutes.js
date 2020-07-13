const express = require('express');
const axios = require('axios');
const { STATUS_CODES } = require('../../../util/constants');
const { FORBIDDEN, UNAUTHORIZED, OK } = STATUS_CODES;
const {checkIfTokenSent, checkIfTokenValid} = require('../../../main_endpoints/util/token-functions')

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
        console.log("hello evan xd \n\n\n", req.body);
        console.log(currentRoute.url + currentRoute.route);
        axios
          .post(currentRoute.url + currentRoute.route, req.body)
          .then((result) => {
            return res.status(OK).send(result.data);
          })
          .catch((error) => {
            return res.sendStatus(error.response.status);
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
          .get(currentRoute.url + currentRoute.route, req.params)
          .then((result) => {
            return res.sendStatus(OK).send(result.data);
          })
          .catch((error) => {
            return res.sendStatus(error.response.status);
          });
      });
    }
  });
  return router;
}

module.exports = {initializeRoutes};
