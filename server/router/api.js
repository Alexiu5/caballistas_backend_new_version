"use strict";

const router = require('express').Router();
const CoreRouter = require('../core/core.router');
const Usuario = require('../user/usuario.router');
const planes = require('../planes/planes.router');

router.use('/core', CoreRouter);
router.use('/user', Usuario);
router.use('/planes', planes);



module.exports = router;
