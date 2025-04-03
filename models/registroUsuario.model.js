const mongoose = require('mongoose');

const SchemaregistroUsuarios = new mongoose.Schema({
    nombreCompleto:{
        type: String,
        required: true, 
        unique: false
    },
    cedula: {
        type: String,
        unique: true,
        required: true,
    },
    correoElectronico: {
        type: String,
        unique: true,
        required: true,
    },
    contrasena: {
        type: String,
        required: true,
        minlength: 8 // Mínimo 8 caracteres
    },
    confirmarContrasena: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value === this.contrasena; // Debe coincidir con la contraseña
            },
            message: "Las contraseñas no coinciden"
        }
    },
    rol: {
        type: String,
        enum: ["Maestro", "Padre de familia"], // Lista desplegable con opciones fijas
        required: true
    },
    estadoCuenta: {
        type: Boolean,
        required: true, 
        default: true 
    }
});

const registroUsuarios = mongoose.model('registroUsuarios', SchemaregistroUsuarios);
module.exports = registroUsuarios;
