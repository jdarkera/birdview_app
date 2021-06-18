// User Schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        min: [4, 'Please enter a username >= 4 characters']
    },
    userPassword: {
        type: String,
        required: true,
        min: [4, 'Please enter a password >= 4 characters']
    },
    userType: {
        type: String,
        unique: false,
        required: true,
    },
    companyName: {          // need to reference
        type: String,
        default: ""
    },
    loginStatus: {
        type: String,
        default: "offline",
    }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
