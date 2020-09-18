const jwt = require("jsonwebtoken")
const User = require('../models/userModel')

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ _id: decoded._id, token: token})
        if(!user) {
            throw new Error("Please Authenticate.")
        } else if(user.userType !== 1) {
            throw new Error("User is not Admin")
        }

        req.user = user
        req.token = token
        next()
    } catch(e) {
        res.status(401).send({error: e})
    }
}

module.exports = adminAuth