const mongoose = require('mongoose');

const schemaUsuario = new mongoose.Schema({
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

const Usuario = mongoose.model('Usuario', schemaUsuario);
module.exports = Usuario;