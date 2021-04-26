"use strict";

const router = require('express').Router();
const CoreRouter = require('../core/core.router');
const Usuario = require('../usuario/usuario.router');

router.use('/core', CoreRouter);
// To complete
router.use('/usuario', Usuario);


module.exports = router;
