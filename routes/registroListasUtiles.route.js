const express = require('express');
const router = express.Router();
const registroListasUtiles = require('../models/registroListaUtiles.model');

router.post('/', async(req,res) =>{
    const{nombreLista, fechaCreacion, estadoLista} = req.body;

    if(!nombreLista || !fechaCreacion || !estadoLista){
        return res.status(400).json({msj : 'Todos los campos son obligatorios'})
    }

    try{
        const nuevoregistroListas = new registroListasUtiles({nombreLista, fechaCreacion, estadoLista});
        await nuevoregistroListas.save();
        res.status(201).json(nuevoregistroListas);
    }catch(error){
        res.status(400).json({msj: error.message})
    }
} );

router.get('/', async(req,res) =>{
    try{
        const registro = await registroListasUtiles.find() .populate('nivelEducativo');
        res.json(registro);
    }catch(error){
        res.status(500).json({msj: error.message})
    }
});

const registroNivelesEducativos = require('../models/registroNivelesEducativos.model');

router.put('/asignar-nivel', async (req, res) => {
    const { nombreLista, registroNivelesEducativosId } = req.body;

    if (!nombreLista || !registroNivelesEducativosId) {
        return res.status(400).json({ msj: 'El nombre de la lista y el ID del nivel educativo son obligatorios.' });
    }

    try {
        const nivel = await registroNivelesEducativos.findById(registroNivelesEducativosId);
        if (!nivel) {
            return res.status(404).json({ msj: 'Nivel educativo no encontrado.' });
        }

        const listaListas = await registroListasUtiles.findOne({nombreLista});
        if (!listaListas) {
            return res.status(404).json({ msj: 'Lista no encontrada con ese nombre.' });
        }
        if (!listaListas.nivelEducativo.includes(registroNivelesEducativosId)) {
            listaListas.nivelEducativo.push(registroNivelesEducativosId);
            await listaListas.save();
        }
        res.status(200).json({ msj: 'Nivel educativo agregado.'});
    } catch (error) {
        res.status(500).json({ msj: 'Error al agregar el nivel educativo.', error: error.message });
    }
});

router.delete('/eliminarRegistro', async (req, res) => {
    try {
        const { nombreLista } = req.body;

        if (!nombreLista) {
            return res.status(400).json({ message: 'Se requiere nombrelista' });
        }

        const resultado = await registroListasUtiles.deleteOne({
            nombreLista,
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

const registroMaterialesEscolares = require('../models/registroMaterialesEscolares.model');

router.put('/agregar-material', async (req, res) => {
    const {nombreLista, registroMaterialesEscolaresId} = req.body;

    if(!nombreLista || !registroMaterialesEscolaresId) {
        return res.status(400).json({msj: 'Nombre lista y ID son obligatorios'});
    }

    try {

        const material = await registroMaterialesEscolares.findById(registroMaterialesEscolaresId);

        if(!material){
            return res.status(404).json({msj: 'Material no encontrado'});
        }

        const listaUtiles = await registroListasUtiles.findOne({nombreLista});
        if(!listaUtiles){
            return res.status(404).json({msj: 'Registro de lista no encontrado'});
        }
        
        if (!listaUtiles.materiales.includes(registroMaterialesEscolaresId)) {
            listaUtiles.materiales.push(registroMaterialesEscolaresId);
            await listaUtiles.save();
        }
        res.status(200).json({msj: 'Material agregado a la lista'});

    } catch(error){
        res.status(500).json({msj: 'Error al agregar material', error: error.message});
    }
});



module.exports = router;