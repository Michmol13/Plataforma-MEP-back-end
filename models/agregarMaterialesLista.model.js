const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
    cantidad: {
        type: Number,
        required: true
    },
    observaciones: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('Material', MaterialSchema);