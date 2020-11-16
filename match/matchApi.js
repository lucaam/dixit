const express = require("express");
const router = express.Router();
const matchService = require("./matchService");
const { insertValidation } = require("./matchValidation");
const verify = require("../user/verifyToken");

router.post("/", verify, async(request, response) => {
    const { error } = insertValidation(request.body);

    if (error) return response.status(400).send(error.details[0].message);

    const nameExists = await matchService.getMatchByName(request.body.name);

    if (nameExists)
        return response
            .status(400)
            .send("match with specified name already exists");

    try {
        const savedmatch = await matchService.createMatch(request.body.name);
        response.send({ savedmatch: savedmatch._id });
    } catch (err) {
        response.status(400).send(err);
    }
});

router.get("/", verify, async(request, response) => {
    try {
        const matches = await matchService.getMatches();
        response.json(matches);
    } catch (err) {
        response.json({ message: err });
    }
});

router.get("/:matchId", verify, async(request, response) => {
    try {
        const match = await matchService.getMatch(request.params.matchId);
        response.json(match);
    } catch (err) {
        response.json({ message: err });
    }
});

router.get("/:matchName", verify, async(request, response) => {
    try {
        const match = await matchService.getMatchByName(request.params.matchName);
        response.json(match);
    } catch (err) {
        response.json({ message: err });
    }
});

router.delete("/:matchId", verify, async(request, response) => {
    try {
        const removedmatch = await matchService.deleteMatch(id)
        response.json(removedmatch);
    } catch (err) {
        response.json({ message: err });
    }
});

router.patch(":/matchId", verify, async(request, response) => {
    try {
        const updatedmatch = await matchService.addUserToMatch(
            request.params.matchId,
            user
        );
        response.json(updatedmatch);
        response.json(updatedCard);
    } catch (err) {
        response.json({ message: err });
    }
});

router.patch(":/matchName", verify, async(request, response) => {
    try {
        const updatedmatch = await matchService.addUserToMatch(
            request.params.matchName,
            user
        );
        response.json(updatedmatch);
    } catch (err) {
        response.json({ message: err });
    }
});

module.exports = router;