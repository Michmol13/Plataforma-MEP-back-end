const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    cantidad:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Material'
        }
    ]
    

});

const RegistroMaterialesEscolares = mongoose.model('RegistroMaterialesEscolares', schemaRegistroMaterialesEscolares);
module.exports = RegistroMaterialesEscolares;