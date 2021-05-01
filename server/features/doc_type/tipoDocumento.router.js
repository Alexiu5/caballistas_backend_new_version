const router = require('express').Router();
const TipoDocumento = require('./tipoDocumento.controller');

router.get('/', TipoDocumento.find);
router.get('/:tipo_docuento', TipoDocumento.findById);
module.exports = router;