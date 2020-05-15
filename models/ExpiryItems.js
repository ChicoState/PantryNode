const mongoose = require('mongoose');

const ExpiryItemsS = new mongoose.Schema({


    itemName: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    stockID: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    dateExp: {
        type: Date
    }

});

const ExpiryItems = mongoose.model('ExpiryItems', ExpiryItemsS);

module.exports = ExpiryItems;