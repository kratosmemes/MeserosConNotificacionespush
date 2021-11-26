const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();
const { verificaToken } = require('../middlewares/autenticacion');
const Libro = require('../models/libro');

const webpush = require('../webpush');
const subscriptions =  require('../models/usuarios_suscritos');

// app.get('/libro', [verificaToken], (req, res) => {
//     Libro.find({ disponible: true })
//         .exec((err, libros) => {
//             if (err) {
//                 return res.status(400).json({
//                     ok: false,
//                     err
//                 });
//             }
//             return res.status(200).json({
//                 ok: true,
//                 count: libros.length,
//                 libros
//             })
//         });
// });

app.get('/libro/:usuario', [verificaToken], (req, res) => {
    let usuario = req.params.usuario;
    Libro.find({ usuario: usuario }, (err, resp) => {
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

app.get('/libro/mesero/:estado_M', [verificaToken], (req, res) => {
    let estado_M = req.params.estado_M;
    Libro.find({ estado_M: estado_M, cantidad: { $gt: 0 } }, (err, resp) => {
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

app.get('/libro/mesero/ver/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    Libro.find({ _id: id }, (err, resp) => {
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

app.get('/libro/mesero/ver/aceptado/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    Libro.find({ _id: id }, (err, resp) => {
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

app.post('/libro', [verificaToken], async(req, res) => {
    let body = req.body;

    let subcriptionsDB = await subscriptions.find();
    


    let libro = new Libro({
        nombre: body.nombre,
                      evento:body.evento,
                      descripcion:body.descripcion,
                      cantidad:body.cantidad,
                      paga:body.paga,
                      dia:body.dia,
                      inicio:body.inicio,
                      termino:body.termino,
                      estado_M:body.estado_M,
                      ciudad:body.ciudad,
                      colonia:body.colonia,
                      calle:body.calle,
                      exterior:body.exterior,
                      interior:body.interior,
                      usuario:body.usuario,
                      img:body.img

    });
    const payload = JSON.stringify({
        title: "Nueva notificacion!!",
        message: "qwqwqwe"
    });
    const qwe = {
        endpoint: 'https://fcm.googleapis.com/fcm/send/dry2cHBN3s4:APA91bHtHq9ybdwDjtGnEGJb4NXwHDxTtRXf74SLfqx8c7ISO_7YoWoKnFuKRIuGAcHutqESSFPFH6KC2accbFBNmon2LzUHvlJnxzNKgzCMAMmkkgfAEq7EE4lJ6l2RKBDpo0a15fKU',
        expirationTime: null,
        keys: {
          p256dh: 'BEOjMnd06g90JAqM76IZWD6TvzBxoR-Dp8VcWG7WBBxAKeJ23xGt9HomwKBGvkrCtUvp7D8GKpFsFmrekNczxTI',
          auth: '7irIEVNC2lcRD67xHEhORw'
        }
      }


    libro.save(async(err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        /* Mandando notififcaion si se guarda un evento */
        await webpush.sendNotification(qwe , payload).then(qwe=>{
            console.log(qwe)
        }).catch(err=>{
            console.log(err)
        })

        return res.status(200).json({
            ok: true,
            libDB
        });

    });

});


app.put('/libro/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUnitario', 'cantidadPorUnidad', 'usuario', 'disponible', 'img']);

    Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libDB
        });
    });
});

app.put('/libro/mesero/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['cantidad']);

    Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libDB
        });
    });
});

app.delete('/libro/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    Libro.deleteOne({ _id: id }, (err, resp) => {
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
                    msg: 'Libro no encontrado'
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