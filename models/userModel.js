const mongoose = require('mongoose');

const user = mongoose.Schema({
    email:{
        type: String,
        maxlength: 50,
        required: true
    },
    
    
    name: {
        type: String,
        maxlength: 50,
        required: true
    },

    password: {
        type: String,
        required: true
    } 
});
module.exports = mongoose.model('users',user);