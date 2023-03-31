const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for Video
const VideoSchema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
        },
        videos: [{ type: String}],
        date:{
            type: Date,
            default: Date.now,
        }
})

const video = mongoose.model("video", VideoSchema)
module.exports = video;