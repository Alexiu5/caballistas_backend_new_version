"use strict";
const express = require('express');
const passwordController = require('./password.controller');
let router = express.Router();

router.post('/cambiarContrasena', passwordController.cambiarContrasena);

module.exports = router;