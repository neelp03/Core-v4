process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const tools = require('./util/tools/tools');
const SceApiTester = require('./util/tools/SceApiTester');
const {
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED
} = require('../api/util/constants').STATUS_CODES;
const {
  initializeTokenMock,
  setTokenStatus,
  resetTokenMock,
  restoreTokenMock,
} = require('./util/mocks/TokenValidFunctions');
const {
  initializeSqsMock,
  setSqsResponse,
  resetSqsMock,
  restoreSqsMock,
} = require('./util/mocks/SceSqsApiHandler');

let app = null;
let test = null;
const expect = chai.expect;


chai.should();
chai.use(chaiHttp);

const token = '';

describe('LED Sign', () => {
  before(done => {
    initializeTokenMock();
    initializeSqsMock();
    app = tools.initializeServer(
      __dirname + '/../api/peripheral_api/routes/LedSign.js');
    test = new SceApiTester(app);
    done();
  });

  after(done => {
    restoreTokenMock();
    restoreSqsMock();
    tools.terminateServer(done);
  });

  beforeEach(() => {
    setTokenStatus(false);
    setSqsResponse(false);
  });

  afterEach(() => {
    resetTokenMock();
    resetSqsMock();
  });

  describe('/POST updateSignText', () => {
    it('Should return 400 when token is not sent', async () => {
      const result = await test.sendPostRequest('/api/LedSign/updateSignText');
      expect(result).to.have.status(UNAUTHORIZED);
    });

    it('Should return 400 when invalid token is sent', async () => {
      const result = await test.sendPostRequestWithToken(token,
        '/api/LedSign/updateSignText');
      expect(result).to.have.status(UNAUTHORIZED);
    });

    it('Should return 400 when error in queue', async () => {
      setTokenStatus(true);
      const result = await test.sendPostRequestWithToken(token,
        '/api/LedSign/updateSignText');
      expect(result).to.have.status(BAD_REQUEST);
    });

    it('Should return 200 when message is successfully pushed to the queue',
      async () => {
        setTokenStatus(true);
        setSqsResponse(true);
        const result = await test.sendPostRequestWithToken(token,
          '/api/LedSign/updateSignText');
        expect(result).to.have.status(OK);
      });
  });
});
