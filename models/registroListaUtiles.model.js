const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaregistroListasUtiles = new mongoose.Schema({
    nombreLista:{
        type: String,
        required: true,
        unique: false,
    },
    nivelEducativo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registroNivelesEducativos', 
        required: true
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
    },
    materiales: [
        {
            material: {
                type: Schema.Types.ObjectId,
                ref: 'registroMaterialesEscolares',
                required: true
            },
            cantidad: {
                type: Number,
                required: true
            },
            observaciones: {
                type: String,
                required: false
            }
        }
    ]
});

const registroListasUtiles = mongoose.model('registroListasUtiles', schemaregistroListasUtiles);
module.exports = registroListasUtiles;