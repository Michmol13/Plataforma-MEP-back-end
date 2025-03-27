const mongoose = require('mongoose');

const schemaRegistrohijos = new mongoose.Schema({
    nombreHijo:{
        type: String,
        required: true,
        unique: false
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