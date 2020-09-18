const express = require('express')
const Blog = require("../models/blogModel")
const auth = require('../middlewares/auth')
const adminAuth = require('../middlewares/adminAuth')
const router = new express.Router()

router.post("/blogs",auth, async (req, res) => {
    const blog = new Blog({
        ...req.body,
        owner: req.user._id,
        ownerName: req.user.name,
        stories: []
    })
    try {
        await blog.save()
        res.status(201).send(blog)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.get("/blogs", async (req, res) => {
    try {
        const blog = await Blog.find({})
        res.status(200).send(blog)
    } catch(error) {
        res.status(500).send()
    }
})

router.get("/blogs/:id", async (req, res) => {
    const _id = req.params.id
    try {
        const blog = await Blog.findOne({ _id })
        if(!blog) {
            return res.status(404).send("Blog not found")
        }
        res.send(blog)
    }catch(error) {
        res.status(500).send()
    }
})

router.patch("/blogs/story/:id", auth, async (req, res) => {
    const allowedUpdate = ["stories"]
    const updates = Object.keys(req.body)
    const isValid = updates.every(update => allowedUpdate.includes(update))
    if(!isValid) {
        return res.status(400).send({error: "Invalid update"})
    }

    try {
        const blog = await Blog.findOne({ _id: req.params.id})
        if(!blog) {
            return res.status(404).send({error: "Not found"})
        }

        updates.forEach(update => blog[update] = [...blog[update], {
            content: req.body[update],
            owner: req.user._id,
            ownerName: req.user.name
        }])
        await blog.save()
        res.send(blog)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch("/blogs/:id", adminAuth, async (req, res) => {
    
    const allowedUpdate = ["title", "description"]
    const updates = Object.keys(req.body)
    const isValid = updates.every(update => allowedUpdate.includes(update))
    if(!isValid) {
        return res.status(400).send({error: "Invalid update"})
    }

    try {
        const blog = await Blog.findOne({ _id: req.params.id})
        if(!blog) {
            return res.status(404).send({error: "Not found"})
        }

        updates.forEach(update => blog[update] = req.body[update])
        await blog.save()
        res.send(blog)
    } catch(e) {
        res.status(400).send(e)
    }
})


module.exports = router
