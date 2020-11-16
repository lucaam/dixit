const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('../card/cardModel').schema
const User = require('../user/userModel').schema

const roundSchema = new Schema({
    name : {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    lastAccess: {
        type: Date,
        default: Date.now
    },
    cards: {
        type: [Card],
        required: false
    },
    card: {
        type: Card,
        required: false
    },
    users: {
        type: [User],
        required: false
    },
    goal:{
        type: Number,
        required: false,
        default: 30
    }
});

module.exports = mongoose.model('Round', roundSchema);