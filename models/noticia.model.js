const mongoose = require('mongoose');


let noticiaSchema = new mongoose.Schema({
  titulo:{
    type: String,
    required: true
},
autor:{
    type: String,
    required: true,
},
nota:{
    type: String,
    required: true
},
fecha:{
    type: String,
    required: true
},
activo:{
    type: Boolean,
    default: true,
    required: true
},
foto:{
    type: String,
    required: true
}
});

const noticiaModel = mongoose.model('NoticiaSchema', noticiaSchema, 'noticias');



module.exports = noticiaModel;