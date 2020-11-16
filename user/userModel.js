const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('../card/cardModel').schema

const userSchema = new Schema({
    name : {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum : ['user','admin'],
        required: false,
        default: "user"
    },
    cards: {
        type: [Card],
        required: false
    },
    card: {
        type: Card,
        required: false
    },
    score:{
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema);