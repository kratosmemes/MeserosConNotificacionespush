const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
let Schema = mongoose.Schema;

let libroSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre de el libro']

    },
    evento: {
        type: String,
        required: [true, 'Por favor ingresa el tipo de evento']

    },
    descripcion: {
        type: String,
        required: [true, 'Por favor ingresa el tipo de descripción']

    },
    cantidad: {
        type: Number,
        required: [true, 'Por favor ingresa la cantidad de meseros']

    },
    paga: {
        type: Number,
        required: [true, 'Por favor ingresa la paga por c/u']

    },
    dia: {
        type: String,
        required: [true, 'Por favor ingresa el día del evento']

    },
    inicio: {
        type: String,
        required: [true, 'Por favor ingresa el inicio del evento']

    },
    termino: {
        type: String,
        required: [true, 'Por favor ingresa el termino del evento']

    },
    estado_M: {
        type: String,
        required: [true, 'Por favor ingresa el estado']

    },
    ciudad: {
        type: String,
        required: [true, 'Por favor ingresa la ciudad']

    },
    colonia: {
        type: String,
        required: [true, 'Por favor ingresa la colonia']

    },
    calle: {
        type: String,
        required: [true, 'Por favor ingresa la calle']

    },
    exterior: {
        type: String,
        required: [true, 'Por favor ingresa el número exterior']

    },
    interior: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el usuario']
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        default: ""
    }
});

libroSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Libro', libroSchema);