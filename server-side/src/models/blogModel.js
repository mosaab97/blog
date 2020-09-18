const mongoose = require('mongoose')

const blogShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    ownerName: {
        type: String,
        required: true
    },
    stories: {
        type: Array,
    }
}, {
    timestamps: true
})
const blog = mongoose.model("Blog", blogShema)


module.exports = blog