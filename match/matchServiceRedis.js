const matchRepositoryRedis = require ('./matchRepositoryRedis.js')


function getMatchByName(name) {
    return matchRepositoryRedis.getMatchByName(name);
}

function setMatch(match) {
    return matchRepositoryRedis.setMatch(match)
}

function deleteMatchByName(name) {
    return matchRepositoryRedis.deleteMatch(name)
}

// function addUserToMatch(match, user) {

//     return matchRepositoryRedis.setMatch(match)
// }

// function incrementActualPlayers(name, number) {
//     return matchRepositoryRedis.incrementActualPlayers(name, number)
// }

// function setNarrator(name, user) {
//     return matchRepositoryRedis.setNarrator(name, user)
// }
// function setCards(name, cards) {

//     return matchRepositoryRedis.setCards(name, cards)
// }

function extractCards(match, number){

    var extractedCards = []
    for(var m = 0; m < number; m++){
        var randomNumber = Math.floor(Math.random() * (match.cards.length))
        console.log("numero scelto " + randomNumber)
        var cardSelected = match.cards[randomNumber]
        extractedCards.push(cardSelected)
        match.cards.splice(randomNumber, 1)
    }

    console.log("Estrazione carte terminata")
    return extractedCards

}

// function addCardOnTable(name, card) {
//     return matchRepositoryRedis.addCardOnTable(name, card)
    
// }

// function selectCardOnTable(name, card, user) {
//     return matchRepositoryRedis.selectCardOnTable(name, card, user)
    
// }

// function updateUserCards(match, user) {
//     return matchRepositoryRedis.updateUserCards(match, user)
    
// }

// function updateNarratorCards(match, user){
//     return matchRepositoryRedis.updateNarratorCards(match, user)
// }

// function cleanCardOnTable(match) {
//     return matchRepositoryRedis.cleanCardOnTable(match)
// }

// function removeCardsFromMatch(match, cards){
//     return matchRepositoryRedis.removeCardsFromMatch(match, cards);
// }

// module.exports = { removeCardsFromMatch, cleanCardOnTable, updateNarratorCards, getMatches, createMatch, deleteMatch, getMatchByName, addUserToMatch, setCards, extractCards, incrementActualPlayers, setNarrator, addCardOnTable, selectCardOnTable, updateUserCards}
module.exports = {extractCards, setMatch, getMatchByName, deleteMatchByName}