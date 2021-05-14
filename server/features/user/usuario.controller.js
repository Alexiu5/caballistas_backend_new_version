'use-strict';

const usuarioService = require('./usuario.service');
const informacionCliente = require('../info_clients/informacion-cliente.service');
const Usuario = require('./usuario.model');
const InfoCliente = require('../info_clients/cliente.model');
const core = require('../../core');

async function find(req, res) {
    try {
        let user = await usuarioService.find();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * This method returns an user by id given
 * @param {*} req
 * @param {*} res
 */
async function findById(req, res) {
    const { idUsuario } = req.params;
    let user;

    try {
        user = await usuarioService.findById(idUsuario);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 *  This method returns an user by
 *  Type of document and number of document
 * @param {*} req
 * @param {*} res
 */
async function findByDocument(req, res) {
    const { tipoDocumento, numeroDocumento } = req.params;
    let user;

    try {
        user = await usuarioService.findByDocument(
            tipoDocumento,
            numeroDocumento
        );
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * This method retuns an user by given an email
 * @param {*} req
 * @param {*} res
 */
async function findByEmail(req, res) {
    const { email } = req.params;
    let user;

    try {
        user = await usuarioService.findByEmail(email);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * This method calls the service in charge of register an user and register into
 * informacion sistema table.
 * @param {*} req
 * @param {*} res
 */
async function register({ body }, res) {
    const { cliente, correo, contrasena } = body;
    let usuario = new Usuario({
        cliente,
        correo,
        contrasena,
    });
    let infoCliente = body.info_cliente && new InfoCliente(body.info_cliente);
    let user;
    let newClient;

    if (!infoCliente) res.status(400).send('Bad request');

    try {
        newClient = await informacionCliente.register(infoCliente);
        usuario.cliente = newClient.id_cliente; // it sets the client id into user object after client has been registed
        user = await usuarioService.register(usuario);
        user = { ...user, info_cliente: newClient };

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * This method calls the service in charge of update an user
 * @param {*} req
 * @param {*} res
 */
async function update(req, res) {
    let user;
    let { idUsuario } = req.params;

    try {
        req.body = { ...req.body, id_usuario: idUsuario };
        user = await usuarioService.update(req.body);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * This method calls the service in charge of delete an user
 * @param {*} req
 * @param {*} res
 */
async function deleteUser(req, res) {
    const { idUsuario } = req.params;

    try {
        user = await usuarioService.deleteUser(idUsuario);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Middlewares
async function validateUser(req, res, next) {
    const { correo } = req.body;
    const user = await usuarioService.findByEmail(correo);

    if (user.correo) return core.handleForbidden(res, 'User already created');

    next();
}

module.exports = {
    find,
    findById,
    findByDocument,
    findByEmail,
    register,
    update,
    deleteUser,
    // middlewares
    validateUser,
};
