const User = require('./userModel');
const mongoose = require('mongoose');

function getUser(id) {
    return User.findById(id).select('username').exec();
}

function getUserByEmail(email) {
    return User.findOne({ email: email }).exec();
}

function createUser(email, name, password, role) {
    const user = new User({
        email: email,
        name: name,
        password: password,
        role: role
    })
    return user.save();
}

function updateLogin(id, date) {
    return User.updateOne({ _id: id }, { $currentDate: { lastLogin: { $type: "date" } } })
}

function deleteUser(id) {
    return User.findOneAndDelete(id).exec();
}

function deleteCard(id, card) {
    return User.updateOne({ _id: id }, { $pull: { cards: card } })
}

function deleteCards(id) {
    return User.updateOne({ _id: id }, { $set: { cards: [] } })
}

function updateScore(id, score) {
    return User.updateOne({ _id: id }, { $set: { score: score } })
}

function setCards(id, cards) {
    return User.updateOne({ _id: id }, { $set: { cards: cards } })
}

function setVictories(id, victories) {
    return User.updateOne({ _id: id }, { $set: { victories: victories } })
}

function setDefeats(id, defeats) {
    return User.updateOne({ _id: id }, { $set: { defeats: defeats } })
}

module.exports = { getUser, createUser, deleteUser, getUserByEmail, deleteCard, updateScore, setCards, deleteCards, setVictories, setDefeats, updateLogin }