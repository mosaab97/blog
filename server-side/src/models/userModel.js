const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Blog = require('./blogModel')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email must be valid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes("password")) {
                throw new Error("Password can not contain the word password")
            }
        }
    },
    userType: {
        type: Number,
        required: true
    },
    token: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.virtual('blogs', {
    ref: "Blog",
    localField: "_id",
    foreignField: "owner"
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: "1 day" })
    user.token =token
    await user.save()
    return token
}

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.token
    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email: email})
    if(!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error("Unable to login")
    }

    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const User = mongoose.model("User", userSchema)

module.exports = User