const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario.model');

router.post('/', async(req,res) =>{
    const{correo, cedula, nombre, contrasena} = req.body;

    if(!correo || !cedula || !nombre || !contrasena){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const nuevoUsuario = new Usuario({correo, cedula, nombre, contrasena});
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    }catch(error){
        res.status(400).json({msj: error.message})
    }
} );

router.get('/', async(req,res) =>{
    try{
        const usuarios = await Usuario.find();
        res.json(usuarios);
    }catch(error){
        res.status(500).json({msj: error.message})
    }
});

module.exports = router;