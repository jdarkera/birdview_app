// Review Schema

const mongoose = require('mongoose');
const User = require("./user.model");
const Company = require("./company.model")

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    // Need referncing
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    // Need referencing
    company: {
        type: String,
        ref: 'Company',
        required: true,
    },
    stars: {
        type: Number,
    },
    desc: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;