const mongoose = require('mongoose')

// episode is a sub document of the podcast model
const episodeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        length: {
            type: Number,
            required: true,
        },
        thumbnail: {
            type: String,
            default: "",
        },
        views: {
            type: Number,
            default: 0,
        },
        audio: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = episodeSchema