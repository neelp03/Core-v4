const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
  },
  { collection: 'Article' }
);

module.exports = mongoose.model('Article', ArticleSchema);
