let mongoose = require('mongoose');
let validator = require('validator');
let bcrypt = require('bcryptjs');
// let jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value =>{
            if(!validator.isEmail(value)){
                throw new Error ({error: 'Invalid email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("password cannot contain 'password' ")
            }
        }
    },
    created_at: {
        type: Date,
        default: Date.now
    }

});

UserSchema.pre('save', async function(next){
    //hash passwords before saving them
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

UserSchema.statics.findByCredentials = async (email, password) =>{
    //search for user by email
    const user = await User.findOne({email})
    if(!user){
        return { error: 'Invalid Login Credentials'}
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        return { error: 'Invalid Login Credentials'}
    }
    return user
}

var User = module.exports = mongoose.model("User", UserSchema);

module.exports.get = function(callback, limit){
    User.find(callback).limit(limit);
}