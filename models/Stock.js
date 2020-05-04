const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({

    stockID: {
        type: String,
        required: true
    },
    count: {
        type: Integer,
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