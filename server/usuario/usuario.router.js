'use-strict';

const express = require('express');
const Usuario = require('./usuario.controller');
const router = express.Router();

router.get('/', Usuario.find())

module.exports = router;
