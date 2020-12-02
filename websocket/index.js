var socket = require('socket.io');


var matchEvent = require('../match/matchSocketEvent')

exports.startSocket = function startIo(server) {

    const io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    var packtchat = io.of('/');
    packtchat.on('connection', function(socket) {

        // This list represents all possibile events that can be trigger after the connection
        socket.on('join', function(data) {
            console.log("Room " + data.name)
            socket.join(data.name)

        })
        matchEvent.hello(socket, io)
        matchEvent.addCardOnTable(socket, io)
        matchEvent.readyToPlay(socket, io)
        matchEvent.selectCard(socket, io)
        matchEvent.forceTurnStart(socket, io)
        matchEvent.forceTurnEnd(socket, io)


    });

    return io;
};