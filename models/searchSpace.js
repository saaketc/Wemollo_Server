const mongoose = require('mongoose');

const searchSpaceSchema = new mongoose.Schema({
    tags: [String],
    space: [
        {
            title: String,
            description: String,
            typeOfProduct: String,
            url: String,
        }
    ]
});

const SearchSpace = mongoose.model('SearchSpace', searchSpaceSchema);

module.exports = SearchSpace;