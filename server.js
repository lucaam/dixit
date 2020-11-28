// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const redis = require('./database/init_redis')
const mongo = require('./database/init_mongo')

//variable declarations at the top
var socket = require('./websocket');

var app = express();
require('dotenv/config')

app.use(cors());
app.use(bodyParser.json())

// Import routes
const usersRoute = require('./user/userApi')
const cardsRoute = require('./card/cardApi')
const matchesRoute = require('./match/matchApi')

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/cards', cardsRoute);
app.use('/api/v1/matches', matchesRoute);

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/index.html");
});

app.get("/socket", (request, response) => {
    response.sendFile(__dirname + "/views/socket.html");
});

//The 404 Route
app.get("*", function(request, response) {
    response.sendFile(__dirname + "/views/error/404.html");
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

socket.startSocket(listener)

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });