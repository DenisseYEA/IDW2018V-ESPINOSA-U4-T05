const status = require('http-status');
const config = require('../_config');
const handler = require('../utils/handler');
const http = require('http');
const async = require('async');
var qr = require('qr-image');
var fs = require('fs');
const path = require('path');
// var async = require('async');

let _user;

const getAll = (req, res) => {
    _user.find({})
        .sort({})
        .exec(handler.handleMany.bind(null, 'users', res));
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
        _user.find({ _id: id })
            .sort({})
            .exec(handler.handleOne.bind(null, 'user', res));
    }
};

const getByEmaiPass = (req, res) => {
    const { email, password } = req.params;

    _user.find({ email: email, password: password })
        .sort({})
        .exec(handler.handleMany.bind(null, 'user', res));
};

const deleteById = (req, res) => {
    const id = req.params.id;

    _user.remove({_id:id},(err,data)=>{
        if(err){
                res.status(400);
                res.json({msg:"No se pudo realizar la operación, intente nuevamente"})
        }else{
            res.status(200);
            res.json({msg:"El usuario se eliminó correctamente"});
        }
    });
    //const { id } = req.params;
    
};

const createUser = (req, res) => {
    const user = req.body;

    _user.create(user)
        .then(
            (data) => {
                res.status(200);
                res.json({msg:"Usuario creado correctamente",data:data});
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

    _user.findOneAndUpdate(query,newData,(err,data)=>{
        if(err){
                res.status(400);
                res.json({msg:"No se pudo realizar la operación, intente nuevamente"})
        }else{
            res.status(200);
            res.json({msg:"El usuario se modificó correctamente"});
        }
    });
    //const { id } = req.params;
};

module.exports = (User) => {
    _user = User;
    return ({
        getAll,
        getById,
        getByEmaiPass,
        deleteById,
        createUser,
        updateById
    });
}