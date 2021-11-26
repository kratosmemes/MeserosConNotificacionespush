const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const { verificaToken } = require('../middlewares/autenticacion');
const Usuario = require('../models/usuario');

// app.get('/usuario', [verificaToken], (req, res) => {
//     let desde = req.params.desde || 0;
//     desde = Number(desde);

//     let limite = req.params.limite || 0;
//     limite = Number(limite);
//     Usuario.find({ estado: true })
//         .skip(desde)
//         .limit(limite)
//         .exec((err, usuarios) => {
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     err
//                 });
//             }
//             console.log(req.usuario);
//             return res.status(200).json({
//                 ok: true,
//                 count: usuarios.length,
//                 usuarios
//             })
//         });
// });


app.get('/usuario/:id/:cliente', [verificaToken], (req, res) => {
    let id = req.params.id;
    let cliente = req.params.cliente;
    Usuario.findOne({ _id: id, cliente: cliente }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
        

    });
});


// app.post('/usuario', [verificaToken], (req, res) => {
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        mesero: body.mesero,
        cliente: body.cliente,
        nombre: body.nombre,
        apellido_p: body.apellido_p,
        apellido_m: body.apellido_m,
        email: body.email,
        numero_telefonico: body.numero_telefonico,
        password: bcrypt.hashSync(body.password, 10),
        // password: body.password,
        ciudad: body.ciudad,
        estado_M: body.estado_M,
    });

    usuario.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });

    });
});

app.put('/usuario/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'apellido_p', 'apellido_m', 'numero_telefonico', 'ciudad', 'estado_M']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.delete('/usuario/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    Usuario.deleteOne({ _id: id }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    id,
                    msg: 'Usuario no encontrado'
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });

    });
});

module.exports = app;