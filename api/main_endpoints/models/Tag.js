const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = new Schema(
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
        default: 'Gray'
    }
}
);

module.exports = mongoose.model('Tag', Tag);

