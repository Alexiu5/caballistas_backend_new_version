"use-strict";

const router = require('express').Router();
const InformacionCliente = require('./informacion-cliente.controller');


router.get('/:idCliente', InformacionCliente.findById);
router.get('/document/:tipoDocumento/number/:nroDocumento', InformacionCliente.findByDocType);
router.post('/', InformacionCliente.register);

module.exports = router;