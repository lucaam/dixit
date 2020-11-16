const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    picture: {
        type: String,
        required: true,
        min: 1,
        max: 255
    }
});

module.exports = mongoose.model('Card', cardSchema);