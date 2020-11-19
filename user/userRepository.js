const mongoose = require('mongoose');
const User = require('./userModel');

function getUser(id) {
    return User.findOne({ _id: id }).exec()
}

function getUsers(id) {
    return User.find().exec();
}

function getUserByEmail(email) {
    return User.findOne({ email: email }).exec();
}

function getUserByUsername(username) {
    return User.findOne({ username: username }).exec();
}
//         request.body.email, request.body.name, hashedPassword, request.body.role, request.body.surname, request.body.username)

function createUser(email, name, password, role, username, surname) {
    const user = new User({
        name: name,
        surname: surname,
        username: username,
        email: email,
        password: password,
        role: role
    })
    return user.save();
}

function updateLogin(id, date) {
    return User.updateOne({ _id: id }, { $currentDate: { lastLogin: { $type: "date" } } }).exec()
}

function deleteUser(id) {
    return User.findOneAndDelete(id).exec();
}

function deleteCard(id, card) {
    return User.updateOne({ _id: id }, { $pull: { cards: card } }).exec()
}

function deleteCards(id) {
    return User.updateOne({ _id: id }, { $set: { cards: [] } }).exec()
}

function updateScore(id, score) {
    return User.updateOne({ _id: id }, { $set: { score: score } }).exec()
}

function setCards(id, cards) {

    return User.updateOne({ _id: id }, { $set: { cards: cards } }).exec()
}

function setVictories(id, victories) {
    return User.updateOne({ _id: id }, { $set: { victories: victories } }).exec()
}

function setDefeats(id, defeats) {
    return User.updateOne({ _id: id }, { $set: { defeats: defeats } }).exec()
}

module.exports = { getUser, getUsers, createUser, deleteUser, getUserByEmail, deleteCard, updateScore, setCards, deleteCards, setVictories, setDefeats, updateLogin, getUserByUsername}