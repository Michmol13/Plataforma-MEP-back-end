const express = require('express');
const router = express.Router();
const registroMaterialesEscolares = require('../models/registroMaterialesEscolares.model');


router.post('/', async(req,res) =>{
    const{nombreMaterial, descripcion, categoria, unidadMedida, estado} = req.body;

    if(!nombreMaterial ||!descripcion ||!categoria || !unidadMedida || !estado){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const nuevoregistroMaterialesEscolares = new registroMaterialesEscolares ({nombreMaterial, descripcion, categoria, unidadMedida, estado});
        await nuevoregistroMaterialesEscolares.save();
        res.status(201).json(nuevoregistroMaterialesEscolares);
    }catch(error){
        res.status(400).json({msj: error.message})
    }
} );

router.get('/', async (req, res) => {
    try {
        const materiales = await registroMaterialesEscolares.find();
        res.json(materiales);
    } catch (error) {
        res.status(500).json({ msj: error.message });
    }
});

router.delete('/eliminarRegistro', async (req, res) => {
    try {
        const { nombreMaterial } = req.body;

        if (!nombreMaterial) {
            return res.status(400).json({ message: 'Se requiere nombreMaterial' });
        }

    const resultado = await registroMaterialesEscolares.deleteOne({
        nombreMaterial,
    });

    if (resultado.deletedCount === 0) {
        return res.status(404).json({ message: 'No se encontró el material.' });
    }
    
        res.status(200).json({ message: 'Material eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar material:', error.message);
        res.status(500).json({ message: 'Hubo un error al eliminar el material.' });
    }
});

module.exports = router;