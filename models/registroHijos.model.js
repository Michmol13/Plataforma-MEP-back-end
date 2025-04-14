const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaregistroHijos = new mongoose.Schema({
    nombrecompletoHijo:{
        type: String,
        required: true,
        unique: false
    },
    cedula: {
        type: String,
        unique: true,
        required: true,
        match: [/^\d{1}-\d{3,4}-\d{3,5}$/, "Formato de cédula inválido"] 
    },
    nivelEducativo:
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registroNivelesEducativos', 
        required: true
        },
    annoLectivo:{
        type: Number,
        required: true,
        unique: false
    }
});

const registroHijos = mongoose.model('registroHijos', schemaregistroHijos);
module.exports = registroHijos;