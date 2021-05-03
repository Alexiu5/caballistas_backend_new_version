"use-strict";

const usuarioService = require("./usuario.service");
const informacionCliente = require('../info_clients/informacion-cliente.service');
const Usuario = require('./usuario.model');
const InfoCliente = require('../info_clients/cliente.model');

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
    const { idCliente } = req.params;
    let user;

    try {
        user = await usuarioService.findById(idCliente);
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
        user = await usuarioService.findByDocument(tipoDocumento, numeroDocumento);
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
    let usuario = new Usuario(body);
    let infoCliente = body.info_cliente && new InfoCliente(body.info_cliente);
    let user;
    let cliente;


    if (!infoCliente) res.status(400).send('Bad request');

    try {
        cliente = await informacionCliente.register(infoCliente);
        usuario.cliente = cliente.id_cliente; // it sets the client id into user object after client has been registed
        user = await usuarioService.register(usuario);
        user = {...user, info_cliente: cliente}

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

    try {
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
    const { idCliente } = req.params;
    let user;

    try {
        user = await usuarioService.deleteUser(idCliente);
        res.status(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    find,
    findById,
    findByDocument,
    findByEmail,
    register,
    update,
    deleteUser,
};
