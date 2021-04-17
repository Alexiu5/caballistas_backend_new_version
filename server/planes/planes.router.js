"use strict";
const express = require('express');
const planSuscripcionController = require('./planes.controller');
let router = express.Router();

router.post('/agregarPlan', planSuscripcionController.registerPlanSuscripcion);
router.get('/findPlanesSuscripcion', planSuscripcionController.findPlanesSuscripcion);
router.post('/deletePlanSuscripcion/:id_plan_suscripcion', planSuscripcionController.deletePlanSuscripcionById);
router.post('/updatePlanSuscripcion/', planSuscripcionController.updatePlanSuscripcionById);

module.exports = router;