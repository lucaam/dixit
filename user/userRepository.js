const User = require('./userModel');
const mongoose = require('mongoose');

function getUser(id) {
    return User.findById(id).select('username').exec();
}

function getUserByEmail(email) {
    return User.findOne({email: email}).exec();
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

function deleteUser(id) {
    return User.findOneAndDelete(id).exec();
}

module.exports = { getUser, createUser, deleteUser, getUserByEmail}