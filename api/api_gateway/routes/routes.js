// lawrence
const express = require('express');
const router = express.Router();

const {
  GENERAL_API_URL,
  LOGGING_API_URL,
  MAILER_API_URL,
} = require("../../config/config.json");

const routes = [
  {
    route: "/api/Event/createEevent",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/Event/getEvents",
    url: GENERAL_API_URL,
    protected: false,
    post: false,
  },
  {
    route: "/api/Event/editEvent",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/Event/deleteEvent",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/3DPrintingForm/submit",
    url: GENERAL_API_URL,
    protected: true, //check in the thang
    post: true,
  },
  {
    route: "/api/3DPrintingForm/GetForm",
    url: GENERAL_API_URL,
    protected: true, //check in the thang
    post: true,
  },
  {
    route: "/api/3DPrintingForm/delete",
    url: GENERAL_API_URL,
    protected: true, //check in the thang
    post: true,
  },
  {
    route: "/api/3DPrintingForm/edit",
    url: GENERAL_API_URL,
    protected: true, //check in the thang
    post: true,
  },
  {
    route: "/api/3DPrintingForm/submit",
    url: GENERAL_API_URL,
    protected: true, //check in the thang
    post: true,
  },
  {
    route: "/api/Auth/register",
    url: GENERAL_API_URL,
    protected: false,
    post: true,
  },
  {
    route: "/api/Auth/login",
    url: GENERAL_API_URL,
    protected: false,
    post: true,
  },
  {
    route: "/api/Auth/setEmailToVerified",
    url: GENERAL_API_URL,
    protected: false,
    post: true,
  },
  {
    route: "/api/Auth/verify",
    url: GENERAL_API_URL,
    protected: false,
    post: true,
  },
  {
    route: "/api/Auth/generateHashedId",
    url: GENERAL_API_URL,
    protected: false,
    post: true,
  },
  {
    route: "/api/Auth/validateVerificationEmail",
    url: GENERAL_API_URL,
    protected: false,
    post: true,
  },
  {
    route: "/api/InventoryItem/getItems",
    url: GENERAL_API_URL,
    protected: false,
    post: false,
  },
  {
    route: "/api/InventoryItem/editItem",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/InventoryItem/addItem",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/InventoryItem/editItem",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/InventoryItem/deleteItem",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/officerManager/submit",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/officerManager/GetForm",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/officerManager/delete",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/officerManager/edit",
    url: GENERAL_API_URL,
    protected: true,
    post: true,
  },
  {
    route: "/api/ErrorLog/addErrorLog",
    url: LOGGING_API_URL,
    protected: false,
    post: true,
  },
  {
    route: "/api/ErrorLog/getErrorLogs",
    url: LOGGING_API_URL,
    protected: false,
    post: false,
  },
  {
    route: "/api/PrintLog/addPrintLog",
    url: LOGGING_API_URL,
    protected: false,
    post: true,
  },
  {
    route: "/api/PrintLog/getPrintLogs",
    url: LOGGING_API_URL,
    protected: false,
    post: false,
  },
  {
    route: "/api/SignLog/addPrintLog",
    url: LOGGING_API_URL,
    protected: false,
    post: true,
  },
  {
    route: "/api/PrintLog/getPrintLogs",
    url: LOGGING_API_URL,
    protected: false,
    post: false,
  },
  {
    route: '/api/User/checkIfUserExists',
    url: GENERAL_API_URL,
    protected: false,
    post: true
  },
  {
    route: '/api/User/delete',
    url: GENERAL_API_URL,
    protected: true,
    post: true
  },
  {
    route: '/api/User/search',
    url: GENERAL_API_URL,
    protected: true,
    post: true
  },
  {
    route: '/api/User/users',
    url: GENERAL_API_URL,
    protected: true,
    post: true
  },
  {
    route: '/api/User/edit',
    url: GENERAL_API_URL,
    protected: true,
    post: true
  },
  {
    route: 'api/User/getPagesPrintedCount',
    url: GENERAL_API_URL,
    protected: true,
    post: true
  },
  {
    route: 'api/Calendar/getCalendarEvents',
    url: MAILER_API_URL,
    protected: false,
    post: false
  },
  {
    route: 'api/Mailer/sendVerificationEmail',
    url: MAILER_API_URL,
    protected: false,
    post: true
  },
  {
    route: 'api/Mailer/getCalendarEvents',
    url: MAILER_API_URL,
    protected: false,
    post: false
  }
];

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

module.exports = router;
