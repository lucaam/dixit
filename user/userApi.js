const express = require("express");
const router = express.Router();
const userService = require('./userService');
const { registrationValidation, loginValidation } = require('./userValidation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verify = require("./verifyToken");

router.post('/register', async(request, response) => {

    // Users insert
    // Name (username)
    // email
    // password

    console.log(request.body)
    const { error } = registrationValidation(request.body);

    if (error) return response.status(400).send(error.details[0].message)

    const emailExists = await userService.getUserByEmail(request.body.email)

    if (emailExists) return response.status(400).send('Email already exists')

    const usernameExists = await userService.getUserByUsername(request.body.username)

    if (usernameExists) return response.status(400).send('Username already exists')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt)

    try {
        const savedUser = await userService.createUser(request.body.email, request.body.name, hashedPassword, request.body.role, request.body.surname, request.body.username)
        response.status(200).send({ savedUser });
    } catch (err) {
        response.status(400).send(err);
    }
})

router.post('/login', async(request, response) => {

    const { error } = loginValidation(request.body);
    if (error) return response.status(400).send(error.details[0].message)

    const user = await userService.getUserByEmail(request.body.email)

    if (!user) return response.status(400).send('EMAIL or password is wrong')

    const validPassword = await bcrypt.compare(request.body.password, user.password)
    if (!validPassword) return response.status(400).send('Email or PASSWORD is wrong')

    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET)
    const updatedLogin = userService.updateLogin(user._id)
    response.header('auth-token', token).json({token: token, user})
})

router.patch('/set/score/:userId', verify, async(request, response) => {
    try {
        const updatedUser = await userService.updateScore(request.params.userId, request.body.score);
        response.json(updatedUser);
    } catch (err) {
        response.json({ message: err });
    }
});

router.patch('/set/cards/:userId', verify, async(request, response) => {
    try {
        const updatedUser = await userService.setCards(request.params.userId, request.body.cards);
        response.json(updatedUser);
    } catch (err) {
        response.json({ message: err });
    }
});

router.delete('/delete/card/:userId', verify, async(request, response) => {
    try {
        const updatedUser = await userService.deleteCard(request.params.userId, request.body.card);
        response.json(updatedUser);
    } catch (err) {
        response.json({ message: err });
    }
});

router.delete('/delete/cards/:userId', verify, async(request, response) => {
    try {
        const updatedUser = await userService.deleteCards(request.params.userId);
        response.json(updatedUser);
    } catch (err) {
        response.json({ message: err });
    }
});

router.get("/:userId",  verify, async(request, response) => {
    try {
        console.log("accesso in get userid con id = " + request.params.userId)
        const user = await userService.getUser(request.params.userId)
        response.status(200).send({ user });

    } catch (err) {
        response.status(500).json({ message: err });
    }
});

router.get("/", verify, async (request, response) => {
    try {
        const users = await userService.getUsers()
        response.json(users);
    } catch (err) {
        response.json({ message: err });
    }
});


module.exports = router;