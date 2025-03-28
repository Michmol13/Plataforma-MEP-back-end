const mongoose = require('mongoose');

const schemaregistroNivelesEducativos = new mongoose.Schema({
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

const registroNivelesEducativos = mongoose.model('registroNivelesEducativos', schemaregistroNivelesEducativos);
module.exports = registroNivelesEducativos;
