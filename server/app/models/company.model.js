// Company Schema

const mongoose = require('mongoose');
const Job = require("./job.model");
const Review = require("./review.model");

const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: {  
        type: String,
        unique: true,
        required: true,
        
    },
    companyWebsite:{
        type: String,
        unique: true,
    },
    companyType: {
        type: String,
        default: "N/A"
    },
    companySize: {
        type: String,
        // required: true,
    },
    companyHeadquaters:{
        type: String,
        default: "N/A"
    },
    companyFounded:{
        type: Number,
    },
    companySector:{
        type: String,
        default: "N/A"
    },
    companyAbout:{
        type: String,
        default: "N/A"
    },
    companyJobs: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Job',
        }
    ],
    companyReviews: [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ]
}, {
    timestamps: true,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
