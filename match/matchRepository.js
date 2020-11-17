const mongoose = require('mongoose');
const Match = require('./matchModel');

function getMatch(id) {
    return Match.findById(id).exec();
}

function getMatches() {
    return Match.find();
}

function getMatchByName(name) {
    return Match.findOne({ name: name }).exec();
}

function createMatch(name, cards) {

    const match = new Match({
        name: name
    })
    return match.save();
   
}

function deleteMatch(id) {
    return Match.findOneAndDelete(id).exec();
}

function addUserToMatch(name, user) {
    return Match.updateOne({ name: name }, { $push: {users: user } });
}

function setCards(name, cards) {
    return Match.updateOne({ name: name }, { $set: { cards: cards } });
}


module.exports = { getMatch, getMatches, createMatch, deleteMatch, getMatchByName, addUserToMatch, setCards}