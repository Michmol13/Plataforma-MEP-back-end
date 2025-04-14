const express = require('express');
const router = express.Router();
const registroMaterialesEscolares = require('../models/registroMaterialesEscolares.model');


router.post('/', async(req,res) =>{
    const{nombreMaterial, descripcion, unidadMedida, estado} = req.body;

    if(!nombreMaterial ||!descripcion || !unidadMedida || !estado){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const nuevoregistroMaterialesEscolares = new registroMaterialesEscolares ({nombreMaterial, descripcion, unidadMedida, estado});
        await nuevoregistroMaterialesEscolares.save();
        res.status(201).json(nuevoregistroMaterialesEscolares);
    }catch(error){
        res.status(400).json({msj: error.message})
    }
} );

router.get('/', async (req, res) => {
    try {
        const materiales = await registroMaterialesEscolares.find() .populate('categoria');
        res.json(materiales);
    } catch (error) {
        res.status(500).json({ msj: error.message });
    }
});

const registroCategoriaMateriales= require ('../models/registroCategoriaMateriales.model');

router.put('/asignar-categoria', async (req, res) => {
    const { nombreMaterial, registroCategoriaMaterialesId} = req.body;

    if (!nombreMaterial || !registroCategoriaMaterialesId) {
        return res.status(400).json({ msj: 'El nombre de material y el ID de categoria de materiales son obligatorios.' });
    }

    try {
        const Categoria = await registroCategoriaMateriales.findById(registroCategoriaMaterialesId);
        if (!Categoria) {
            return res.status(404).json({ msj: 'Categoria no encontrada.' });
        }

        const listaMateriales = await registroMaterialesEscolares.findOne({nombreMaterial});
        if (!listaMateriales) {
            return res.status(404).json({ msj: 'Material no encontrado con esa categoria.' });
        }
        if (!listaMateriales.categoria.includes(registroCategoriaMaterialesId)) {
            listaMateriales.categoria.push(registroCategoriaMaterialesId);
            await listaMateriales.save();
        }
        res.status(200).json({ msj: 'Categoria agregada.'});
    } catch (error) {
        res.status(500).json({ msj: 'Error al agregar la categoria.', error: error.message });
    }
})

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