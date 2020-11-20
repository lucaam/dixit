const mongoose = require('mongoose');
const Match = require('./matchModel');

function getMatch(id) {
    return Match.findById(id).exec();
}

function getMatches() {
    return Match.find().exec();
}

function getMatchByName(name) {
    return Match.findOne({ name: name }).exec();
}

function createMatch(name, expectedPlayers) {

    const match = new Match({
        name: name,
        expectedPlayers: expectedPlayers
    })
    return match.save();
   
}

function deleteMatch(id) {
    return Match.findOneAndDelete(id).exec();
}

function addUserToMatch(name, user) {
    return Match.updateOne({ name: name }, { $push: {users: user } }).exec();
}

function addCardOnTable(name, card) {
    return Match.updateOne({ name: name }, { $push: {cardsOnTable: card } }).exec();
}

function selectCardOnTable(name, card, user) {
    return Match.updateOne({ name: name }, { $push: {"cardsOnTable.$[el].selected": user } }, {arrayFilters: [{"el.name": card.name}], new: false}).exec();
}

function setNarrator(name, user) {
    return Match.updateOne({ name: name }, { $set: {narrator: user } }).exec();
}

function setCards(name, cards) {
    return Match.updateOne({ name: name }, { $set: { cards: cards } }).exec();
}

function incrementActualPlayers(name, number) {
    console.log(name, number)
    return Match.updateOne({ name: name }, { $inc: { actualPlayers: number } }).exec();

}

module.exports = { getMatch, getMatches, createMatch, deleteMatch, getMatchByName, addUserToMatch, setCards, incrementActualPlayers, selectCardOnTable, setNarrator, addCardOnTable}