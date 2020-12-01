const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../user/userModel').schema

const cardSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    picture: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    selected: {
        type: [User],
        required: false,
        default: undefined
    }

});

module.exports = mongoose.model('Card', cardSchema);