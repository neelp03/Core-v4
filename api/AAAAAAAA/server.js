const { SceHttpServer } = require('../util/SceHttpServer');

function main() {
  const TEST_API = __dirname + '/testRoutes.js';
  const testRoutes = new SceHttpServer(TEST_API, 9000);
  testRoutes.initializeEndpoints().then(() => {
    testRoutes.openConnection();
  });
}

main();
