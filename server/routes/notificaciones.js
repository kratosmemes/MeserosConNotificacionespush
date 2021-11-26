const express = require('express');
const app = express();
const suscritosDB = require('../models/usuarios_suscritos');

app.post('/subscription' , async(req,res)=>{
    console.log(req.body)
    let nuevaSuscripcion =  new suscritosDB({
        user_config:  req.body
    });
    nuevaSuscripcion.save().then(()=>{
        res.status(200);
    });
});
module.exports = app;