"use-strict";

const Cliente = require("./cliente.model");
const InformacionClienteService = require("./informacion-cliente.service");

async function findById(req, res) {
    const { idCliente } = req.params;
    let cliente;

    try {
        cliente = InformacionClienteService.findById(idCliente);
        res.status(200).send(cliente);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function register(req, res) {
    try {
        let infoCliente = new Cliente(req.body);
        let result = InformacionClienteService.register(infoCliente);

        res.status(200).send(result);
    } catch (error) {
        res.send(500).send(error);
    }
}

async function update(req, res) {
    let informacionCliente;

    try {
        informacionCliente = await InformacionClienteService.update(req.body);
        res.status(200).send(informacionCliente);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    findById,
    update,
    register,
};
