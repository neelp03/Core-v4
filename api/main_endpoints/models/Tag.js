const mongoose = require('mongoose');
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
        }
    }
);

module.exports = mongoose.model('Tag', TagSchema);


