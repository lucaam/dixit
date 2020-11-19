var socket = require('socket.io');

var matchEvent = require('../match/matchSocketEvent')

exports.startSocket = function startIo(server) {
    var io = socket(server);
    var packtchat = io.of('/');
    packtchat.on('connection', function(socket) {

        // This list represents all possibile events that can be trigger after the connection
        socket.on('join', function(data){
            console.log("Room " + data.name)
            socket.join(data.name)

        })
        matchEvent.hello(socket, io)
        matchEvent.addCardOnTable(socket, io)
        matchEvent.readyToPlay(socket, io)
        matchEvent.selectCard(socket, io)

    });

    return io;
};