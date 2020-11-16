const matchRepository = require('./matchRepository');
const mongoose = require('mongoose');

function getMatch(id) {
    return matchRepository.getMatch(id);
}

function getMatches() {
    return matchRepository.getMatches();
}

function getMatchByName(name) {
    return matchRepository.getMatchByName(name);
}

function createMatch(name) {
    return matchRepository.createMatch(name)
}

function deleteMatch(id) {
    return matchRepository.deleteMatch(id)
}

function addUserToMatch(name, user) {
    return matchRepository.addUserToMatch(name, user)
}


module.exports = { getMatch, getMatches, createMatch, deleteMatch, getMatchByName, addUserToMatch }