let mongoose = require('mongoose');

const AboutSchema = mongoose.Schema({
    description: {
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

module.exports = mongoose.model("About", AboutSchema);
