"use-strict";

const Usuario = require("./usuario.service");

/**
 * This method returns an user by id given
 * @param {*} req 
 * @param {*} res 
 */
async function findById(req, res) {
    const { idCliente } = req.params;
    let usuario;

    try {
        usuario = await Usuario.findById(idCliente);
        res.status(200).send(usuario);
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
    let usuario;

    try {
        usuario = await Usuario.findByDocument(tipoDocumento, numeroDocumento);
        res.status(200).send(usuario);
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
    let usuario;

    try {
        usuario = await Usuario.findByEmail(email);
        res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
}

/**
 * This method calls the service in charge of register an user
 * @param {*} req 
 * @param {*} res 
 */
async function register(req, res) {
    let usuario;

    try {
        usuario = await Usuario.register(req.body);
        res.status(200).send(usuario);
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
    let usuario;

    try {
        usuario = await Usuario.update(req.body);
        res.status(200).send(usuario);
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
    let usuario;

    try {
        usuario = await Usuario.deleteUser(idCliente);
        res.status(201);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    findById,
    findByDocument,
    findByEmail,
    register,
    update,
    deleteUser,
};
