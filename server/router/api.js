"use strict";

const router = require('express').Router();
const coreRouter = require('../core/core.router');

router.use('/core', coreRouter);
module.exports = router;
