const express = require('express')
const User = require('../models/userModel')
const auth = require('../middlewares/auth')

const router = new express.Router()
router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(error) {
        res.status(400).send(error)
    }
})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})


module.exports = router