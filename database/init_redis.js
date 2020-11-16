const { model } = require("mongoose");
const redis = require("redis");

//localhost:6379
const client = redis.createClient({
    port: 6379,
    host: "127.0.0.1"
});

client.on('connect', () => {
    console.log("Client connected to redis")
})

client.on('ready', () => {
    console.log("Client connected to redis and ready to use")
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log("Client disconnected to redis")
})

process.on('SIGINT', () => {
    client.quit()
})

model.exports = client