var socket = require('socket.io');

var matchEvent = require('../match/matchSocketEvent')

exports.startSocket = function startIo(server) {
    var io = socket(server);
    var packtchat = io.of('/');
    packtchat.on('connection', function(socket) {

        // This list represents all possibile events that can be trigger after the connection
        matchEvent.hello(socket)
        matchEvent.addCardOnTable(socket)

    });

    return io;
};