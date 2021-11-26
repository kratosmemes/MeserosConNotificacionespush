const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    mesero: {
        type: String,
        default: ""
    },
    cliente: {
        type: String,
        default: ""
    },
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    apellido_p: {
        type: String,
        required: [true, 'Por favor ingresa el apellido del usuario']
    },
    apellido_m: {
        type: String,
        required: [true, 'Por favor ingresa el apellido del usuario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el correo electronico']
    },
    numero_telefonico: {
        type: Number,
        required: [true, 'Por favor ingresa un numero de telefono']
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa la contraseña']
    },
    ciudad: {
        type: String,
        required: [true, 'Por favor ingresa la ciudad']
    },
    estado_M: {
        type: String,
        required: [true, 'Por favor ingresa el estado']
    },
    estado: {
        type: Boolean,
        default: false
    }


});

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);