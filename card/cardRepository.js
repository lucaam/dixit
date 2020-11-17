const mongoose = require('mongoose');
const Card = require('./cardModel');

function getCard(name) {
    return Card.findOne({name: name})
}
function getCards() {
    return Card.find();
}

function createCard(name, picture) {
    const card = new Card({
        name: name,
        picture: picture
    })
    return card.save();
}

function deleteCard(id) {
    return Card.findOneAndDelete(id)
}

function updateCard(id, name) {
    return Card.updateOne(id, name)
}
module.exports = { getCard, createCard, deleteCard , getCards, updateCard}