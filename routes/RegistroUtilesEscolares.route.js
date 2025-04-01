const express = require('express');
const router = express.Router();
const RegistroUtilesEscolares = require('../models/RegistroUtilesEscolares.model');

router.post('/', async(req,res) =>{
    const{nombreUtil, categoria, cantidad, descripcion, fechaRegistro} = req.body;

    if(!nombreUtil || !categoria || !cantidad || !descripcion || !fechaRegistro){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const RegistroUtilesEscolares = new RegistroUtilesEscolares ({nombreUtil, categoria, cantidad, descripcion, fechaRegistro});
        await nuevoRegistroUtilesEscolares.save();
        res.status(201).json(nuevoRegistroUtilesEscolares);
    }catch(error){
        res.status(400).json({msj: error.message})
    }
} );

router.get('/', async(req,res) =>{
    try{
        const RegistroUtilesEscolares = await RegistroUtilesEscolares.find();
        res.json(RegistroUtilesEscolares);
    }catch(error){
        res.status(500).json({msj: error.message})
    }
});


router.delete('/eliminar', async (req, res) => {
    try {
      const utilesDuplicados = await RegistroUtilesEscolares.aggregate([
        {
          $group: {
            _id: { nombreUtil: "$nombreUtil", categoria: "$categoria", cantidad: "$cantidad", descripcion: "$descripcion", fechaRegistro: "$fechaRegistro"},
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


      for (const grupo of utilesDuplicados) {
        const idsAEliminar = grupo.ids.slice(1);
        await RegistroUtilesEscolares.deleteMany({ _id: { $in: idsAEliminar } });
        console.log(`Se eliminaron ${idsAEliminar.length} utiles duplicados`);
      }
  
      res.status(200).json({ message: 'Utiles duplicados eliminados exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar utiles duplicados:', error.message);
      res.status(500).json({ message: 'Hubo un error al eliminar los utiles duplicados.' });
    }
  });
  

module.exports = router;