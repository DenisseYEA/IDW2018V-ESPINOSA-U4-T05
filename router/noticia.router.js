const router = require('express').Router();

module.exports = (wagner) => {

    const noticiaCtrl = wagner.invoke((Noticia) =>
        require('../controllers/noticia.controller')(Noticia));

    router.get('/', (req, res) =>
        noticiaCtrl.getAll(req, res));

    router.get('/:id', (req, res) =>
        noticiaCtrl.getById(req, res));

    router.get('/:titulo/:autor', (req, res) =>
        noticiaCtrl.getByTituloAut(req, res));

    router.delete('/:id', (req, res) =>
        noticiaCtrl.deleteById(req, res));

    router.post('/', (req, res) =>
        noticiaCtrl.createNoticia(req, res));

    router.put('/:id', (req, res) =>
        noticiaCtrl.updateById(req, res));

    return router;
}