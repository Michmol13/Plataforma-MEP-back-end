const mongoose = require('mongoose');

const schemaregistroListas = new mongoose.Schema({
    nombrelista:{
        type: String,
        required: true,
        unique: true
    },
    nivelEducativo:{
        type: String,
        required: true,
        unique: false
    },
    annoCreacion:{
        type: Number,
        required: true,
        unique: false
    },
    estadolista:{
        type: Boolean,
        required: true,
        unique: false
    }
});

const registroHijos = mongoose.model('registroListas', schemaregistroListas);
module.exports = registroListas;