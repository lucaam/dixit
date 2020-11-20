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

function createMatch(name, expectedPlayers) {
    return matchRepository.createMatch(name, expectedPlayers)
}

function deleteMatch(id) {
    return matchRepository.deleteMatch(id)
}

function addUserToMatch(name, user) {
    return matchRepository.addUserToMatch(name, user)
}

function incrementActualPlayers(name, number) {
    return matchRepository.incrementActualPlayers(name, number)
}

function setNarrator(name, user) {
    return matchRepository.setNarrator(name, user)
}
function setCards(name, cards) {

    return matchRepository.setCards(name, cards)
}

function extractCards(match, number){

    var extractedCards = []
    for(var i = 0; i < number; i++){
        var randomNumber = Math.floor(Math.random() * (match.cards.length))
        console.log("numero scelto " + randomNumber)
        var cardSelected = match.cards[randomNumber]
        console.log(cardSelected)
        extractedCards.push(cardSelected)
        match.cards.splice(randomNumber, 1)
    }

    console.log(setCards(match.name, match.cards))
    return extractedCards

}

function addCardOnTable(name, card) {
    return matchRepository.addCardOnTable(name, card)
    
}

function selectCardOnTable(name, card, user) {
    return matchRepository.selectCardOnTable(name, card, user)
    
}

module.exports = { getMatch, getMatches, createMatch, deleteMatch, getMatchByName, addUserToMatch, setCards, extractCards, incrementActualPlayers, setNarrator, addCardOnTable, selectCardOnTable}