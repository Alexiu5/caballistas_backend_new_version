"use-strict";

const Usuario = require("./usuario.service");

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

async function register(req, res) {
    let usuario;

    try {
        usuario = await Usuario.register(req.body);
        res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
}

async function update(req, res) {
    let usuario;

    try {
        usuario = await Usuario.update(req.body);
        res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
}

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
