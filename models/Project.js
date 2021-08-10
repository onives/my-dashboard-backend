let mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
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
    githubLink: {
        type: String,
        required: true,
        trim: true
    },
    siteLink: {
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
ProjectSchema.methods.toJSON = function(){
    const project = this
    const projectObject = project.toObject()

    delete projectObject.owner
    delete projectObject._id

    return projectObject

};

module.exports = mongoose.model("Project", ProjectSchema);
