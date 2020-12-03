// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const http = require('http');
const https = require('https');
// const redis = require('./database/init_redis')
const mongo = require('./database/init_mongo')

//variable declarations at the top
var socket = require('./websocket');

var app = express();
require('dotenv/config')

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/dixit.lucaamoriello.dev/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/dixit.lucaamoriello.dev/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/dixit.lucaamoriello.dev/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

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
app.use('/', express.static("public/dixit-frontend"));
app.use('/img', express.static("public/img"));
app.use('/js', express.static("public/js"));

app.get("/*", function(request, res) {
    res.sendFile('/public/dixit-frontend/index.html', { root: __dirname });
});

//The 404 Route
app.get("/*", function(request, response) {
    response.sendFile(__dirname + "/views/error/404.html");
});
const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)
// listen for requests :)
var listener = httpServer.listen(process.env.PORT_HTTP || 3000, "0.0.0.0", () => {
    console.log("Your app is listening on port " + listener.address().port);
});

var listener_https = httpsServer.listen(process.env.PORT_HTTPS || 443, "0.0.0.0", () => {
    console.log("Your app is listening on port " + listener_https.address().port);
});

socket.startSocket(listener)

socket.startSocket(listener_https)

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });