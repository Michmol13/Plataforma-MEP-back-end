const mongoose = require('mongoose');

const schemaregistroHijos = new mongoose.Schema({
    nombrecompletoHijo:{
        type: String,
        required: true,
        unique: true
    },
    nivelEducativo:{
        type: String,
        required: true,
        unique: false
    },
    annoLectivo:{
        type: Number,
        required: true,
        unique: false
    }
});

const registroHijos = mongoose.model('registroHijos', schemaregistroHijos);
module.exports = registroHijos;