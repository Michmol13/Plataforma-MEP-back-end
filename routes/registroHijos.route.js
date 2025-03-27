const express = require('express');
const router = express.Router();
const Registrohijos = require('../models/registroHijos.model');

router.post('/', async(req,res) =>{
    const{nombrecompletoHijo, nivelEducativo, annoLectivo} = req.body;

    if(!nombrecompletoHijo || !nivelEducativo || !annoLectivo){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const nuevoRegistrohijos = new Registrohijos({nombrecompletoHijo, nivelEducativo, annoLectivo});
        await nuevoRegistrohijos.save();
        res.status(201).json(nuevoRegistrohijos);
    }catch(error){
        res.status(400).json({msj: error.message})
    }
} );

router.get('/', async(req,res) =>{
    try{
        const registrohijos = await Registrohijos.find();
        res.json(registrohijos);
    }catch(error){
        res.status(500).json({msj: error.message})
    }
});


router.delete('/eliminar', async (req, res) => {
    try {
      const estudianteDuplicado = await Registrohijos.aggregate([
        {
          $group: {
            _id: { nombrecompletoHijo: "$nombrecompletoHijo", nivelEducativo: "$nivelEducativo", annoLectivo: "$annoLectivo" },
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
        await Registrohijos.deleteMany({ _id: { $in: idsAEliminar } });
        console.log(`Se eliminaron ${idsAEliminar.length} registros duplicados`);
      }
  
      res.status(200).json({ message: 'Registros duplicados eliminados exitosamente.' });
    } catch (error) {
      console.error('Error al eliminar registros duplicados:', error.message);
      res.status(500).json({ message: 'Hubo un error al eliminar los registros duplicados.' });
    }
  });
  

module.exports = router;