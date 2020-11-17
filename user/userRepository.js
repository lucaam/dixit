const mongoose = require('mongoose');
const User = require('./userModel');

function getUser(id) {
    return User.findOne({ _id: id })
}

function getUsers(id) {
    return User.find();
}

function getUserByEmail(email) {
    return User.findOne({ email: email });
}

function getUserByUsername(username) {
    return User.findOne({ username: username });
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

module.exports = { getUser, getUsers, createUser, deleteUser, getUserByEmail, deleteCard, updateScore, setCards, deleteCards, setVictories, setDefeats, updateLogin, getUserByUsername}