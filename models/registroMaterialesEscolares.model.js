const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schemaregistroMaterialesEscolares = new mongoose.Schema({
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
    categoria:           
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'registroCategoria',
            required: true,
        },
    unidadMedida:{
        type: String,
        required: true,
        unique: false
    },
    estado:{
        type: Boolean,
        required: true, 
        default: true 
    }   

});

const registroMaterialesEscolares = mongoose.model('registroMaterialesEscolares', schemaregistroMaterialesEscolares);
module.exports = registroMaterialesEscolares;