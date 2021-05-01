'use strict';

const router = require('express').Router();
const Usuario = require('../features/user/usuario.router');
const planes = require('../features/planes/planes.router');
const Region = require('../features/region/region.router');
const TipoDocumento = require('../features/doc_type/tipoDocumento.router');

router.use('/', Region);
router.use('/user', Usuario);
router.use('/planes', planes);
router.use('/tipodocumentos', TipoDocumento);

module.exports = router;
