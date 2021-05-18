'use strict';

const router = require('express').Router();
const Users = require('../features/user/usuario.router');
const Plans = require('../features/planes/planes.router');
const Region = require('../features/region/region.router');
const InfoClients = require('../features/info_clients/informacion-ciente.router');
const DocTypes = require('../features/doc_type/tipoDocumento.router');
const { login, protect, restrictTo } = require('../controllers/authController');

router.use('/regions', Region);
router.use('/users', protect, restrictTo('Administrador'), Users);
router.use('/plans', Plans);
router.use('/info-clients', InfoClients);
router.use('/doc-types', DocTypes);
router.post('/login', login);

module.exports = router;
