const { SceHttpServer } = require('../util/SceHttpServer');

function main() {
  const API_ENDPOINTS = [
    __dirname + '/routes/ErrorLog.js',
    __dirname + '/routes/PrintLog.js',
    __dirname + '/routes/SignLog.js',
    __dirname + '/routes/LedSign.js',
    __dirname + '/routes/Printer.js',
    __dirname + '/routes/RFID.js'
  ];
  const peripheralServer = new
  SceHttpServer(API_ENDPOINTS, 8081, '/peripheralapi/');
  peripheralServer.initializeEndpoints().then(() => {
    peripheralServer.openConnection();
  });
}

main();
