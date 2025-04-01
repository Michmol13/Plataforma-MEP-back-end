const mongoose = require ('mongoose');
const schemaCategoriaMateriales = new mongoose.Schema ({

    nombre:{ 
    type:String ,
    required: true },
    descripcion: { type: String }

})
module.exports = mongoose.model('Categoria', CategoriaSchema);
