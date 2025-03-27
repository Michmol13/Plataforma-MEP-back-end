const express = require('express');
const router = express.Router();
const Registrohijos = require('../models/registroHijos.model');

router.post('/', async(req,res) =>{
    const{nombreHijo, nivelEducativo, annoLectivo} = req.body;

    if(!nombreHijo || !nivelEducativo || !annoLectivo){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const nuevoRegistrohijos = new Registrohijos({nombreHijo, nivelEducativo, annoLectivo});
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

module.exports = router;