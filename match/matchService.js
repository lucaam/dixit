const mongoose = require('mongoose');
const matchRepository = require('./matchRepository');
const cardService = require('../card/cardService');

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

function setCards(name) {
    const cards = cardService.getCards()   
    return matchRepository.setCards(name, cards)
}


module.exports = { getMatch, getMatches, createMatch, deleteMatch, getMatchByName, addUserToMatch, setCards}