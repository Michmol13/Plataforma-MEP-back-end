const mongoose = require('mongoose');

const schemaRegistroMaterialesEscolares = new mongoose.Schema({
    nombreMaterial:{
        type: String,
        required: true,
        unique: true
    },
    descripcion:{
        type: String,
        required: true,
        unique: false
    },
    categoria:{
        type: String,
        required: true,
        unique: false
    },
    unidadMedida:{
        type: String,
        required: true,
        unique: false
    },
    estado:{
    type: Boolean,
    unique: false
}
});

const RegistroMaterialesEscolares = mongoose.model('RegistroMaterialesEscolares', schemaRegistroMaterialesEscolares);
module.exports = RegistroMaterialesEscolares;