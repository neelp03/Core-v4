const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobFinderSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: 'Date',
    required: true,
    default: Date.now,
  },
  fileName: {
    type: 'String',
    required: true,
  },
  file: {
    // 16mb cap
    type: 'Buffer',
    required: true,
  },
  jobDescription: {
    type: 'String',
    required: true,
  },
});

module.exports = mongoose.model(JobFinderSchema);
