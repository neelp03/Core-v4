/* global describe it before after beforeEach afterEach */
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const User = require('../api/main_endpoints/models/User');
const Tag = require('../api/main_endpoints/models/Tag');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  NOT_FOUND,
  FORBIDDEN
} = require('../api/util/constants').STATUS_CODES;
const sinon = require('sinon');
const SceApiTester = require('./util/tools/SceApiTester');
const discordModule = require('../api/main_endpoints/util/discord-connection');


let app = null;
let test = null;
let sandbox = sinon.createSandbox();

const expect = chai.expect;
const tools = require('./util/tools/tools.js');
const {
  setTokenStatus,
  resetMock,
  restoreMock,
  initializeMock
} = require('./util/mocks/TokenValidFunctions');

chai.should();
chai.use(chaiHttp);

describe('Tag', () => {
  before((done) => {
    initializeMock();
    app = tools.initializeServer([
      __dirname + '/../api/main_endpoints/routes/Tag.js'
    ]);
    test = new SceApiTester(app);
    tools.emptySchema(Tag);
    done();
  });

  after(done => {
    restoreMock();
    tools.terminateServer(done);
  });

  beforeEach(() => {
    setTokenStatus(false);
  });

  afterEach(() => {
    resetMock();
  });

  describe('/POST tag', () => {
    it('Should return 200 when adding new tag', async () => {
      const tag = {
        role: 'Testa',
        level: 1,
        color: 'red',
      };
      const result = await test.sendPostRequest('/api/tag/add', tag);
      expect(result).to.have.status(OK);
    });

    it('Should return 200 when view tag', async () => {
      const result = await test.sendGetRequest('/api/tag/getTags');
      expect(result).to.have.status(OK);
    })
  });
});
