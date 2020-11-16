const userRepository = require('./userRepository')

function getUser(id) {
    return userRepository.getUser(id);
}

function getUserByEmail(email) {
    return userRepository.getUserByEmail(email);
}

function createUser(email, name, password, role) {

    return userRepository.createUser(email, name, password, role)
}

function deleteUser(id) {
    return userRepository.deleteUser(id)
}

function updateLogin(id) {
    return userRepository.updateLogin(id)
}

function deleteCard(id, card) {
    return userRepository.deleteCard(id, card)
}

function deleteCards(id) {
    return userRepository.deleteCards(id)
}


function updateScore(id, score) {
    return userRepository.updateScore(id, score)
}

function setCards(id, cards) {
    return userRepository.setCards(id, cards)
}

function setVictories(id, victories) {
    return userRepository.setVictories(id, victories)
}

function setDefeats(id, defeats) {
    return userRepository.setDefeats(id, defeats)
}

module.exports = { getUser, createUser, deleteUser, getUserByEmail, deleteCard, updateScore, setCards, deleteCards, setVictories, setDefeats, updateLogin }