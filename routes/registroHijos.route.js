const express = require('express');
const router = express.Router();
const registroHijos = require('../models/registroHijos.model');

router.post('/', async(req,res) =>{
    const{nombrecompletoHijo, nivelEducativo, annoLectivo} = req.body;

    if(!nombrecompletoHijo || !nivelEducativo || !annoLectivo){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const nuevoregistroHijos = new registroHijos({nombrecompletoHijo, nivelEducativo, annoLectivo});
        await nuevoregistroHijos.save();
        res.status(201).json(nuevoregistroHijos);
    }catch(error){
        res.status(400).json({msj: error.message})
    }
} );

router.get('/', async(req,res) =>{
    try{
        const registro = await registroHijos.find();
        res.json(registro);
    }catch(error){
        res.status(500).json({msj: error.message})
    }
});


router.delete('/eliminarRegistro', async (req, res) => {
    try {
        const { nombrecompletoHijo, nivelEducativo, annoLectivo } = req.body;

        if (!nombrecompletoHijo || !nivelEducativo || !annoLectivo) {
            return res.status(400).json({ message: 'Se requiere nombrecompletoHijo, nivelEducativo, annoLectivo' });
        }

        const resultado = await registroHijos.deleteOne({
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