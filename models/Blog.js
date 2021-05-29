let mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
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
    link: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Blog", BlogSchema);
