const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('../card/cardModel').schema
const User = require('../user/userModel').schema

const matchSchema = new Schema({
    name: {
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
    endDate: {
        type: Date,
    },
    narrator: {
        type: User,
        required: false
    },
    cards: {
        type: [Card],
        required: false
    },
    users: {
        type: [User],
        required: false
    },
    goal: {
        type: Number,
        required: false,
        default: 30
    },
    actualPlayers: {
        type: Number,
        required: false,
        default: 0
    },
    expectedPlayers: {
        type: Number,
        required: true
    },
    cardsOnTable: {
        type: [Card],
        required: false
    }
    

});

module.exports = mongoose.model('Match', matchSchema);