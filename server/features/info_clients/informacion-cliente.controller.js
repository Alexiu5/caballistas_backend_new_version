'use-strict';

const Cliente = require('./cliente.model');
const InformacionClienteService = require('./informacion-cliente.service');

async function findById(req, res) {
    const { idCliente } = req.params;
    try {
        const clientes = await InformacionClienteService.findById(idCliente);

        res.status(200).send(clientes);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function findByDocType(req, res) {
    const { tipoDocumento, nroDocumento } = req.params;
    try {
        const clientes = await InformacionClienteService.findByDocType(
            tipoDocumento,
            nroDocumento
        );

        res.status(200).send(clientes);
    } catch (error) {
        _handleError(error, res);
    }
}

// Create client object and then register
async function register(req, res) {
    try {
        const client = new Cliente(req.body);
        let result = await InformacionClienteService.register(client);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ err: error.message});
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

function _handleError(e, { status }) {
    status.send(500).send(e);
}

module.exports = {
    findById,
    findByDocType,
    update,
    register,
};
