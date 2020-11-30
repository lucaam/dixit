const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('../card/cardModel').schema

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    surname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    username: {
        type: String,
        required: true,
        min: 4,
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
        min: 8
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
        enum: ['user', 'admin'],
        required: false,
        default: "user"
    },
    cards: {
        type: [Card],
        required: false,
        default: undefined

    },
    card: {
        type: Card,
        required: false
    },
    score: {
        type: Number,
        required: false,
        default: 0
    },
    victories: {
        type: Number,
        default: 0,
        required: false
    },
    defeats: {
        type: Number,
        default: 0,
        required: false
    }

});

module.exports = mongoose.model('User', userSchema);