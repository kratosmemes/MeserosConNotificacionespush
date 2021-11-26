const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const { verificaToken } = require('../middlewares/autenticacion');
const Prestamo = require('../models/prestamo');

// app.get('/prestamo', [verificaToken], (req, res) => {
//     Prestamo.find({ estado: true })
//         .exec((err, prestamos) => {
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     err
//                 });
//             }
//             return res.status(200).json({
//                 ok: true,
//                 count: prestamos.length,
//                 prestamos
//             })
//         });
// });

app.get('/prestamo/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    Prestamo.find({ id_evento: id, estado: true })
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: prestamos.length,
                prestamos
            })
        });
});

app.get('/prestamo/mesero/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    Prestamo.find({ id_mesero: id, estado: true })
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: prestamos.length,
                prestamos
            })
        });
});

app.post('/prestamo', [verificaToken], (req, res) => {
    let body = req.body;

    let prestamo = new Prestamo({
        nombre_mesero: body.nombre_mesero,
        numero_telefonico: body.numero_telefonico,
        id_evento: body.id_evento,
        id_mesero: body.id_mesero

    });

    prestamo.save((err, preDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            preDB
        });

    });

});


app.put('/prestamo/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['cliente', 'telefono', 'libro', 'cantidad', 'usuario', 'estado']);

    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, preDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            preDB
        });
    });
});

app.delete('/prestamo/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    Prestamo.deleteOne({ _id: id }, (err, resp) => {
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
                    msg: 'Prestamo no encontrado'
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