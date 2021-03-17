const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    courseID:{
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true
    }
  },
  { collection: "Lesson" }
);

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String
    },
    description: {
      type: String
    },
    summary: {
      type: String,
      required: true
    },
    lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    imageURL: {
      type: String,
      required: true
    }
  },
  { collection: "Course" }
);

const Lesson = mongoose.model("Lesson", LessonSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {Lesson: Lesson,
                  Course: Course}
