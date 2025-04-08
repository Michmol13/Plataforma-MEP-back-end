const express = require('express');
const router = express.Router();
const registroCategoriaMateriales = require('../models/registroCategoriaMateriales.model');


router.post('/', async (req, res) => {
    try {
        const nuevaCategoria = new registroCategoriaMateriales(req.body);
        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const categorias = await registroCategoriaMateriales.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/eliminarRegistro', async (req, res) => {
    try {
        const{ nombre } = req.body
        if (!nombre) {
            return res.status(404).json({ msj: 'Se requiere nombre de la categoria' });
        }
            const resultado = await registroCategoriaMateriales.deleteOne({
            nombre, 
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ msj: 'Categoria no encontrada.' });
        }

        res.status(200).json({ msj: 'Categoria eliminada exitosamente.' });
        } catch (error) {
            console.error('Error al eliminar la categoria.') 
            res.status(500).json({ msj: 'Hubo un error al eliminar la categoria.' });
        }   
});

module.exports = router;
