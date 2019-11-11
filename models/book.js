const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema({
    id: {
        unique: true,
        type: String,
        //required: true,
        trim: true
    },
    authers: {
        type: String,
        //required: true,
        trim: true
    },
    subject: {
        type: String,
        //required: true,
        trim: true
    },
    publisher: {
        type: String,
        //required: true,
        trim: true
    },
    price: {
        type: String,
        //required: true,
        trim: true
    },

    createAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        required: true,
        default: Date.now
    },


})
module.exports = mongoose.model('book', bookSchema);