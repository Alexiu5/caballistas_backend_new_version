const router = require('express').Router();
const TipoDocumento = require('./tipoDocumento.controller');

router.get('tipodocumento', TipoDocumento.find);

module.exports = router;