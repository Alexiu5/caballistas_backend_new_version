'use-strict';

const router = require('express').Router();
const InformacionCliente = require('./informacion-cliente.controller');

router.get('/:idCliente', InformacionCliente.findById);
router.post('/', InformacionCliente.register);
router.get(
    '/document/:tipoDocumento/number/:nroDocumento',
    InformacionCliente.findByDocType
);

module.exports = router;
