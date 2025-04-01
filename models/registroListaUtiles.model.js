const mongoose = require('mongoose');

const schemaregistroListasUtiles = new mongoose.Schema({
    nombreLista:{
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
        type: String,
        required: true,
        unique: false
    },
    estadoLista:{
        type: Boolean,
        required: true, 
        default: true
    }
});

const registroListasUtiles = mongoose.model('registroListasUtiles', schemaregistroListasUtiles);
module.exports = registroListasUtiles;