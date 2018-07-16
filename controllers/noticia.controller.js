const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');
// var async = require('async');

let _noticia;

const getAll = (req, res) => {
    _noticia.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'noticias', res));
};

const getById = (req, res) => {
    //const id = req.params.id;

    const { id } = req.params;

    console.log(id.toString().length);

    if (id.toString().length != 24) {
        res.status(status.BAD_REQUEST);
        res.json({ err: "Identificador Inválido" });
    }

    else {
        _noticia.find({ _id: id })
            .sort({})
            .exec(handler.handleOne.bind(null, 'noticia', res));
    }
};

const getByTituloAut = (req, res) => {
    const { titulo, autor } = req.params;

    _noticia.find({ titulo: titulo, autor: autor })
        .sort({})
        .exec(handler.handleMany.bind(null, 'noticia', res));
};

const deleteById = (req, res) => {
    const id = req.params.id;

    _noticia.remove({_id:id},(err,data)=>{
        if(err){
                res.status(400);
                res.json({msg:"No se pudo realizar la operación, intente nuevamente"})
        }else{
            res.status(200);
            res.json({msg:"La notica se eliminó correctamente"});
        }
    });
    //const { id } = req.params;
    
};

const createNoticia = (req, res) => {
    const noticia = req.body;

    _noticia.create(noticia)
        .then(
            (data) => {
                res.status(200);
                res.json({msg:"Noticia creado correctamente",data:data});
            }
        )
        .catch(
            (err) => {
                res.status(400);
                res.json({msg:"Algo va mal!!!",data:err});
            }
        )
};

const updateById = (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    const query = {_id:id};

    _noticia.findOneAndUpdate(query,newData,(err,data)=>{
        if(err){
                res.status(400);
                res.json({msg:"No se pudo realizar la operación, intente nuevamente"})
        }else{
            res.status(200);
            res.json({msg:"La noticia se modificó correctamente"});
        }
    });
    //const { id } = req.params;
};

module.exports = (Noticia) => {
    _noticia = Noticia;
    return ({
        getAll,
        getById,
        getByTituloAut,
        deleteById,
        createNoticia,
        updateById
    });
}