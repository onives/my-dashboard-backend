let mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    image: {
        type: String,
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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

//hide private data
BlogSchema.methods.toJSON = function(){
    const blog = this
    const blogObject = blog.toObject()

    delete blogObject.owner

    return blogObject

};
module.exports = mongoose.model("Blog", BlogSchema);
