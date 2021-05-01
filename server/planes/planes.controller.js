"use strict";

const planSuscripcionService = require('./planes.service');

function registerPlanSuscripcion(req, res) {
    return planSuscripcionService.registerPlanSuscripcion(req.body)
        .then(resultado => res.status(200).send(resultado));
}

function findPlanesSuscripcion(request, response) {
    return planSuscripcionService.findPlanesSuscripcion()
        .then(user => {
            return response.json(user);
        });
}

function deletePlanSuscripcionById(request, response) {
    return planSuscripcionService.deletePlanSuscripcionById(request.params)
        .then(user => {
            return response.json(user);
        });
}

function updatePlanSuscripcionById(request, response) {
    return planSuscripcionService.updatePlanSuscripcionById(request.body)
        .then(user => {
            return response.json(user);
        });
}

module.exports = {
    registerPlanSuscripcion,
    findPlanesSuscripcion,
    deletePlanSuscripcionById,
    updatePlanSuscripcionById
}