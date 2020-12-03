const matchLogic = require("./matchSocketFunction");
const Match = require("./matchModel");

const User = require('../user/userModel')
const Card = require('../card/cardModel')


function hello(socket, io) {
    socket.on("hello", function() {
        socket.emit("hello", { message: "Hello man!" });
    });
}

function addCardOnTable(socket, io) {
    socket.on("addCardOnTable", function(data) {
        // Update card on table
        matchLogic.addCardOnTable(data.match.name, data.card);

        // Tell everyone that a new card is available on the table
        socket.to(data.match.name).emit("newCardOnTable", data.card);


        matchLogic
            .startTurn(data.match.name)
            .then(function(result) {
                // Se il numero di carte sul tavolo e' uguale al numero di giocatori allora gli utenti possono selezionare le carte
                console.log("Turn can start before emit ");

                io.in(data.match.name).emit("turnStart", result)
                console.log("Turn can start after emit " + result);
            })
            .catch((error) =>
                console.log("Turn cannot start")
            );
    });
}

function forceTurnStart(socket, io) {
    socket.on("forceTurnStart", function(data) {
        // Update card on table

        // Tell everyone that a new card is available on the table
        io.in(data.match.name).emit("turnStart", data)



    });
}

function forceTurnEnd(socket, io) {
    socket.on("forceTurnEnd", function(data) {
        // Update card on table

        matchLogic
            .endTurn(data.match.name)
            .then(function(result) {


                console.log("Posso far terminare il turno e preparare il nuovo turno")

                // Match can stop and we can evaluate who took how many points

                // Assegnare i punti

                var matchUpdated = matchLogic.assignPoints(result)

                console.log("Before set new narrator")
                    // Nuovo narratore
                matchUpdated = matchLogic.setNewNarrator(matchUpdated);
                console.log("After set new narrator")




                matchLogic.removeUsersCards(matchUpdated).then(function(update) {
                    console.log("Afgter removeSelectedCard from user")

                    // Assegnare nuove carte utenti

                    matchLogic.assignCardsUsers(update).then(function(update1) {
                        console.log("Afgter assign cards update1 length user[]0" + update1.users[0].cards.length)

                        console.log("Afgter assign cards from user")

                        matchUpdated = matchLogic.cleanTable(update1)
                        console.log("Afgter assign cards cards length user[]0" + matchUpdated.users[0].cards.length)

                        console.log("Afgter clean table")
                        var matchEndUsers = matchLogic.endMatch(matchUpdated);
                        if (matchEndUsers != false) {
                            io.in(data.match.name).emit("endMatch", matchEndUsers)
                            console.log("Match ended: ", matchEndUsers);

                        } else if (matchEndUsers == false) {
                            io.in(data.match.name).emit("turnEnded", matchUpdated)
                            console.log("Turn ended with match updated: ");

                        }


                    })

                })


            })
            .catch((error) =>
                // Match should continue
                console.log("Turn shuld continue")
            );



    });
}

function selectCard(socket, io) {
    socket.on("selectCard", function(data) {
        var cardSelected = data.card;
        // Update card on table
        matchLogic.selectCardOnTable(data.match.name, cardSelected, data.user);

        // Tell everyone that a new card is available on the table
        socket.to(data.match.name).emit("newCardSelected", cardSelected);
        console.log("before evaluating turn end");
        matchLogic
            .endTurn(data.match.name)
            .then(function(result) {


                console.log("Posso far terminare il turno e preparare il nuovo turno")

                // Match can stop and we can evaluate who took how many points

                // Assegnare i punti

                var matchUpdated = matchLogic.assignPoints(result)

                console.log("Before set new narrator")
                    // Nuovo narratore
                matchUpdated = matchLogic.setNewNarrator(matchUpdated);
                console.log("After set new narrator")




                matchLogic.removeUsersCards(matchUpdated).then(function(update) {
                    console.log("Afgter removeSelectedCard from user")

                    // Assegnare nuove carte utenti

                    matchLogic.assignCardsUsers(update).then(function(update1) {
                        console.log("Afgter assign cards update1 length user[]0" + update1.users[0].cards.length)

                        console.log("Afgter assign cards from user")

                        matchUpdated = matchLogic.cleanTable(update1)
                        console.log("Afgter assign cards cards length user[]0" + matchUpdated.users[0].cards.length)

                        console.log("Afgter clean table")
                        var matchEnd = matchLogic.endMatch(matchUpdated);
                        if (matchEnd != false) {
                            io.in(data.match.name).emit("endMatch", matchUpdated)
                            console.log("Match ended: ");

                        } else if (matchEnd == false) {
                            io.in(data.match.name).emit("turnEnded", matchUpdated)
                            console.log("Turn ended with match updated: ");

                        }


                    })

                })


            })
            .catch((error) =>
                // Match should continue
                console.log("Turn shuld continue")
            );

    });

    return
}

function readyToPlay(socket, io) {
    // Data must contain the 2 objects: user, match
    socket.on("readyToPlay", function(data) {

        console.log("readyToPlay");
        // Tell everyone which user is ready
        socket.to(data.match.name).emit("newUserReady", data.user);

        // Sending back to the user his object with cards assigned
        matchLogic.assignCards(data.user, data.match).then(function(userWithCards) {
            console.log("User received is + " + data.user)
            console.log("User with cards object here")
            console.log(userWithCards)
            socket.emit("assignedCards", userWithCards);

            // AGGIORANRE IL MATCH NEL CLIENT
        })



        // match updated wit new player ready
        matchLogic.incrementActualPlayers(data.match).then(function(matchWithUpdatedUser) {
            matchLogic
                .readyToStart(matchWithUpdatedUser)
                .then(function(res) {
                    console.log("prima di io.in")
                    io.in(data.match.name).emit("readyToStart", "Siamo pronti a giocare amico")
                })
                .catch((error) => console.log("Not ready to play"));
        });
    })

    // When expectedPlayers is equals to actualPlayers the match should start


    return
}


function forceTurnReady(socket, io) {
    // Data must contain the 2 objects: user, match
    socket.on("forceTurnReady", function(data) {

        console.log("forceReady");


        // match updated wit new player ready

        console.log("prima di io.in forzato")
        io.in(data.match.name).emit("readyToStart", "Siamo pronti a giocare amico - forzato")
    })


    // When expectedPlayers is equals to actualPlayers the match should start


    return
}

module.exports = { forceTurnReady, hello, addCardOnTable, readyToPlay, selectCard, forceTurnEnd, forceTurnStart };