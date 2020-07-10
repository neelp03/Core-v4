
const express = require('express');
const router = express.Router();

function initializeRoutes(routes){
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
            res.sendStatus(error.status);
          });
        // return the blue box response back to the user
        res.send(result);
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
            res.status(OK).send(result.data);
          })
          .catch((error) => {
            res.sendStatus(error.status);
          });
        // return the blue box response back to the user
        res.send(result);
      });
    }
  });
  return router;
}

module.exports = initializeRoutes;