const match = require('./matchModel');
const mongoose = require('mongoose');

function getMatch(id) {
    return match.findById(id).exec();
}

function getMatches() {
    return match.find().exec
}

function getMatchByName(name) {
    return match.findOne({ name: name }).exec();
}

function createMatch(name) {
    const match = new match({
        name: name,
    })
    return match.save();
}

function deleteMatch(id) {
    return match.findOneAndDelete(id).exec();
}

function addUserToMatch(name, user) {
    return match.updateOne({ name: name }, { $push: user });
}


module.exports = { getMatch, getMatches, createMatch, deleteMatch, getMatchByName, addUserToMatch }