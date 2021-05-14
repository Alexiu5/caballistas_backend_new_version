"use strict";

const pagosService = require('./pagos.service');

async function getInfoPagos(req, res) {
    try {
        const response = await pagosService.findPagos();
        return res.status(200).send(response);

    } catch (e) {
        res.status(500).send(e);
    }
}

module.exports = {
    getInfoPagos
}