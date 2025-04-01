const express = require('express');
const router = express.Router();
const RegistroMaterialesEscolares = require('../models/registroMaterialesEscolares.model');
const Material = require('../models/agregarMaterialesLista.model');


router.post('/', async(req,res) =>{
    const{nombreMaterial, descripcion, categoria, unidadMedida, estado} = req.body;

    if(!nombreMaterial ||!descripcion ||!categoria || !unidadMedida || !estado){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const nuevoRegistroMaterialesEscolares = new RegistroMaterialesEscolares ({nombreMaterial, descripcion, categoria, unidadMedida, estado});
        await nuevoRegistroMaterialesEscolares.save();
        res.status(201).json(nuevoRegistroMaterialesEscolares);
    }catch(error){
        res.status(400).json({msj: error.message})
    }
} );

router.get('/', async (req, res) => {
    try {
        const materiales = await RegistroMaterialesEscolares.find();
        res.json(materiales);
    } catch (error) {
        res.status(500).json({ msj: error.message });
    }
});

router.delete('/eliminarRegistro', async (req, res) => {
    try {
        const { nombreMaterial, descripcion, categoria, unidadMedida, estado  } = req.body;

        if (!nombreMaterial || !descripcion || !categoria || !unidadMedida || !estado ) {
            return res.status(400).json({ message: 'Se requiere nombreMaterial, descripcion, categoria, unidadMedida y estado .' });
        }

    const resultado = await RegistroMaterialesEscolares.deleteOne({
        nombreMaterial,
        descripcion,
        categoria,
        unidadMedida,
        estado
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

router.put('/agregar-materiales', async (req, res) => {
    const {nombreMaterial, MaterialId} = req.body;

    if(!nombreMaterial || !MaterialId) {
        return res.status(400).json({msj: 'Nombre material y ID son obligatorios'});
    }

    try {

        const material = await Material.findById(MaterialId);

        if(!material){
            return res.status(404).json({msj: 'Material no encontrado'});
        }

        const registroMaterialesEscolares = await RegistroMaterialesEscolares.findOne({nombreMaterial});
        if(!registroMaterialesEscolares){
            return res.status(404).json({msj: 'Registro de material no encontrado'});
        }
        
        if (!registroMaterialesEscolares.cantidad.includes(MaterialId)) {
            registroMaterialesEscolares.cantidad.push(MaterialId);
            await registroMaterialesEscolares.save();
        }

        res.status(200).json({msj: 'Cantidad agregada al material'});

    } catch(error){
        res.status(500).json({msj: 'Error al agregar cantidad', error: error.message});
    }
})

module.exports = router;