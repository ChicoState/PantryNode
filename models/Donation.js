const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({


    donorID: {
        type: String,
    },
    stockID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Donation = mongoose.model('Donation', DonationSchema);

module.exports = Donation;