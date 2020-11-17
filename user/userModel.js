const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Card = require('../card/cardModel').schema

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    surname: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    username: {
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
        enum: ['user', 'admin'],
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


userSchema.post('init', function(doc) {
    console.log('%s has been initialized from the db', doc._id);
});
userSchema.post('validate', function(doc) {
    console.log('%s has been validated (but not saved yet)', doc._id);
});
userSchema.post('save', function(doc) {
    console.log('%s has been saved', doc._id);
});
userSchema.post('remove', function(doc) {
    console.log('%s has been removed', doc._id);
});

module.exports = mongoose.model('User', userSchema);