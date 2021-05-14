const router = require('express').Router();
const Departamento = require('./departamento.controller');
const Municipio = require('./municipio.controller');

router.get('/departamentos', Departamento.find);
router.get('/municipios/:tipo_departamento', Municipio.findByTipo);

module.exports = router;