const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({


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
    dateExp: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;