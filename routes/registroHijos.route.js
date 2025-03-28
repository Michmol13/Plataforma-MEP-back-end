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


router.delete('/eliminarRegistro', async (req, res) => {
    try {
        const { nombrecompletoHijo, nivelEducativo, annoLectivo } = req.body;

        if (!nombrecompletoHijo || !nivelEducativo || !annoLectivo) {
            return res.status(400).json({ message: 'Se requiere nombrecompletoHijo, nivelEducativo y annoLectivo.' });
        }

        const resultado = await Registrohijos.deleteOne({
            nombrecompletoHijo,
            nivelEducativo,
            annoLectivo
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ message: 'No se encontró el estudiante.' });
        }

        res.status(200).json({ message: 'Estudiante eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar estudiante:', error.message);
        res.status(500).json({ message: 'Hubo un error al eliminar el estudiante.' });
    }
});

  
module.exports = router;