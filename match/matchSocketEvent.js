const matchLogic = require('./matchSocketFunction')
const Match = require('./matchModel')
function hello(socket) {

    socket.on('hello', function() {
        socket.emit('hello', { message: "Hello man!" })
    })

};

function addCardOnTable(socket) {
    socket.on('addCardOnTable', function(data) {

        // Update card on table
        matchLogic.addCardOnTable(data.match.name, data.card)

        // Tell everyone that a new card is available on the table
        socket.to(data.match.name).emit('newCardOnTable', data.card)
    })
}

function selectCard(socket) {
    socket.on('selectCard', function(data) {

        var cardSelected = data.card
        // Update card on table
        matchLogic.selectCardOnTable(data.match.name, cardSelected)

        // Tell everyone that a new card is available on the table
        socket.to(data.match.name).emit('newCardSelected', cardSelected)
        console.log("before evaluating turn end")
        matchLogic.endTurn(data.match.name).then(function (result) {
                console.log("Turn can end with new match data " + result)
        }).catch((error) => console.log("should continue turn"))
        
        
    
    })
}

function readyToPlay(socket, io) {
    // Data must contain the 2 objects: user, match
    socket.on('readyToPlay', function(data) {

        // Tell everyone which user is ready
        socket.to(data.match.name).emit('newUserReady', data.user)
        
        // Sending back to the user his object with cards assigned
        var userWithCards = matchLogic.assignCards(data.user, data.match)
        socket.to(data.match.name).emit('assignedCards', userWithCards)

        // match updated wit new player ready
        matchLogic.incrementActualPlayers(data.match)

        // When expectedPlayers is equals to actualPlayers the match should start
        if(matchLogic.readyToStart){
            io.in(data.match.name).emit("readyToStart");

        }

    })
}



module.exports = { hello, addCardOnTable, readyToPlay, selectCard}