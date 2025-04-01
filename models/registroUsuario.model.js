const mongoose = require('mongoose');

const schemaregistroUsuario = new mongoose.Schema({
    correo:{
        type: String,
        required: true,
        unique: true
    },
    cedula:{
        type: String,
        required: true,
        unique: true
    },
    nombre:{
        type: String,
        required: true,
        unique: false
    },
    contrasena:{
        type: String,
        required: true,
        unique: false
    }
});

const registroUsuario = mongoose.model('registroUsuario', schemaregistroUsuario);
module.exports = registroUsuario;

