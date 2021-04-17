"use strict";
const express = require('express');
const pagosController = require('./pagos.controller');
let router = express.Router();

router.get('/findPagos', pagosController.getInfoPagos);

module.exports = router;