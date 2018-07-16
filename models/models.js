const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = (wagner) => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/Alumnos', {
    useMongoClient: true
  });

  wagner.factory('db', () => mongoose);
  const User = require('./user.model');
  const Noticia = require('./noticia.model');

  const models = {
    User,
    Noticia
  };

  _.each(models, (v, k) => {
    wagner.factory(k, () => v);
  });
}