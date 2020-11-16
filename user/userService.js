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

module.exports = { getUser, createUser, deleteUser, getUserByEmail}