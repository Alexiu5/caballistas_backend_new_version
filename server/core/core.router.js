"use strict";
const router = require('express').Router();
const tipoDepartamento = require('./departamento.controller');

router.get('/tipo_departamento', tipoDepartamento.find);

module.exports = router;