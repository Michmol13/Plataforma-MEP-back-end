const mongoose = require ('mongoose');
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
module.exports = mongoose.model('Categoria', CategoriaSchema);
