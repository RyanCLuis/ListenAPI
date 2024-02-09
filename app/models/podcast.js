const mongoose = require('mongoose')

const episodeSchema = require('./episode')

const podcastSchema = new mongoose.Schema(
	{
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    tags: {
        type: [String],
        default: [],
    },
    type: {
        type: String,
        enum: [
            'Culture', 
            'Business', 
            'Education', 
            'Health', 
            'Comedy', 
            'News', 
            'Science', 
            'History', 
            'Development', 
            'Sports', 
            'Crime', 
            'Horror', 
            'Religion',
            'Music',
        ],
        default: "comedy"
    },
    views: {
        type: Number,
        default: 0,
    },
    episodes: [episodeSchema],
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Podcast', podcastSchema)