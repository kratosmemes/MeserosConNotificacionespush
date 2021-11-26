const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Libro = require('./libro');

let Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    nombre_mesero: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del mesero']
    },
    numero_telefonico: {
        type: Number,
        required: [true, 'Por favor ingresa el telefono del cliente']
    },
    id_evento: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Por favor ingresa el id del libro']
    },
    id_mesero: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el id del usuario']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

prestamoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Prestamo', prestamoSchema);