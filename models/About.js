let mongoose = require('mongoose');

const AboutSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },

});


module.exports = mongoose.model("About", AboutSchema);
