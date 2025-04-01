const express = require('express');
const router = express.Router();
const registroListasUtiles = require('../models/registroListaUtiles.model');

router.post('/', async(req,res) =>{
    const{nombrelista, nivelEducativo, fechaCreacion, estadolista} = req.body;

    if(!nombrelista || !nivelEducativo || !fechaCreacion || !estadolista){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const nuevoregistroListas = new registroListas({nombrelista, nivelEducativo, fechaCreacion, estadolista});
        await nuevoregistroListas.save();
        res.status(201).json(nuevoregistroListas);
    }catch(error){
        res.status(400).json({msj: error.message})
    }
} );

router.get('/', async(req,res) =>{
    try{
        const registro = await registroListasUtiles.find();
        res.json(registro);
    }catch(error){
        res.status(500).json({msj: error.message})
    }
});


router.delete('/eliminarRegistro', async (req, res) => {
    try {
        const { nombrelista, nivelEducativo, fechaCreacion, estadolista } = req.body;

        if (!nombrelista || !nivelEducativo || !fechaCreacion || !estadolista) {
            return res.status(400).json({ message: 'Se requiere nombrelista, nivelEducativo, fechaCreacion, estadolista' });
        }

        const resultado = await registroListas.deleteOne({
            nombrelista,
            nivelEducativo,
            fechaCreacion,
            estadolista
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ message: 'No se encontró la lista.' });
        }

        res.status(200).json({ message: 'Lista eliminada exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar lista:', error.message);
        res.status(500).json({ message: 'Hubo un error al eliminar la lista.' });
    }
});


module.exports = router;