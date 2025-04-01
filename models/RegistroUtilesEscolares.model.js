const mongoose = require('mongoose');

const schemaRegistroUtilesEscolares = new mongoose.Schema({
    nombreUtil:{
        type: String,
        required: true,
        unique: true
    },
    categoria:{
        type: String,
        required: true,
        unique: false
    },
    cantidad:{
        type: Number,
        required: true,
        unique: false
    },
    descripcion:{
        type: Number,
        required: true,
        unique: false
    },
    fechaRegistro:{
    type: Number,
    required: true,
    unique: false
}
});

const RegistroUtilesEscolares = mongoose.model('RegistroUtilesEscolares', schemaRegistroUtilesEscolares);
module.exports = RegistroUtilesEscolares;