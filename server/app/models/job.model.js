// Job Schema

const mongoose = require('mongoose');
const Company = require('./company.model');
const User = require("./user.model");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    companyName: {  // need to reference
        type: String,
        ref: 'Company',
        required: true,
        unique: false,
        trim: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jobDesc: {
        type: String,
        unique: false,
        required: true,
    },
    salary: {
        type: String,
        unique: false,
        required: true,
    },
    location: {
        type: Object,
        unique: false,
        required: true,
    },
    deadline: {
        type: Date,
        unique: false,
        required: true,
    },
    applicants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, {
    timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
