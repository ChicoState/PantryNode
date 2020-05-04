const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({


    categoryName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;