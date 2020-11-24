const matchService = require("./matchService");
const userService = require("../user/userService");

function assignCards(user, match) {
  var extractedCards = matchService.extractCards(match, 2);
  console.log("User.card = " + user.cards)
  user.cards = extractedCards;
  console.log("Extracted cards for username: " + user.username);
  matchService.updateUserCards(match, user);
  
  var resultremovecards = matchService.removeCardsFromMatch(match, extractedCards)
  console.log(resultremovecards + " risultato query rimozione")


  if (user.username == match.narrator.username) {
    console.log("Updating narrator cards")
    matchService.updateNarratorCards(match, user);
  } else {
    console.log("Normal user cards cards")

  }

  return user;
}

function incrementActualPlayers(match) {
  return matchService.incrementActualPlayers(match.name, 1);
}

function readyToStart(matchName) {
  return new Promise((resolve, reject) => {
    matchService.getMatchByName(matchName).then(function (match) {
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
    matchService.getMatchByName(matchName).then(function (result) {
      console.log("number of cards on table = " + result.cardsOnTable.length);
      console.log("number exprected players = " + result.expectedPlayers);

      if (result.cardsOnTable.length == result.expectedPlayers) {
        // Turn can start, players can select cards on table
        console.log("turn can start");

        return resolve(result);
      } else {
        console.log("turn cannot start");

        return reject(false);
      }
    });
  });
}

function endTurn(matchName) {
  return new Promise((resolve, reject) => {
    var selectedCards = 0;
    matchService.getMatchByName(matchName).then(function (result) {
      console.log("List of cards I am evaluating " + result.cardsOnTable);
      for (var card in result.cardsOnTable) {
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
  for (var i = 0; i < users.length; i++) {
    if (users[i].username == user.username) {
      return i;
    }
  }
  return -1;
}

function removeSelectedCard(user, match) {
   
  var cardFound = match.cardsOnTable.find(card => user.cards.includes(card))
  console.log("card to be removed: " + cardFound)

  user.cards.splice(cardFound, 1);

  console.log("user.cards.length should be 1 and is = " + user.cards.length)

  matchService.updateUserCards(match, user);
  return user;

}

// Says if a card belongs to the narrator
function belongsToNarrator(narrator, card) {
  if (narrator.cards.filter((x) => x.name == card.name).length != 0) {
    console.log("return true card " + card.name);
    return true;
  }

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
    "I am in assignPoints func, I have to evaluate #" + match.users.length
  );
  for (var i = 0; i < match.users.length; i++) {
    var user = match.users[i];
    console.log("Actual user in for is " + user.username);
    if (user.username == match.narrator.username) {
      // Evaluating narrator user
      console.log(user.username + " is the narrator ");
      console.log("Mie cardsontable = " + match.cardsOnTable);
     for(var k=0; k < match.cardsOnTable.length; k++ ){
       var narratorCard = match.cardsOnTable[k]
        console.log("actual card in for: " + narratorCard.name);
        if (belongsToNarrator(match.narrator, narratorCard)) {
          console.log("This card belongs to the narrator");
          console.log("and this is the object " + narratorCard);

          if (narratorCard.selected.length == match.expectedPlayers - 1) {
            // 0 points to narrator
            // All players selected his card
            console.log("Everyone selected the narrator's card");
          } else if (narratorCard.selected.length == 0) {
            // 0 points to narrator
            // No one selected his card
            console.log("No one selected the narrator's card");
          } else {
            // 3 points to the narrator
            // At least one player selected his card but not everyone
            console.log(
              "Not everyone selected the narrator's card, earns: " +
                narratorCard.selected.length
            );
            // Narrator earns
            user.score += narratorCard.selected.length;
          }
        }
      }
    } else {
      // If normal user
      for (var x = 0; x < match.cardsOnTable.length; x++) {
        var card = match.cardsOnTable[x];
        if (
          card.selected.filter((x) => x.username == user.username).length > 0
        ) {
          console.log("user " + user.username + " selected card " + card.name);
          console.log(
            "filter lenght = " +
              card.selected.filter((x) => x.username == user.username).length
          );
          // The current user selected the card
          if (belongsToNarrator(match.narrator, card)) {
            // The user selected the right card, earns 2 points
            console.log("User selected the narrator's card he earns 2 points");

            user.score += 2;
            console.log(user.score + " actual score for " + user.username);
          } else if (card.selected.length > 0) {
            // Someone selected the user's card
            // He earns as many points as the selected number
            console.log(
              "Someone selected the users's card he earns " +
                card.selected.length +
                " points"
            );

            user.score += card.selected.length;
          }

          console.log("Evaluating points for user " + user.username + " done");
          break;
        } else {
          console.log(
            "user " + user.username + " NOT SELECTED card " + card.name
          );
          continue;
        }
      }
    }

    console.log("finding index");
    var objIndex = match.users.findIndex(
      (obj) => obj.username == user.username
    );

    match.users[objIndex] = user;

    console.log("updated match.users for this specific user");
  }

  console.log("returning match");
  return match;
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
};
