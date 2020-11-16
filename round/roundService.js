const roundRepository = require('./roundRepository');
const mongoose = require('mongoose');

function getRound(id) {
    return roundRepository.getRound(id);
}

function getRounds() {
    return roundRepository.getRounds();
}

function getRoundByName(name) {
    return roundRepository.getRoundByName(name);
}

function createRound(name) {
    return roundRepository.createRound(name)
}

function deleteRound(id) {
    return roundRepository.deleteRound(id)
}

function addUserToRound(name, user) {
    return roundRepository.addUserToRound(name, user)
}


module.exports = { getRound, createRound, deleteRound, getRoundByName, addUserToRound, getRounds}