const express = require('express');
const router = express.Router();
const registroUsuario = require('../models/registroUsuario.model');

router.post('/', async (req, res) => {
    const { nombreCompleto, cedula, correoElectronico, contrasena, confirmarContrasena, rol, estadoCuenta } = req.body;

    if (!nombreCompleto || !cedula || !correoElectronico || !contrasena || !confirmarContrasena || !rol || estadoCuenta === undefined) {
        return res.status(400).json({ msj: 'Todos los campos obligatorios deben ser llenados.' });
    }

    if (contrasena !== confirmarContrasena) {
        return res.status(400).json({ msj: 'Las contraseñas no coinciden' });
    }

    try {
        const existeCedula = await registroUsuario.findOne({ cedula });
        if (existeCedula) {
            return res.status(400).json({ msj: 'Ya existe un usuario registrado con esta cédula.' });
        }

        const nuevousuario = new registroUsuario({
            nombreCompleto,
            cedula,
            correoElectronico,
            contrasena,
            confirmarContrasena,
            rol,
            estadoCuenta
        });
        await nuevousuario.save();
        res.status(201).json(nuevousuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msj: 'Ocurrió un error al registrar al usuario.', error: error.message });
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
        const { cedula } = req.body;

        if (!cedula) {
            return res.status(400).json({ message: 'Se requiere la cedula del usuario' });
        }

        const resultado = await registroUsuario.deleteOne({
            cedula
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