const mongoose = require('mongoose');

const schemaregistroListasUtiles = new mongoose.Schema({
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
    fechaCreacion:{
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

const registroListasUtiles = mongoose.model('registroListasUtiles', schemaregistroListasUtiles);
module.exports = registroListasUtiles;