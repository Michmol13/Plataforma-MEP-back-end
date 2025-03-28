const express = require('express');
const router = express.Router();
const NivelesEducativos = require('../models/NivelesEducativos.model'); 

router.post('/', async (req, res) => {
    const { nombreNivel, descripcion, estado } = req.body;

    
    if (!nombreNivel || !descripcion ||!estado) {
        return res.status(400).json({ msj: 'El nombre del nivel y el estado son obligatorios.' });
    }

    try {
       
        const NivelesEducativos = new NivelesEducativos({nombreNivel, descripcion, estado});
        await nuevoNivelesEducativos.save();
        res.status(201).json(nuevoNivelesEducativos);  
    } catch (error) {
        res.status(400).json({ msj: error.message });  
    }
});


router.get('/', async (req, res) => {
    try {
        const nivelesEducativos = await NivelesEducativos.find();  
        res.json(nivelesEducativos);
    } catch (error) {
        res.status(500).json({ msj: error.message });  
    }
});


router.delete('/NivelEducativo', async (req, res) => {
    try {
        const{ nombreNivel, descripcion, estado } = req.body
        if (!nombreNivel || !descripcion ||!estado) {
            return res.status(404).json({ msj: 'Nivel educativo no encontrado.' });
        }

            const resultado = await NivelesEducativos.deleteOne({
            nombreNivel, descripcion, estado
        });
         if (resultado.deletedCount === 0) {
                return res.status(404).json({ msj: 'Nivel educativo no encontrado.' });
            }
        res.status(200).json({ msj: 'Nivel educativo eliminado exitosamente.' });
        } catch (error) {
         console.error('Error al eliminar Nivel Educativo.') 
            res.status(500).json({ msj: 'Hubo un error al eliminar el nivel educativo.' });
        }   
        







});



module.exports = router;
