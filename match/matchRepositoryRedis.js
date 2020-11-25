const client = require('../database/init_redis');

function getMatchByName(name) {
    return JSON.parse(client.get("matches:"+name))
}

function setMatch(match) {
    return client.set("matches:"+match.name, JSON.stringify(match))
}

function deleteMatchByName(name) {
    return client.del("matches:"+name)
}

// function addUserToMatch(name, user) {

//     return Match.updateOne({ name: name }, { $push: {users: user } }).exec();
// }

// function addCardOnTable(name, card) {
//     return Match.updateOne({ name: name }, { $push: {cardsOnTable: card } }).exec();
// }

// function selectCardOnTable(name, card, user) {
//     return Match.updateOne({ name: name }, { $push: {"cardsOnTable.$[el].selected": user } }, {arrayFilters: [{"el.name": card.name}], new: true}).exec();
// }

// function setNarrator(name, user) {
//     return Match.updateOne({ name: name }, { $set: {narrator: user } }).exec();
// }

// function setCards(name, cards) {
//     return Match.updateOne({ name: name }, { $set: { cards: cards } }).exec();
// }

// function incrementActualPlayers(name, number) {
//     console.log(name, number)
//     return Match.updateOne({ name: name }, { $inc: { actualPlayers: number } }).exec();

// }

// function updateUserCards(match, user){
//     console.log("updating user cards")
//     return Match.updateOne({name: match.name}, {$set: {"users.$[el].cards": user.cards}}, {arrayFilters: [{"el.username": user.username}]} ).exec()
// }

// function updateNarratorCards(match, user) {
//     console.log("updating narrator cards")
//     return Match.updateOne({name: match.name}, {$set: {"narrator.cards": user.cards}} ).exec()
    
    
// }

// function cleanCardOnTable(match) {
//     console.log("cleaning cards on table")
//     return Match.updateOne({name: match.name}, {$set: {cardsOnTable: []}} ).exec()
// }

// function removeCardsFromMatch(match, cards) {
//     // return Match.updateOne({name: match.name}, {$pull: {"cards": {$in: cards}}} ).exec()
//     // Ma sta cosa se po fa?? Bleee
//     return Match.updateOne({name: match.name}, {$pull: {"cards": {"$or": cards}}} ).exec()
// }

// module.exports = { removeCardsFromMatch, cleanCardOnTable, updateNarratorCards, getMatches, setMatch, deleteMatch, getMatchByName, addUserToMatch, setCards, incrementActualPlayers, selectCardOnTable, setNarrator, addCardOnTable, updateUserCards}
module.exports = {setMatch, getMatchByName, deleteMatchByName}