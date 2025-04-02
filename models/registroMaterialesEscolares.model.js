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
    /*cantidad:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Material'
        }
    ],*/
    estado:{
        type: Boolean,
        required: true, 
        default: true 
    }   

});

const registroMaterialesEscolares = mongoose.model('registroMaterialesEscolares', schemaregistroMaterialesEscolares);
module.exports = registroMaterialesEscolares;