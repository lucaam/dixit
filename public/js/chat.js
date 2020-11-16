const socket = io();

// Listening updatecount event from server  


socket.on('hello', (data) => {
    console.log(data)
})

socket.on('newCardOnTable', (data) => {
    console.log(data)
})


document.getElementById('hello').addEventListener('click', function() {
    socket.emit('hello');
})

document.getElementById('addCardOnTable').addEventListener('click', function() {
    socket.emit('addCardOnTable');
})


// adding click event on button