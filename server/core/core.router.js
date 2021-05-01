"use strict";
const router = require('express').Router();
const TipoDocumento = require('./tipoDocumento.controller');
const Departamento = require('./departamento.controller');
const Municipio = require('./municipio.controller');

router.get('/departamentos', Departamento.find);
router.get('/municipios/:tipo_departamento', Municipio.findByTipo);
router.get('/tipodocumento', TipoDocumento.find);

module.exports = router;