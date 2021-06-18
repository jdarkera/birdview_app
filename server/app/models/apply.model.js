// Apply Schema

const mongoose = require('mongoose');

const Company = require("./company.model");
const User = require("./user.model")


const Schema = mongoose.Schema;

const applySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
        type: String,
        ref:'User'
    },
    jobTitle: {
        type: String,
        ref:'Company',
        required: true
    },
    companyName: {
        type: String,
        ref:'Company',
        required: true
    },
    resume: {
        type: String
    }
}, {
    timestamps: true,
})

const Apply = mongoose.model('Apply', applySchema);

module.exports = Apply;
