'use-strict';

const express = require('express');
const Usuario = require('./usuario.controller');
const router = express.Router();

router.post('/', Usuario.validateUser, Usuario.register);
router.patch('/:idUsuario', Usuario.update);
router.delete('/:idUsuario', Usuario.deleteUser);
router.get('/:idUsuario', Usuario.findById);
router.get('/email/:email', Usuario.findByEmail);
router.get(
    '/documentos/:tipoDocumento&:numeroDocumento',
    Usuario.findByDocument
);

router.get('/', Usuario.find);

module.exports = router;
