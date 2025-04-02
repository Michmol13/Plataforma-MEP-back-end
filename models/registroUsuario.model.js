const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombreCompleto:{
        type: String,
        required: true, 
        unique: false
    },
    cedula: {
        type: String,
        unique: true,
        required: true,
        match: [/^\d{1}-\d{4}-\d{4}$/, "Formato de cédula inválido"] // Valida el formato X-XXXX-XXXX
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
        default: true // Activo/Inactivo (true = Activo, false = Inactivo)
    }
});

const Usuario = mongoose.model('registroUsuarios', UsuarioSchema);
module.exports = Usuario;
