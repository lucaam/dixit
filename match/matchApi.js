const express = require("express");
const router = express.Router();
const matchService = require("./matchService");
const { matchValidation } = require("./matchValidation");
const verify = require("../user/verifyToken");
const cardService = require("../card/cardService");


// Create match
router.post("/", verify, async(request, response) => {
    const { error } = matchValidation(request.body);

    if (error) return response.status(400).json(error.details[0].message);

    const nameExists = await matchService.getMatchByName(request.body.name);

    if (nameExists)
        return response
            .status(400)
            .send("match with specified name already exists");

    try {
        const savedMatch = await matchService.createMatch(request.body.name);
        response.json(savedMatch);
    } catch (err) {
        response.status(400).json({ message: err });
    }
});

// Get all matches
router.get("/", verify, async(request, response) => {
    try {
        const matches = await matchService.getMatches();
        response.json(matches);
    } catch (err) {
        response.json({ message: err });
    }
});

// Get match by name
router.get("/:matchName", verify, async(request, response) => {
    try {
        const match = await matchService.getMatchByName(request.params.matchName);
        response.json(match);
    } catch (err) {
        response.json({ message: err });
    }
});

// Delete match by id
router.delete("/:matchId", verify, async(request, response) => {
    try {
        const removedmatch = await matchService.deleteMatch(request.params.matchId)
        response.json(removedmatch);
    } catch (err) {
        response.json({ message: err });
    }
});

// Add new user to match's users list
router.patch("/set/user:/matchName", verify, async(request, response) => {
    try {
        const updatedmatch = await matchService.addUserToMatch(
            request.params.matchId,
            request.body.user
        );
        response.json(updatedmatch);
    } catch (err) {
        response.json({ message: err });
    }
});

// Add cards to a match
router.patch("/set/cards/:/matchName", verify, async(request, response) => {
    try {
        const updatedmatch = matchService.setCards(
            request.params.matchName
        );
        response.json(updatedmatch);
    } catch (err) {
        response.json({ message: err });
    }
});


module.exports = router;