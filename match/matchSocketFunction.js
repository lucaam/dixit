const matchService = require("./matchService");
// const matchServiceRedis = require("./matchServiceRedis");

const userService = require("../user/userService");
const e = require("express");
// const userServiceRedis = require("../user/userServiceRedis.js");

function assignCards(user, match) {
    return new Promise((resolve, reject) => {
        matchService.getMatchByName(match.name).then(function(updatedMatch) {
            console.log(updatedMatch);
            var extractedCards;

            if (user.cards == undefined) {
                extractedCards = matchService.extractCards(updatedMatch, 6);
                user.cards = extractedCards;
            } else {
                console.log("User.cards siuze: " + user.cards.length);
                extractedCards = matchService.extractCards(updatedMatch, 1);
                user.cards.push(extractedCards[0]);
                console.log("carta estratta is" + extractedCards[0].name);
            }


            console.log("Extracted cards for username: " + user.username);
            matchService.updateUserCards(updatedMatch, user);

            matchService.removeCardsFromMatch(updatedMatch, extractedCards);

            if (user.username == match.narrator.username) {
                console.log("Updating narrator cards");
                matchService.updateNarratorCards(updatedMatch, user);
            } else {
                console.log("Normal user cards cards");
            }

            return resolve(user);
        });
    });
}

function incrementActualPlayers(match) {
    return matchService.incrementActualPlayers(match.name, 1);
}

function readyToStart(matchName) {
    return new Promise((resolve, reject) => {
        matchService.getMatchByName(matchName).then(function(match) {
            console.log(match.expectedPlayers);
            console.log(match.actualPlayers);
            if (match.expectedPlayers == match.actualPlayers) {
                return resolve(true);
            }
            return reject(false);
        });
    });
}

function addCardOnTable(matchName, card) {
    return matchService.addCardOnTable(matchName, card);
}

function selectCardOnTable(matchName, card, user) {
    return matchService.selectCardOnTable(matchName, card, user);
}

function startTurn(matchName) {
    return new Promise((resolve, reject) => {
        matchService.getMatchByName(matchName).then(function(result) {

            if (result.cardsOnTable != undefined) {
                if (result.cardsOnTable.length == result.expectedPlayers) {
                    // Turn can start, players can select cards on table
                    console.log("turn can start");

                    return resolve(result);
                } else {
                    console.log("turn cannot start");

                    return reject(false);
                }
            } else {
                console.log("turn cannot start cardsontableundefined");

                return reject(false);
            }
        });
    });
}

function endTurn(matchName) {
    return new Promise((resolve, reject) => {
        var selectedCards = 0;
        matchService.getMatchByName(matchName).then(function(result) {
            console.log("List of cards I am evaluating " + result.cardsOnTable);
            for (let card in result.cardsOnTable) {
                console.log("Evaluating: " + result.cardsOnTable[card]);

                if (result.cardsOnTable[card].selected != undefined) {
                    selectedCards += result.cardsOnTable[card].selected.length;
                    console.log(selectedCards + " number after adding");
                }
            }
            // Check if all players selected one card (minus the narrator)
            console.log("Expected players -1 " + (result.expectedPlayers - 1));
            if (selectedCards == result.expectedPlayers - 1) {
                console.log("resolved");
                return resolve(result);
            } else {
                console.log("not resolved");

                return reject(false);
            }
        });
    });
}

function setNewNarrator(match) {
    var actualNarrator = match.narrator;
    console.log("actual narrator is : " + actualNarrator.username);
    var actualNarratorIndex = findUserByUsername(actualNarrator, match.users);
    console.log("actual narrator index = " + actualNarratorIndex);

    var newNarratorIndex = (actualNarratorIndex + 1) % match.users.length;
    console.log("new narrator index= " + newNarratorIndex);
    match.narrator = match.users[newNarratorIndex];
    console.log("new narrator is = " + match.narrator);

    matchService.setNarrator(match.name, match.narrator);

    console.log("Narrator found = " + match.narrator.username);
    return match;
}

// Help find a user by username inside an array of users
function findUserByUsername(user, users) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == user.username) {
            return i;
        }
    }
    return -1;
}

function removeSelectedCard(user, match) {

    var cardFoundIndex
    for (let c = 0; match.cardsOnTable.length > c; c++) {
        for (let d = 0; user.cards.length > d; d++) {
            if (match.cardsOnTable[c].name == user.cards[d].name) {
                cardFound = user.cards[d]
                break;
            }
        }
    }
    if (cardFound != undefined) {
        console.log("card to be removed: " + cardFound + " the index is " + user.cards.indexOf(cardFound));

        user.cards.splice(user.cards.indexOf(cardFound), 1);

        console.log("user.cards.length should be 1 and is = " + user.cards.length);

        matchService.updateUserCards(match, user);
        return user;

    } else {
        console.log("Problema, nessuna carta trovata")
    }

}

// Says if a card belongs to the narrator
function belongsToNarrator(narrator, card) {
    if (narrator.cards.filter((x) => x.name == card.name).length != 0) {
        console.log("return true appartiene al narratore " + card.name);
        return true;
    }

    console.log("Non appartiere al narratore");
    return false;
}

function cleanTable(match) {
    match.cardsOnTable = [];

    matchService.cleanCardOnTable(match);

    return match;
}

// Givean a match, update all players with new scores and return the match updated
function assignPoints(match) {
    console.log(
        "func assignPoints, I have to evaluate #" + match.users.length + " users"
    );
    for (let i = 0; i < match.users.length; i++) {
        var user = match.users[i];
        console.log(
            "Actual user in for is " + user.username + " with score " + user.score
        );
        console.log("Actual iterator num " + i);

        if (user.username == match.narrator.username) {
            // Evaluating narrator user
            console.log(user.username + " is the narrator ");
            for (let k = 0; k < match.cardsOnTable.length; k++) {
                var narratorCard = match.cardsOnTable[k];
                console.log("actual card in for: " + narratorCard.name);
                if (belongsToNarrator(match.narrator, narratorCard)) {
                    console.log("This card belongs to the narrator");

                    console.log("match.expectedPlayers " + match.expectedPlayers);

                    if (narratorCard.selected != undefined) {
                        if (narratorCard.selected.length == match.expectedPlayers - 1) {
                            // 0 points to narrator
                            // All players selected his card
                            console.log("Everyone selected the narrator's card");
                            // continue
                        } else if (narratorCard.selected.length == 0) {
                            // 0 points to narrator
                            // No one selected his card
                            console.log("No one selected the narrator's card");
                            // continue
                        } else {
                            // 3 points to the narrator
                            // At least one player selected his card but not everyone
                            console.log(
                                "Not everyone selected the narrator's card, earns: " +
                                narratorCard.selected.length
                            );
                            // Narrator earns
                            console.log("user.score before sum" + user.score);
                            if(match.users.length > 6){
                                user.score = user.score + 4;
                            }
                            else if(match.users.length > 8){
                                user.score = user.score + 5;
                            }
                            else if(match.users.length > 10){
                                user.score = user.score + 6;
                            }else if(match.users.length < 7 ){
                                user.score = user.score + 3;
                            }
                            // continue
                        }
                    } else {
                        console.log("No one selected the narrator's card");
                        // continue
                    }
                }
            }
        } else {
            console.log("not the narrator");
            // If normal user
            for (let z = 0; z < match.cardsOnTable.length; z++) {
                console.log("z index = " + z);
                console.log(
                    match.cardsOnTable.length + " lunghezza delle carte sul tavolo"
                );

                var card = match.cardsOnTable[z];
                console.log(
                    match.cardsOnTable[z] + " carta  sul tavolo attualmente selezionata"
                );

                if (card.selected != undefined) {
                    if (
                        card.selected.filter((ob) => ob.username == user.username).length >
                        0
                    ) {
                        console.log(
                            "user " + user.username + " selected card " + card.name
                        );

                        // The current user selected the card
                        if (belongsToNarrator(match.narrator, card)) {
                            // The user selected the right card, earns 2 points

                            user.score = user.score + 2;
                        } if (card.selected.length > 0) {
                            // Someone selected the user's card
                            // He earns as many points as the selected number

                            user.score = user.score + card.selected.length;
                        }

                        console.log(
                            "Evaluating points for user " + user.username + " done"
                        );
                        // continue;
                    } else {
                        console.log(
                            "user " + user.username + " NOT SELECTED card " + card.name
                        );
                    }
                } else {
                    console.log(
                        "card.selected is undefined so no one selected that card"
                    );
                }
            }
        }

        match.users[i] = user;
        matchService.updateUserScore(match, user);
        console.log("updated match.users for this specific user");
    }

    console.log("returning match");
    return match;
}

function removeUsersCards(match) {
    return new Promise((resolve, reject) => {
        for (let a = 0; a < match.users.length; a++) {
            var user = removeSelectedCard(match.users[a], match);
            match.users[a] = user;
        }
        return resolve(match);
    });
}

function assignCardsUsers(match) {
    var newMatch = match;
    var promises = [];
    return new Promise((resolve, reject) => {
        for (let b = 0; b < newMatch.users.length; b++) {
            promises.push(
                assignCards(newMatch.users[b], newMatch).then(function(user) {
                    newMatch.users[b] = user;
                    console.log(
                        newMatch.users[b].cards.length +
                        "  newMatch.users[b].cards lenght dentro assigncards"
                    );

                    console.log(user.cards.length + " cards lenght dentro assigncards");
                })
            );
        }
        console.log(
            newMatch.users[0].cards.length +
            " before return newMatch.users[0].cards lenght dentro assigncards"
        );

        return Promise.all(promises).then(() => {
            return resolve(newMatch);
        });
    });
}

function endMatch(match) {
    var moreThan30 = match.users.filter((user) => user.score >= 30);
    if (moreThan30.length > 0) {
        if (moreThan30.length == 1) {
            console.log("1 player ha vinto: " + moreThan30[0].username);
            console.log(moreThan30)
            moreThan30[0].victories += 1
            userService.setVictories(moreThan30[0].id, moreThan30[0].victories)
        }

        if (moreThan30.length > 1) {
            console.log("Diversi giocatori sono arrivati a 30", moreThan30);
            moreThan30.forEach(element => {
                element.victories += 1
                userService.setVictories(element.id, element.victories)
            });
        }
        // Bisogna settare le sconfitte

        var filteredWithLosers = match.users.filter(function(x) { 
            return moreThan30.indexOf(x) < 0;
          });

          filteredWithLosers.forEach(element => {
              element.defeats += 1
              userService.setDefeats(element.id, element.defeats)
          });

        return moreThan30;

    }

    if (match.cards.length == 0 || match.cards.length < match.users.length) {
        console.log(
            "carte terminate oppure carte non sufficienti per un nuovo turno"
        );
        var userHighestScore = match.users.reduce((a, b) =>
            a.score > b.score ? a : b
        )

        if (userHighestScore.length == 1) {
            console.log("1 player ha vinto: " + userHighestScore[0].username);
            console.log(userHighestScore)
            userHighestScore[0].victories += 1
            userService.setVictories(userHighestScore[0].id, userHighestScore[0].victories)
        }

        if (userHighestScore.length > 1) {
            console.log("Diversi giocatori hanno vinto", userHighestScore);
            userHighestScore.forEach(element => {
                element.victories += 1
                userService.setVictories(element.id, element.victories)
            });
        }

        // Bisogna settare le sconfitte
        var filteredWithLosersCards = match.users.filter(function(x) { 
            return userHighestScore.indexOf(x) < 0;
          });

          filteredWithLosersCards.forEach(element => {
              element.defeats += 1
              userService.setDefeats(element.id, element.defeats)
          });

        return userHighestScore;

    }

    console.log("Non termina il match");
    return false;
}

module.exports = {
    assignCards,
    incrementActualPlayers,
    readyToStart,
    addCardOnTable,
    selectCardOnTable,
    endTurn,
    startTurn,
    setNewNarrator,
    removeSelectedCard,
    assignPoints,
    cleanTable,
    removeUsersCards,
    assignCardsUsers,
    endMatch,
};