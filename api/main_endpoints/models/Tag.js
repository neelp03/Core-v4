const mongoose = require('mongoose');
const User = require('../models/User');
const Schema = mongoose.Schema;

const TagSchema = new Schema(
  {
    role : {
      type: String,
      unique: true,
      required: true
    },
    level : {
      type: Number,
      default: -1
    },
    color: {
      type: String,
      default: '#808080'
    },
    // whenever that user add the tag, add that user's id here
    users: [{type: Schema.Types.ObjectId}]
  }
);

/*
    pre hook: find all the user and delete the tag reference inside there
*/
TagSchema.pre('deleteOne', { document: true, query: false}, function(next) {
  // get the list of users in order to delete tag from their tags array
  User.find({ '_id': { $in: this.users}}, (error, users) => {
    if(error)
      return res.status(BAD_REQUEST).send({ message: 'Bad Request'});
    users.forEach((user, index) => {
      user.tags.pull(this.id);
      user.save();
    });
  });
  next();
});

module.exports = mongoose.model('Tag', TagSchema);


