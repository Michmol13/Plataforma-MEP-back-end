const mongoose = require('mongoose');

const schemaNivelesEducativos = new mongoose.Schema({
    nombreNivel: {
        type: String,
        required: true,
        unique: true 
    },
    descripcion: {
        type: String,
        required: false, 
        maxlength: 500 
    },
    estado: {
        type: Boolean,
        required: true, 
        default: true 
    }
});

const NivelesEducativos = mongoose.model('NivelesEducativos', schemaNivelesEducativos);
module.exports = NivelesEducativos;
