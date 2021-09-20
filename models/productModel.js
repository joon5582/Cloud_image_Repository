const mongoose = require('mongoose');

const product = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },

    imgurl: {
        type: String,
        required: true
    },

    userid: {
        type: String
    }
});
module.exports = mongoose.model('products',product);