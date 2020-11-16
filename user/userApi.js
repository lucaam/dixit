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

    const { error } = registrationValidation(request.body);

    if (error) return response.status(400).send(error.details[0].message)

    const emailExists = await userService.getUserByEmail(request.body.email)

    if (emailExists) return response.status(400).send('Email already exists ')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt)

    try {
        const savedUser = await userService.createUser(request.body.email, request.body.name, hashedPassword, request.body.role)
        response.send({ user: savedUser._id });
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

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        // Why it is not updating???
    const updatedLogin = userService.updateLogin(user._id)
    response.header('auth-token', token).send(token)
})

router.patch('/score/:userId', verify, async(request, response) => {
    try {
        const updatedUser = await userService.updateScore(request.params.userId, request.body.score);
        response.json(updatedUser);
    } catch (err) {
        response.json({ message: err });
    }
});

router.patch('/cards/:userId', verify, async(request, response) => {
    try {
        const updatedUser = await userService.setCards(request.params.userId, request.body.cards);
        response.json(updatedUser);
    } catch (err) {
        response.json({ message: err });
    }
});

router.delete('/card/:userId', verify, async(request, response) => {
    try {
        const updatedUser = await userService.deleteCard(request.params.userId, request.body.card);
        response.json(updatedUser);
    } catch (err) {
        response.json({ message: err });
    }
});

router.delete('/cards/:userId', verify, async(request, response) => {
    try {
        const updatedUser = await userService.deleteCards(request.params.userId);
        response.json(updatedUser);
    } catch (err) {
        response.json({ message: err });
    }
});



module.exports = router;