"use strict";

const passwordService = require('./password.service');

function cambiarContrasena(req, res) {
    return passwordService.cambiarContrasena(req.body)
        .then(function (response) { res.status(200).send(response) });
}

module.exports = {
    cambiarContrasena
}