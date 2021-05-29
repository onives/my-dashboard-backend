let mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    image: {
        type: Buffer,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    githubLink: {
        type: String,
        required: true,
        trim: true
    },
    siteLink: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Project", ProjectSchema);