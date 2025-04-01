const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    cedula: {
        type: String,
        unique: true,
        required: true,
        match: [/^\d{1}-\d{4}-\d{4}$/, "Formato de cédula inválido"] // Valida el formato X-XXXX-XXXX
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
