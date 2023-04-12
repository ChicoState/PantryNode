const mongoose = require('mongoose');

const CheckoutSchema = new mongoose.Schema({


    chicoStateId: {
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
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    datePur: {
        type: Date,
        default: Date.now
    }


});

const Checkout = mongoose.model('Checkout', CheckoutSchema);

module.exports = Checkout;