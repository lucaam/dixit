const Card = require('./cardModel');
const mongoose = require('mongoose');

function getCard(name) {
    return Card.findOne({name: name}).exec()
}
function getCards() {
    return Card.find().exec()
}

function createCard(name, picture) {
    const card = new Card({
        name: name,
        picture: picture
    })
    return card.save();
}

function deleteCard(id) {
    return Card.findOneAndDelete(id).exec();
}

function updateCard(id, name) {
    return Card.updateOne(id, name).exec();
}
module.exports = { getCard, createCard, deleteCard , getCards, updateCard}