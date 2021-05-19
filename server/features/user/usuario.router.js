'use-strict';

const express = require('express');
const Usuario = require('./usuario.controller');
const router = express.Router();

router
    .route('/')
    .post(Usuario.validateUser, Usuario.register)
    .get(Usuario.register);

router
    .route('/:idUsuario')
    .patch(Usuario.update)
    .delete(Usuario.deleteUser)
    .get(Usuario.findById);

router.get('/email/:email', Usuario.findByEmail);
router.get(
    '/documentos/:tipoDocumento&:numeroDocumento',
    Usuario.findByDocument
);

router.get('/', Usuario.find);

module.exports = router;
