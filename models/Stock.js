const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({


    quantity: {
        type: String,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    dateExp: {
        type: Date
    },
    price: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;