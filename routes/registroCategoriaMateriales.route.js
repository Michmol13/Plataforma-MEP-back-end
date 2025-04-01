const express = require('express');
const router = express.Router();
const registroCategoria = require('../models/registrocategoriaMateriales.model');


router.post('/', async (req, res) => {
    try {
        const nuevaCategoria = new Categoria(req.body);
        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const categorias = await registroCategoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
