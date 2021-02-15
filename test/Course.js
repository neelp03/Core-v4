/* global describe it before after */
// During the test the env variable is set to test
process.env.NODE_ENV = "test";
const Course = require("../api/main_endpoints/models/Course");
const Lesson = require("../api/main_endpoints/models/Course");
const User = require("../api/main_endpoints/models/User");
// Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const constants = require("../api/util/constants");
const { OK, BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } = constants.STATUS_CODES;
const SceApiTester = require("./util/tools/SceApiTester");

let app = null;
let test = null;
const expect = chai.expect;
// tools for testing
const tools = require("./util/tools/tools.js");
const {
  initializeMock,
  setTokenStatus,
  resetMock,
  restoreMock
} = require("./util/mocks/TokenValidFunctions");

chai.should();
chai.use(chaiHttp);

describe("Course", () => {
  before(done => {
    initializeMock();
    app = tools.initializeServer(
      __dirname + "/../api/main_endpoints/routes/Course.js"
    );
    test = new SceApiTester(app);
    // Before each test we empty the database
    tools.emptySchema(Course);
    tools.emptySchema(User);
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

  const token = "";
  let courseId = "";
  
  const DUMMY_LESSON = {
    _id: "12345",
    title: "div blocks",
    link: "www.divblock.com",
    courseID: courseId
  };
  const VALID_NEW_COURSE = {
    title: "intro to react",
    author: "Big Chungus",
    description: "a workshop about react",
    summary: "a small summary about react",
    imageURL: "www.image.com",
    lessons: []
  };
  const COURSE_WITH_INVALID_TOKEN = {
    token: "invalid"
  };
  const COURSE_WITHOUT_REQUIRED_FIELDS = {
    title: "intro to react"
  };

  //think that this part of it is wrong
  const COURSE_WITH_INVALID_ID = {
    id: "strawberry"
  };
  const UPDATED_COURSE = {
    title: "intro to react",
    author: "Big Chungus",
    description: "a workshop about react",
    summary: "a small summary about react",
    imageURL: "www.image.com",
    lessons: [DUMMY_LESSON]
  };

  describe("/POST createCourse", () => {
    it("Should return 403 when an invalid token is supplied", async () => {
      const result = await test.sendPostRequest(
        "/api/course/createCourse",
        COURSE_WITH_INVALID_TOKEN
      );
      expect(result).to.have.status(UNAUTHORIZED);
    });
    it("Should return 400 when the required fields aren't filled in", async () => {
      setTokenStatus(true);
      const result = await test.sendPostRequestWithToken(
        token,
        "/api/course/createCourse",
        COURSE_WITHOUT_REQUIRED_FIELDS
      );
      expect(result).to.have.status(BAD_REQUEST);
    });
    it(
      "Should return statusCode 200 when all required " +
        "fields are filled in",
      async () => {
        setTokenStatus(true);
        const result = await test.sendPostRequestWithToken(
          token,
          "/api/course/createCourse",
          VALID_NEW_COURSE
        );
        expect(result).to.have.status(OK);
      }
    );
  });

  describe("/GET getCourses", () => {
    it("Should return an object of all courses", async () => {
      setTokenStatus(true);
      const result = await test.sendGetRequest("/api/course/getCourses");
      expect(result).to.have.status(OK);
      const getCoursesResponse = result.body;
      getCoursesResponse.should.be.a("array");
      expect(getCoursesResponse).to.have.length(1);
      expect(getCoursesResponse[0].title).to.equal(VALID_NEW_COURSE.title);
      expect(getCoursesResponse[0].author).to.equal(VALID_NEW_COURSE.author);
      expect(getCoursesResponse[0].description).to.equal(
        VALID_NEW_COURSE.description
      );
      expect(getCoursesResponse[0].summary).to.equal(VALID_NEW_COURSE.summary);
      expect(getCoursesResponse[0].imageURL).to.equal(VALID_NEW_COURSE.imageURL);
      expect(getCoursesResponse[0].lessons).to.eql(VALID_NEW_COURSE.lessons);
      courseId = getCoursesResponse[0]._id;
    });
  });

  describe("/POST editCourse", () => {
    it("Should return 403 when an invalid token is supplied", async () => {
      const result = await test.sendPostRequestWithToken(
        token,
        "/api/course/editCourse",
        COURSE_WITH_INVALID_TOKEN
      );
      expect(result).to.have.status(UNAUTHORIZED);
    });
    it(
      "Should return 404 when a course by an invalid id isn't found",
      async () => {
        setTokenStatus(true);
        const result = await test.sendPostRequestWithToken(
          token,
          "/api/course/editCourse",
          COURSE_WITH_INVALID_ID
        );
        expect(result).to.have.status(NOT_FOUND);
      }
    );
    it("Should return 200 when a course is sucessfully updated", async () => {
      setTokenStatus(true);
      const result = await test.sendPostRequestWithToken(
        token,
        "/api/course/editCourse",
        { id: courseId, ...UPDATED_COURSE }
      );
      expect(result).to.have.status(OK);
    });
    it("The update should be reflected in the database", async () => {
      setTokenStatus(true);
      const result = await test.sendGetRequest("/api/course/getCourses");
      expect(result).to.have.status(OK);
      const getCoursesResponse = result.body;
      expect(getCoursesResponse).to.have.length(1);
      expect(getCoursesResponse[0].title).to.equal(UPDATED_COURSE.title);
      expect(getCoursesResponse[0].author).to.equal(UPDATED_COURSE.author);
      expect(getCoursesResponse[0].description).to.equal(
        UPDATED_COURSE.description
      );
      expect(getCoursesResponse[0].summary).to.equal(UPDATED_COURSE.summary);
      expect(getCoursesResponse[0].imageURL).to.equal(UPDATED_COURSE.imageURL);
      // this checks that the lessons array has as many lessons are were added
      expect(getCoursesResponse[0].lessons).to.have.length(1);
    });
  });

  describe("/POST deleteCourse", () => {
    it("Should return 403 when an invalid token is supplied", async () => {
      const result = await test.sendPostRequestWithToken(
        token,
        "/api/course/deleteCourse",
        COURSE_WITH_INVALID_TOKEN
      );
      expect(result).to.have.status(UNAUTHORIZED);
    });
    it("Should return 400 when a course is unsucessfully deleted", async () => {
      setTokenStatus(true);
      const result = await test.sendPostRequestWithToken(
        token,
        "/api/course/deleteCourse",
        COURSE_WITH_INVALID_ID
      );
      expect(result).to.have.status(BAD_REQUEST);
    });
    it("Should return 200 when a course is sucessfully deleted", async () => {
      setTokenStatus(true);
      const result = await test.sendPostRequestWithToken(
        token,
        "/api/course/deleteCourse",
        { id: courseId }
      );
      expect(result).to.have.status(OK);
    });
    it("The deleted item should be reflected in the database", async () => {
      setTokenStatus(true);
      const result = await test.sendGetRequest("/api/course/getCourses");
      expect(result).to.have.status(OK);
      const getCoursesResponse = result.body;
      getCoursesResponse.should.be.a("array");
      expect(getCoursesResponse).to.have.length(0);
    });
  });
});
