const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const schemaCategoriaMateriales = new mongoose.Schema ({

    nombre:{ 
        type:String ,
        required: true,
        unique: false
    },

    descripcion: { 
        type: String, 
        required: true,
        unique: false
    },

})
const registroCategoria = mongoose.model('registroCategoria', schemaCategoriaMateriales);
module.exports = registroCategoria;