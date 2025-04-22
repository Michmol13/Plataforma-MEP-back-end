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
        match: [/^\d{1}-\d{3,4}-\d{3,5}$/, "Formato de cédula inválido"] 
    },
    correoElectronico: {
        type: String,
        unique: true,
        required: true,
    },
    contrasena: {
        type: String,
        required: true,
        minlength: 8 
    },
    confirmarContrasena: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value === this.contrasena;
            },
            message: "Las contraseñas no coinciden"
        }
    },
    rol: {
        type: String,
        enum: ["Maestro", "Padre de familia"], 
        required: true
    },
    estadoCuenta: {
        type: Boolean,
        required: true, 
    }
});

const registroUsuarios = mongoose.model('registroUsuarios', SchemaregistroUsuarios);
module.exports = registroUsuarios;
