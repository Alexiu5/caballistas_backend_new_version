'use strict';

const router = require('express').Router();
const Users = require('../features/user/usuario.router');
const usuarioController = require('../features/user/usuario.controller');
const Plans = require('../features/planes/planes.router');
const Region = require('../features/region/region.router');
const InfoClients = require('../features/info_clients/informacion-ciente.router');
const DocTypes = require('../features/doc_type/tipoDocumento.router');
const Email = require('../features/email/verify_email.controller');
const { login, protect, restrictTo } = require('../controllers/authController');
const { ROLES } = require('../core/roles');

router.use('/regions', Region);
router.use('/users', protect, restrictTo(ROLES.client, ROLES.admin), Users);
router.use('/plans', protect, restrictTo(ROLES.client, ROLES.admin), Plans);
router.use(
    '/info-clients',
    protect,
    restrictTo(ROLES.client, ROLES.admin),
    InfoClients
);
router.use('/doc-types', DocTypes);
router.post('/login', login);
router.post('/email', Email.verificarEmail);
router.post('/verify', usuarioController.verifyUser);
router.post('/forgotpass', Email.envioPassword);

module.exports = router;
