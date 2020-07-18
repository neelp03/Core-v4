const { initializeRoutes } = require('./util/initializeRoutes');

const {
  GENERAL_API_URL,
  LOGGING_API_URL,
  MAILER_API_URL,
  RPC_API_URL
} = require('../../config/config.json');

const routes = [
  {
    route: '/event/createEevent',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/Event/getEvents',
    url: GENERAL_API_URL + '/api',
    protected: false,
    post: false,
  },
  {
    route: '/event/editEvent',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/event/deleteEvent',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/3DPrintingForm/submit',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/3DPrintingForm/GetForm',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/3DPrintingForm/delete',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/3DPrintingForm/edit',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/3DPrintingForm/submit',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/Auth/register',
    url: GENERAL_API_URL + '/api',
    protected: false,
    post: true,
  },
  {
    route: '/Auth/login',
    url: GENERAL_API_URL + '/api',
    protected: false,
    post: true,
  },
  {
    route: '/Auth/setEmailToVerified',
    url: GENERAL_API_URL + '/api',
    protected: false,
    post: true,
  },
  {
    route: '/Auth/verify',
    url: GENERAL_API_URL + '/api',
    protected: false,
    post: true,
  },
  {
    route: '/Auth/generateHashedId',
    url: GENERAL_API_URL + '/api',
    protected: false,
    post: true,
  },
  {
    route: '/Auth/validateVerificationEmail',
    url: GENERAL_API_URL + '/api',
    protected: false,
    post: true,
  },
  {
    route: '/InventoryItem/getItems',
    url: GENERAL_API_URL + '/api',
    protected: false,
    post: false,
  },
  {
    route: '/InventoryItem/editItem',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/InventoryItem/addItem',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/InventoryItem/editItem',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/InventoryItem/deleteItem',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/officerManager/submit',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/officerManager/GetForm',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/officerManager/delete',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/officerManager/edit',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true,
  },
  {
    route: '/ErrorLog/addErrorLog',
    url: LOGGING_API_URL + '/api',
    protected: false,
    post: true,
  },
  {
    route: '/ErrorLog/getErrorLogs',
    url: LOGGING_API_URL + '/api',
    protected: false,
    post: false,
  },
  {
    route: '/PrintLog/addPrintLog',
    url: LOGGING_API_URL + '/api',
    protected: false,
    post: true,
  },
  {
    route: '/PrintLog/getPrintLogs',
    url: LOGGING_API_URL + '/api',
    protected: false,
    post: false,
  },
  {
    route: '/SignLog/addPrintLog',
    url: LOGGING_API_URL + '/api',
    protected: false,
    post: true,
  },
  {
    route: '/PrintLog/getPrintLogs',
    url: LOGGING_API_URL + '/api',
    protected: false,
    post: false,
  },
  {
    route: '/User/checkIfUserExists',
    url: GENERAL_API_URL + '/api',
    protected: false,
    post: true
  },
  {
    route: '/User/delete',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true
  },
  {
    route: '/User/search',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true
  },
  {
    route: '/User/users',
    url: GENERAL_API_URL + '/api',
    protected: false,
    post: true
  },
  {
    route: '/User/edit',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true
  },
  {
    route: '/User/getPagesPrintedCount',
    url: GENERAL_API_URL + '/api',
    protected: true,
    post: true
  },
  {
    route: '/Calendar/getCalendarEvents',
    url: MAILER_API_URL + '/api',
    protected: false,
    post: false
  },
  {
    route: '/Mailer/sendVerificationEmail',
    url: MAILER_API_URL + '/api',
    protected: false,
    post: true
  },
  {
    route: '/Mailer/getCalendarEvents',
    url: MAILER_API_URL + '/api',
    protected: false,
    post: false
  },
  {
    route: '/',
    url: MAILER_API_URL + '/api',
    protected: false,
    post: false
  },
  {
    route: '/Printer/sendPrintRequest',
    url: RPC_API_URL + '/SceRpcApi',
    protected: false,
    post: true
  },
  //THIS ROUTE IS NOT IN MASTER, BUT IS IN A PR 
  // {
  //   route: '/Printer/healthCheck',
  //   url: RPC_API_URL + '/SceRpcApi',
  //   protected: false,
  //   post: true
  // },
  {
    route: '/3dPriner/print3dModel',
    url: RPC_API_URL + '/SceRpcApi',
    protected: false,
    post: true
  },
  {
    route: '/LedSign/healthCheck',
    url: RPC_API_URL + '/SceRpcApi',
    protected: false,
    post: true
  },
  {
    route: '/LedSign/updateSignText',
    url: RPC_API_URL + '/SceRpcApi',
    protected: false,
    post: true
  },
];

const router = initializeRoutes(routes);
module.exports = router;
