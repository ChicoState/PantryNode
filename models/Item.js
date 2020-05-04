const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    itemID: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    stockID: {
        type: Date
    }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;