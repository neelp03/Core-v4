const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    team: {
      type: String,
      required: true
    },
    role: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true
    },
    linkedin: {
      type: String
    },
    github: {
      type: String
    },
  },
  { collection: 'Team' }
);

module.exports = mongoose.model('Team', TeamSchema);
