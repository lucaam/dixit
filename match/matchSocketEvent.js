const { func } = require("joi");

function hello(socket) {

    socket.on('hello', function() {
        socket.emit('hello', { message: "Hello man!" })
    })

};

function addCardOnTable(socket) {
    socket.on('addCardOnTable', function() {

        // Do things 
        // Probably redis
        
        socket.emit('newCardOnTable', { message: { card: { name: "test", picture: "test" } } })
    })
}

module.exports = { hello, addCardOnTable }