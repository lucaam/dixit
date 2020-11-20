const matchService = require('./matchService')
const userService = require('../user/userService')

function assignCards(user, match){
    var extractedCards = matchService.extractCards(match, 2)
    user.cards = extractedCards
    console.log("Extracted cards for user:" + user.name)
    console.log(extractedCards)
    userService.setCards(user._id, extractedCards)
    return user
}

function incrementActualPlayers(match){
    return matchService.incrementActualPlayers(match.name, 1)
}

function readyToStart(matchName){
    return new Promise((resolve, reject) => {
        matchService.getMatchByName(matchName).then(function (match) {
            console.log(match.expectedPlayers)
            console.log(match.actualPlayers)
            if(match.expectedPlayers == match.actualPlayers){
                return resolve(true)
            }
            return reject(false)
        })
    })

    
}

function addCardOnTable(matchName, card){
    return matchService.addCardOnTable(matchName, card)
}

function selectCardOnTable(matchName, card, user){
    return matchService.selectCardOnTable(matchName, card, user)
}

function endTurn(matchName) {
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

function setNewNarrator(match){

    var actualNarrator = match.narrator
    console.log("actual narrator is : " + actualNarrator.name)
    var actualNarratorIndex = match.users.indexOf(actualNarrator)
    console.log('actual narrator index' + actualNarratorIndex)
    var newNarratorIndex = (actualNarratorIndex + 1) % match.users.lenght

}

function assignPointsNarrator(match){

    var narratorCards = match.narrator.cards

    for(var card in narratorCards){
        if(card.selected.length == match.expectedPlayers - 1){
            // 0 points to narrator
            // All players selected his card

        }
        if (card.selected.lenght == 0){
            // 0 points to narrator
            // No one selected his card

        }
        

        // 3 points to the narrator
        // At least one player selected his card but not everyone
        
        
        
    }
    
}

function belongsToNarrator(narrator, card){
    // Says if a card belongs to the narrator
    if(narrator.cards.indexOf(card)){
        return true
    }
    return false
}

function assignPointsPlayers(match){


    for(var user in match.users){
        for(var card in match.cardsOnTable){
            if(card.selected.indexOf(user)){
                // The current user selected the card
                
                if(belongsToNarrator(match.narrato, card)){
                    // The user selected the right card, earns 2 points

                }
                if(card.selected.lenght > 0){
                    // Someone selected the user's card
                    // He earns as many points as the selected number
                }
            }
        }
    }
    
}

module.exports = {assignCards, incrementActualPlayers, readyToStart, addCardOnTable, selectCardOnTable, endTurn}