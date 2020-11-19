const socket = io();

// Listening updatecount event from server  
 const fakeUser = {
    cards: [],
    defeats: 0,
    email: "luca.amoriello@hotmail.it",
    lastLogin: "2020-11-16T11:07:22.894Z",
    name: "Luca Amoriello",
    password: "$2a$10$bHZWjToUsBpaRJ6NdlMmVOzmrJj9VL7Dxvuor7ZzM.FS5QSDeyEeK",
    registrationDate: "2020-11-16T11:07:22.894Z",
    role: "admin",
    score: 0,
    victories: 0,
    _id: "5fb25d6abc589aa94823ad88",
 }

//  const fakeMatch = {
//      name: "testwithplayers",
    //  cards: [
    //      {
    //          name: "testCard",
    //          picture: "testCard.jpg"
    //      },
    //      {
    //         name: "testCard1",
    //         picture: "testCard1.jpg"
    //     },
    //     {
    //         name: "testCard2",
    //         picture: "testCard2.jpg"
    //     },
    //     {
    //         name: "testCard3",
    //         picture: "testCard3.jpg"
    //     },
    //     {
    //         name: "testCard4",
    //         picture: "testCard4.jpg"
    //     },
    //     {
    //         name: "testCard5",
    //         picture: "testCard5.jpg"
    //     }
    //  ]
//  }
const realMatch = {
    "goal": 30,
    "actualPlayers": 1,
    "_id": "5fb40c5aa666b22a90752a7c",
    "expectedPlayers": 0,
    "name": "testwithplayers",
    "registrationDate": "2020-11-17T17:46:02.161Z",
    "lastAccess": "2020-11-17T17:46:02.161Z",
    "cards": [
        {
            "_id": "5fb395c97037d40a14e663a2",
            "name": "testCard",
            "picture": "testCard.jpg",
            "__v": 0
        },
        {
            "_id": "5fb395d47037d40a14e663a3",
            "name": "testCard1",
            "picture": "testCard1.jpg",
            "__v": 0
        },
        {
            "_id": "5fb395d87037d40a14e663a4",
            "name": "testCard2",
            "picture": "testCard2.jpg",
            "__v": 0
        },
        {
            "_id": "5fb395dd7037d40a14e663a5",
            "name": "testCard3",
            "picture": "testCard3.jpg",
            "__v": 0
        },
        {
            "_id": "5fb395e27037d40a14e663a6",
            "name": "testCard4",
            "picture": "testCard4.jpg",
            "__v": 0
        },
        {
            "_id": "5fb395e67037d40a14e663a7",
            "name": "testCard5",
            "picture": "testCard5.jpg",
            "__v": 0
        },
        {
            "_id": "5fb395eb7037d40a14e663a8",
            "name": "testCard6",
            "picture": "testCard6.jpg",
            "__v": 0
        }
    ],
    "users": [
        {
            "role": "admin",
            "score": 0,
            "victories": 0,
            "defeats": 0,
            "_id": "5fb25d6abc589aa94823ad88",
            "cards": [],
            "email": "luca.amoriello@hotmail.it",
            "lastLogin": "2020-11-16T11:07:22.894Z",
            "name": "Luca Amoriello",
            "password": "$2a$10$bHZWjToUsBpaRJ6NdlMmVOzmrJj9VL7Dxvuor7ZzM.FS5QSDeyEeK",
            "registrationDate": "2020-11-16T11:07:22.894Z"
        }
    ],
    "__v": 0,
    "narrator": {
        "role": "admin",
        "score": 0,
        "victories": 0,
        "defeats": 0,
        "_id": "5fb25d6abc589aa94823ad88",
        "registrationDate": "2020-11-16T11:07:22.894Z",
        "lastLogin": "2020-11-16T11:07:22.894Z",
        "cards": [],
        "email": "luca.amoriello@hotmail.it",
        "name": "Luca Amoriello",
        "password": "$2a$10$bHZWjToUsBpaRJ6NdlMmVOzmrJj9VL7Dxvuor7ZzM.FS5QSDeyEeK"
    }
}

var card =   {
    "_id": "5fb395c97037d40a14e663a2",
    "name": "testCard",
    "picture": "testCard.jpg"
}

var cardSelected =   {
    "_id": "5fb395c97037d40a14e663a2",
    "name": "testCard",
    "picture": "testCard.jpg",
    "selected": "0"
}

socket.on('hello', (data) => {
    console.log(data)
})

socket.on('newCardOnTable', (data) => {
    console.log(data)
})


socket.on('readyToStart', (data) => {
    console.log("we are ready to start")
    console.log(data)
})

socket.on('assignedCards', (data) => {
    console.log(data)
})

socket.on('userReady', (data) => {
    console.log(data)
})

socket.on('matchUpdate', (data) => {
    console.log(data)
})

document.getElementById('hello').addEventListener('click', function() {
    console.log("join")
    socket.emit('join', realMatch);
})

document.getElementById('addCardOnTable').addEventListener('click', function() {
    socket.emit('addCardOnTable', {card: card, match: realMatch});
})

document.getElementById('ready').addEventListener('click', function() {
    console.log(realMatch)
    socket.emit('readyToPlay', {user: fakeUser, match: realMatch});
})

document.getElementById('selectCard').addEventListener('click', function() {
    console.log(realMatch)
    socket.emit('selectCard', {card: cardSelected, match: realMatch});
})

// adding click event on button