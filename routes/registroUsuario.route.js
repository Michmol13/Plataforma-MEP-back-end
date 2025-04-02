const express = require('express');
const router = express.Router();
const registroUsuario = require('../models/registroUsuario.model');

router.post('/', async (req, res) => {
    let { nombreCompleto, cedula, correoElectronico, contrasena, confirmarContrasena, rol, estadoCuenta } = req.body;

    if (!nombreCompleto?.trim() || !cedula?.trim() || !correoElectronico?.trim() || !contrasena || !confirmarContrasena || !rol || typeof estadoCuenta === 'undefined') {
        return res.status(400).json({ msj: 'Todos los campos obligatorios deben ser llenados.' });
    }

    try {
        const nuevousuario = new registroUsuario({ nombreCompleto, cedula, correoElectronico, contrasena, confirmarContrasena, rol, estadoCuenta });
        await nuevousuario.save();
        res.status(201).json(nuevousuario);
    } catch (error) {
        res.status(400).json({ msj: error.message });
    }
});
    
router.get('/', async(req,res) =>{
    try{
        const usuarios = await registroUsuario.find();
        res.json(usuarios);
    }catch(error){
        res.status(500).json({msj: error.message})
    }
});

router.delete('/eliminarRegistro', async (req, res) => {
    try {
        const { nombreCompleto, cedula, correoElectronico, contrasena, confirmarContrasena, rol, estadoCuenta } = req.body;

        if (!nombreCompleto || !cedula || !correoElectronico || !contrasena || !confirmarContrasena || !rol || !estadoCuenta) {
            return res.status(400).json({ message: 'Se requiere mas datos' });
        }

        const resultado = await registroUsuario.deleteOne({
            nombreCompleto,
            cedula,
            correoElectronico,
            contrasena,
            confirmarContrasena,
            rol,
            estadoCuenta
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ message: 'No se encontró al usuario.' });
        }

        res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error.message);
        res.status(500).json({ message: 'Hubo un error al eliminar al usuario.' });
    }
});


module.exports = router;