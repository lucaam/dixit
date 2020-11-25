const express = require("express");
const router = express.Router();
const matchService = require("./matchService");
const { matchValidation, joinMatchValidation } = require("./matchValidation");
const verify = require("../user/verifyToken");
const cardService = require("../card/cardService");
const jwt = require('jsonwebtoken')


// Create match
router.post("/", verify, async(request, response) => {
    const { error } = matchValidation(request.body);

    if (error) return response.status(400).json(error.details[0].message);

    const nameExists = await matchService.getMatchByName(request.body.name);

    if (nameExists)
        return response
            .status(400)
            .send("Match with specified name already exists");

    try {
        var savedMatch = await matchService.createMatch(request.body.name, request.body.expectedPlayers);
        var decodeToken = jwt.decode(request.header('auth-token'))
        var userAdded = matchService.addUserToMatch(savedMatch.name, decodeToken.user)
        var cards = await cardService.getCards()
        
        matchService.setCards(savedMatch.name, cards)
        matchService.setNarrator(savedMatch.name, decodeToken.user)


        savedMatch.cards = cards
        savedMatch.narrator = decodeToken.user
        savedMatch.users = savedMatch.users || []
        savedMatch.users.push(decodeToken.user)
        
        response.json(savedMatch);
    } catch (err) {
        response.status(400).json({ message: err.message, error: err});
    }
});

// Create match
router.post("/join", verify, async(request, response) => {
    const { error } = joinMatchValidation(request.body);

    if (error) return response.status(400).json(error.details[0].message);

    const nameExists = await matchService.getMatchByName(request.body.name);

    if (!nameExists)
        return response
            .status(400)
            .send("Match with specified name does not exists");

    try {
        var savedMatch = await matchService.getMatchByName(request.body.name);
        var decodeToken = jwt.decode(request.header('auth-token'))
        var userAdded = matchService.addUserToMatch(savedMatch.name, decodeToken.user)

        savedMatch.users.push(decodeToken.user)

        response.json(savedMatch);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
});

// Get all matches
router.get("/", verify, async(request, response) => {
    try {
        const matches = await matchService.getMatches();
 
        response.json(matches);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
});

// Get match by name
router.get("/:matchName", verify, async(request, response) => {


    try {
        const match = await matchService.getMatchByName(request.params.matchName);
        response.json(match);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
});

// Delete match by id
router.delete("/:matchId", verify, async(request, response) => {
    try {
        const removedmatch = await matchService.deleteMatch(request.params.matchId)
        response.json(removedmatch);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
});

// Add new user to match's users list
router.patch("/set/user/:matchName", verify, async(request, response) => {
    console.log()
    try {
        var updatedMatch = await matchService.addUserToMatch(
            request.params.matchName,
            request.body
        );
        response.json(updatedMatch);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
});

// Add new user to match's users list
router.patch("/set/narrator/:matchName", verify, async(request, response) => {
    console.log()
    try {
        var updatedMatch = await matchService.setNarrator(
            request.params.matchName,
            request.body
        );
        response.json(updatedMatch);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
});

// Add cards to a match
router.patch("/set/cards/:matchName", verify, async(request, response) => {

    const cards = await cardService.getCards()
    
    try {
        const updatedmatch = await matchService.setCards(
            request.params.matchName,
            cards
        );
        response.json(updatedmatch);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
});


module.exports = router;