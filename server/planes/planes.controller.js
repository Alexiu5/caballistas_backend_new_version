"use strict";

const planSuscripcionService = require('./planes.service');

function registerPlanSuscripcion(req, res) {
    return planSuscripcionService.registerPlanSuscripcion(req.body)
        .then(resultado => res.status(200).send(resultado));
}

function findPlanesSuscripcion(request, response) {
    return planSuscripcionService.findPlanesSuscripcion()
        .then(usuario => {
            return response.json(usuario);
        });
}

function deletePlanSuscripcionById(request, response) {
    return planSuscripcionService.deletePlanSuscripcionById(request.params)
        .then(usuario => {
            return response.json(usuario);
        });
}

function updatePlanSuscripcionById(request, response) {
    return planSuscripcionService.updatePlanSuscripcionById(request.body)
        .then(usuario => {
            return response.json(usuario);
        });
}

module.exports = {
    registerPlanSuscripcion,
    findPlanesSuscripcion,
    deletePlanSuscripcionById,
    updatePlanSuscripcionById
}