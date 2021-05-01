const pool = require("../Service/database");
const Cliente = require("./cliente.model");
const _ = require("lodash");

async function register(params) {
    const query = `INSERT INTO INFORMACION_CLIENTE(ID_CLIENTE, TIPO_DOCUMENTO, NUMERO_DOCUMENTO, NOMBRES, TELEFONO, DIRECCION, ID_DEPARTAMENTO, ID_MUNICIPIO, APELLIDOS) VALUES (nextval($1), $2, $3, $4, $5, $6, $7, $8, $9)`;
    let infoCliente;

    if (typeof params !== Cliente) throw new Error('Type of params is not Client');

    try {
        infoCliente =  params.toArray();
        infoCliente[0] = "informacion_cliente_id_cliente_seq";
        const client = await pool.connect();
        const result = await client.query(query, cliente);
        const results = { result: result ? result.rows : null };

        client.release();
        return results;
    } catch (e) {
        throw new Error(e);
    }
}

async function update({ id_cliente, numero_documento, nombres, apellidos }) {
    const query = `UPDATE INFORMACION_CLIENTE SET NUMERO_DOCUMENTO = $2, NOMBRES = $3, APELLIDOS = $4 WHERE ID_CLIENTE = $1`;
    const requestParams = [id_cliente, numero_documento, nombres, apellidos];

    try {
        const client = await pool.connect();
        const result = await client.query(query, requestParams);
        const results = { result: result ? result.rows : null };

        client.release();
        return results;
    } catch (e) {
        throw new Error(e);
    }
}

async function findById(id_cliente) {
    const query = `SELECT * FROM INFORMACION_CLIENTE WHERE WHERE ID_CLIENTE = ${id_cliente}`;

    try {
        const client = await pool.connect();
        const result = await client.query(query);
        const results = { result: result ? result.rows : null };

        client.release();
        return results;
    } catch (error) {
        throw new Error(e);
    }
}

module.exports = {
    register,
    update,
    findById,
};
