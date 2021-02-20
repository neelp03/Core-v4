/* global describe it before after */
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const Article = require('../api/main_endpoints/models/Article');
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const constants = require('../api/util/constants');
const { OK, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } = constants.STATUS_CODES;
const SceApiTester = require('../test/util/tools/SceApiTester');

let app = null;
let test = null;

const expect = chai.expect;
// tools for testing
const tools = require('./util/tools/tools.js');
const {
  setTokenStatus,
  resetMock,
  restoreMock,
  initializeMock
} = require('./util/mocks/TokenValidFunctions');

chai.should();
chai.use(chaiHttp);

describe('Article', () => {
  before(done => {
    initializeMock();
    app = tools.initializeServer(
      __dirname + '/../api/main_endpoints/routes/Article.js');
    test = new SceApiTester(app);
    // Before each test we empty the database
    tools.emptySchema(Article);
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

  const token = '';
  let articleId = '';
  const VALID_NEW_ARTICLE = {
    title: 'Hi in Spanish',
    author: 'Justin Zhu',
    body: 'Hola Senior',
    date: '02/19/2021'
  };
  const ARTICLE_WITH_INVALID_TOKEN = {
    token: 'invalid'
  };
  const ARTICLE_WITHOUT_REQUIRED_FIELDS = {
    date: 'a date'
  };
  const ARTICLE_WITH_INVALID_TITLE = { //what is this even for?
    title: 'bob'
  };
  const UPDATED_ARTICLE = {
    title: 'Hi in French',
    author: 'Justin Zhu',
    body: 'Bonjour Monsieur',
    date: '02/19/2021'
  };

  describe('/POST addArticle', () => {
    it('Should return 403 when an invalid token is supplied', async () => {
      const result = await test.sendPostRequestWithToken(
        token, '/api/Article/addArticle', ARTICLE_WITH_INVALID_TOKEN);
      expect(result).to.have.status(UNAUTHORIZED);
    });
    it('Should return 400 when the required fields aren\'t filled in',
      async () => {
        setTokenStatus(true);
        const result = await test.sendPostRequestWithToken(
          token, '/api/Article/addArticle', ARTICLE_WITHOUT_REQUIRED_FIELDS);
        expect(result).to.have.status(BAD_REQUEST);
      });
    it('Should return statusCode 200 when all required fields are filled in',
      async () => {
        setTokenStatus(true);
        const result = await test.sendPostRequestWithToken(
          token, '/api/Article/addArticle', VALID_NEW_ARTICLE);
        expect(result).to.have.status(OK);
      });
  });

  describe('/GET getArticles', () => {
    it('Should return an object of all articles', async () => {
      setTokenStatus(true);
      const result = await test.sendGetRequest(
        '/api/Article/getArticles');
      expect(result).to.have.status(OK);
      const getArticlesResponse = result.body;
      getArticlesResponse.should.be.a('array');
      expect(getArticlesResponse).to.have.length(1);
      expect(getArticlesResponse[0].title).to.equal(VALID_NEW_ARTICLE.title);
      expect(getArticlesResponse[0].author).to.equal(VALID_NEW_ARTICLE.author);
      expect(getArticlesResponse[0].body).to.equal(VALID_NEW_ARTICLE.body);
      expect(getArticlesResponse[0].date).to.equal(VALID_NEW_ARTICLE.date);
      articleId = getArticlesResponse[0]._id;
    });
  });

  describe('/POST editArticle', () => {
    it('Should return 403 when an invalid token is supplied', async () => {
      const result = await test.sendPostRequestWithToken(
        token, '/api/Article/editArticle', ARTICLE_WITH_INVALID_TOKEN);
      expect(result).to.have.status(UNAUTHORIZED);
    });
    it('Should return 404 when an article by an invalid id isn\'t found',
      async () => {
        setTokenStatus(true);
        const result = await test.sendPostRequestWithToken(
          token, '/api/Article/editArticle', ARTICLE_WITH_INVALID_NAME);
        expect(result).to.have.status(NOT_FOUND);
      });
    it('Should return 200 when an article is sucessfully updated', async () => {
      setTokenStatus(true);
      UPDATED_ARTICLE._id = articleId;
      const result = await test.sendPostRequestWithToken(
        token, '/api/Article/editArticle', UPDATED_ARTICLE);
      expect(result).to.have.status(OK);
    });
    it('The update should be reflected in the database', async () => {
      setTokenStatus(true);
      const result = await test.sendGetRequest('/api/Article/getArticles');
      expect(result).to.have.status(OK);
      const getArticlesResponse = result.body;
      expect(getArticlesResponse).to.have.length(1);
      expect(getArticleresponse[0]._id).to.equal(UPDATE_ARTICLE._id);
      expect(getArticlesResponse[0].title).to.equal(UPDATED_ARTICLE.title);
      expect(getArticlesResponse[0].author).to.equal(UPDATED_ARTICLE.author);
      expect(getArticlesResponse[0].body).to.equal(UPDATED_ARTICLE.body);
      expect(getArticlesResponse[0].date).to.equal(UPDATED_ARTICLE.date);
    });
  });

  describe('/POST deleteArticle', () => {
    it('Should return 403 when an invalid token is supplied', async () => {
      const result = await test.sendPostRequestWithToken(
        token, '/api/Article/deleteArticle', ARTICLE_WITH_INVALID_TOKEN);
      expect(result).to.have.status(UNAUTHORIZED);
    });
    it('Should return 404 when an article is not found', async () => {
      setTokenStatus(true);
      const result = await test.sendPostRequestWithToken(
        token, '/api/Article/deleteArticle', ARTICLE_WITH_INVALID_NAME);
      expect(result).to.have.status(NOT_FOUND);
    });
    it('Should return 200 when an article is sucessfully deleted', async () => {
      setTokenStatus(true);
      const result = await test.sendPostRequestWithToken(
        token, '/api/Article/deleteArticle', {_id: articleId});
      expect(result).to.have.status(OK);
    });
    it('The deleted article should be reflected in the database', async () => {
      setTokenStatus(true);
      const result = await test.sendGetRequest('/api/Article/getArticle');
      expect(result).to.have.status(OK);
      const getArticlesResponse = result.body;
      getArticlesResponse.should.be.a('array');
      expect(getArticlesResponse).to.have.length(0);
    });
  });
});
