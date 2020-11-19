const matchService = require('./matchService')
const userService = require('../user/userService')

function assignCards(user, match){
    var extractedCards = matchService.extractCards(match, 2)
    user.cards = extractedCards
    userService.setCards(user._id, extractedCards)
    return user
}

function incrementActualPlayers(match){
    return matchService.incrementActualPlayers(match.name, 1)
}

function readyToStart(match){
    if(match.expectedPlayers == match.actualPlayers){
        return true
    }
    return false
}

function addCardOnTable(matchName, card){
    return matchService.addCardOnTable(matchName, card)
}

function selectCardOnTable(matchName, card){
    return matchService.selectCardOnTable(matchName, card)
}

function endTurn(matchName) {
    console.log("before new promise")
    return new Promise((resolve, reject) => {
        var selectedCards = 0
        matchService.getMatchByName(matchName).then(function (result) {
            for(var i in result.cardsOnTable){
    
                selectedCards+= result.cardsOnTable[i].selected
                // Check if all players selected one card (minus the narrator)
                if(selectedCards == result.expectedPlayers - 1){
                    return resolve (result)
                }else {
                    return reject(false)
                }
                
            }
        })
       
    });

    
   
}

module.exports = {assignCards, incrementActualPlayers, readyToStart, addCardOnTable, selectCardOnTable, endTurn}