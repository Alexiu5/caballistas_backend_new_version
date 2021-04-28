"use strict";
const router = require('express').Router();
const planSuscripcionController = require('./planes.controller');

router.post('/agregarPlan', planSuscripcionController.registerPlanSuscripcion);
router.get('/findPlanesSuscripcion', planSuscripcionController.findPlanesSuscripcion);
router.post('/deletePlanSuscripcion/:id_plan_suscripcion', planSuscripcionController.deletePlanSuscripcionById);
router.post('/updatePlanSuscripcion/', planSuscripcionController.updatePlanSuscripcionById);

module.exports = router;