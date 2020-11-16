const Round = require('./roundModel');
const mongoose = require('mongoose');

function getRound(id) {
    return Round.findById(id).exec();
}

function getRounds() {
    return Round.find().exec
}

function getRoundByName(name) {
    return Round.findOne({name: name}).exec();
}

function createRound(name) {
    const round = new Round({
        name: name,
    })
    return round.save();
}

function deleteRound(id) {
    return Round.findOneAndDelete(id).exec();
}

function addUserToRound(name, user) {
    return Round.updateOne(
        {name: name },
        {$push: user}
      );
}


module.exports = { getRound, createRound, deleteRound, getRoundByName, addUserToRound}