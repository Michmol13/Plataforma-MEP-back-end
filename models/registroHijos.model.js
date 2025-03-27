const mongoose = require('mongoose');

const schemaRegistrohijos = new mongoose.Schema({
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

const Registrohijos = mongoose.model('RegistroHijos', schemaRegistrohijos);
module.exports = Registrohijos;