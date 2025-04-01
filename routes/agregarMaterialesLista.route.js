const express = require('express');
const router = express.Router();
const AgregarMaterialesLista = require('../models/agregarMaterialesLista.model');

router.post('/', async(req,res) =>{
    try{
        const nuevoAgregarMaterialesLista = new AgregarMaterialesLista(req.body);
        const materialesListaGuardados = await nuevoAgregarMaterialesLista.save();
        res.status(201).json(materialesListaGuardados);
    }catch(error){
        res.status(400).json({mensaje: 'Error al agregar el material a la lista', error});
    }
} );

router.get('/', async(req,res) =>{
    try{
        const agregarMaterialesLista = await AgregarMaterialesLista.find();
        res.status(200).json(agregarMaterialesLista);
    }catch(error){
        res.status(500).json({mensaje: 'Error al obtener materiales',error});
    }
});


module.exports = router;