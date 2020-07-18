const express = require("express");
const axios = require("axios");
const { STATUS_CODES } = require("../../../util/constants");
const { 
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND } = STATUS_CODES;
const {
  checkIfTokenSent,
  checkIfTokenValid,
} = require("../../../main_endpoints/util/token-functions");

function initializeRoutes(routes) {
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
          .post(currentRoute.url + currentRoute.route, req.body)
          .then((result) => {
            console.log("we good in post!");
            return res.status(OK).send(result.data);
          })
          .catch((error) => {
            console.log("we bad in post");
            return res.sendStatus(error.response.status);
          });
      });
    } else {
      router.get(currentRoute.route, (req, res) => {
        console.log("hi welcome87876876876876876\n\n\n\n", currentRoute);
        if (currentRoute.protected) {
          if (!checkIfTokenSent(req)) {
            return res.sendStatus(FORBIDDEN);
          } else if (!checkIfTokenValid(req)) {
            return res.sendStatus(UNAUTHORIZED);
          }
        }
        // forward it to one of the blue boxes
        axios
          .get(currentRoute.url + currentRoute.route, req.body)
          .then((result) => {
            console.log("============GET OK\n\n\n\n", result.data); //this prints
            return res.sendStatus(OK).send(result.data);
          })
          .catch((error) => {
            console.log("============not ok :(\n\n\n\n\n"); //and this prints in one api call
            return res.sendStatus(NOT_FOUND).send(error);
          });
        
      });
    }
  });
  return router;
}

module.exports = { initializeRoutes };
