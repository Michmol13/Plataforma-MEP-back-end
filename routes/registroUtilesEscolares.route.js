const express = require('express');
const router = express.Router();
const RegistroUtilesEscolares = require('../models/registroUtilesEscolares.model');

router.post('/', async(req,res) =>{
    const{nombreUtil, categoría, cantidad, descripción, fechaRegistro} = req.body;

    if(!nombreUtil || !categoría || !cantidad || !descripción || !fechaRegistro){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const registroUtilesEscolares = new registroUtilesEscolares ({nombreUtil, categoría, cantidad, descripción, fechaRegistro});
        await nuevoregistroUtilesEscolaresregistroUtilesEscolares.save();
        res.status(201).json(nuevoregistroUtilesEscolares);
    }catch(error){
        res.status(400).json({msj: error.message})
    }
} );

router.get('/', async(req,res) =>{
    try{
        const registroUtilesEscolares = await registroUtilesEscolares.find();
        res.json(registroUtilesEscolares);
    }catch(error){
        res.status(500).json({msj: error.message})
    }
});


router.delete('/eliminar', async (req, res) => {
    try {
      const estudianteDuplicado = await registroUtilesEscolares.aggregate([
        {
          $group: {
            _id: { nombreUtil: "$nombreUtil", categoría: "$categoría", cantidad: "$cantidad", descripción: "$descripción", fechaRegistro: "$fechaRegistro"},
            count: { $sum: 1 },  
            ids: { $push: "$_id" }
          }
        },
        {
          $match: {
            count: { $gt: 1 }
          }
        }
      ]);


      for (const grupo of estudianteDuplicado) {
        const idsAEliminar = grupo.ids.slice(1);
        await registroUtilesEscolares.deleteMany({ _id: { $in: idsAEliminar } });
        console.log(`Se eliminaron ${idsAEliminar.length} registros duplicados`);
      }
  
      res.status(200).json({ message: 'Registros duplicados eliminados exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar registros duplicados:', error.message);
      res.status(500).json({ message: 'Hubo un error al eliminar los registros duplicados.' });
    }
  });
  

module.exports = router;