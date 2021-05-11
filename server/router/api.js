'use strict';

const router = require('express').Router();
const Users = require('../features/user/usuario.router');
const Plans = require('../features/planes/planes.router');
const Region = require('../features/region/region.router');
const InfoClients = require('../features/info_clients/informacion-ciente.router');
const DocTypes = require('../features/doc_type/tipoDocumento.router');

router.use('/regions', Region);
router.use('/users', Users);
router.use('/plans', Plans);
router.use('/info-clients', InfoClients)
router.use('/doc-types', DocTypes);

module.exports = router;
