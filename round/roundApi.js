const express = require("express");
const router = express.Router();
const roundService = require("./roundService");
const { insertValidation } = require("./roundValidation");
const verify = require("../user/verifyToken");

router.post("/", verify, async (request, response) => {
  const { error } = insertValidation(request.body);

  if (error) return response.status(400).send(error.details[0].message);

  const nameExists = await roundService.getCard(request.body.name);

  if (nameExists)
    return response
      .status(400)
      .send("Round with specified name already exists");

  try {
    const savedRound = await roundService.createRound(request.body.name);
    response.send({ savedRound: savedRound._id });
  } catch (err) {
    response.status(400).send(err);
  }
});

router.get("/", verify, async (request, response) => {
  try {
    const rounds = await roundService.getRounds();
    response.json(rounds);
  } catch (err) {
    response.json({ message: err });
  }
});

router.get("/:roundId", verify, async (request, response) => {
  try {
    const round = await roundService.getRound(request.params.roundId);
    response.json(round);
  } catch (err) {
    response.json({ message: err });
  }
});

router.get("/:roundName", verify, async (request, response) => {
  try {
    const round = await roundService.getRoundByName(request.params.roundName);
    response.json(round);
  } catch (err) {
    response.json({ message: err });
  }
});

router.delete("/:roundId", verify, async (request, response) => {
  try {
    const removedRound = await roundService.deleteRound(id)
    response.json(removedRound);
  } catch (err) {
    response.json({ message: err });
  }
});

router.patch(":/roundId", verify, async (request, response) => {
  try {
    const updatedRound = await roundService.addUserToRound(
      request.params.roundId,
      user
    );
    response.json(updatedRound);
    response.json(updatedCard);
  } catch (err) {
    response.json({ message: err });
  }
});

router.patch(":/roundName", verify, async (request, response) => {
  try {
    const updatedRound = await roundService.addUserToRound(
      request.params.roundName,
      user
    );
    response.json(updatedRound);
  } catch (err) {
    response.json({ message: err });
  }
});

module.exports = router;
