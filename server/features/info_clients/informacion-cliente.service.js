const { requestQuery } = require('../../Service/database');
const Cliente = require('./cliente.model');
const _ = require('lodash');

async function register(params) {
    try {
        let infoCliente;
        let isParamsValid = await validateParams(params);

        const query = `INSERT INTO INFORMACION_CLIENTE
            (ID_CLIENTE, TIPO_DOCUMENTO, NUMERO_DOCUMENTO, NOMBRES, TELEFONO, DIRECCION, ID_DEPARTAMENTO, ID_MUNICIPIO, APELLIDOS)
                VALUES
                    (nextval($1), $2, $3, $4, $5, $6, $7, $8, $9)`;

        if (!isParamsValid) throw Error('Params are not valid into register informacion cliente')

        infoCliente = params.toArray();
        infoCliente[0] = 'informacion_cliente_id_cliente_seq';

        await requestQuery(query, infoCliente);

        return await findByDocument(
            params.tipo_documento,
            params.numero_documento
        );
    } catch (e) {
        throw new Error(e);
    }
}

async function update({ id_cliente, numero_documento, nombres, apellidos }) {
    const query = `UPDATE INFORMACION_CLIENTE SET NUMERO_DOCUMENTO = $2, NOMBRES = $3, APELLIDOS = $4 WHERE ID_CLIENTE = $1`;
    const requestParams = [id_cliente, numero_documento, nombres, apellidos];

    try {
        const result = await requestQuery(query, requestParams);
        const results = { result: result ? result.rows : null };

        return results;
    } catch (e) {
        throw new Error(e);
    }
}

async function findById(id_cliente) {
    const query = `SELECT * FROM INFORMACION_CLIENTE WHERE ID_CLIENTE = ${id_cliente}`;

    try {
        const result = await requestQuery(query);
        const results = { result: result ? result.rows : null };

        return results;
    } catch (error) {
        throw new Error(e);
    }
}

async function findByDocument(tipoDocumento, nroDocumento) {
    const query =
        'SELECT * FROM informacion_cliente WHERE tipo_documento = $1 AND numero_documento = $2';

    try {
        const result = await requestQuery(query, [tipoDocumento, nroDocumento]);

        return result?.rows[0];
    } catch (error) {
        throw Error(error);
    }
}

// validatons

async function validateParams(params) {
    let isParamsValid = params instanceof Cliente;
    let isClientCreated = await isClientAlreadyCreated(params);

    return isParamsValid && isClientCreated;
}

async function isClientAlreadyCreated({ tipo_documento, numero_documento }) {
    try {
        const result = await requestQuery(
            'SELECT count(*) FROM informacion_cliente WHERE tipo_documento = $1 AND numero_documento = $2',
            [tipo_documento, numero_documento]
        );
        return parseInt(result.rows[0].count) === 0;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    register,
    update,
    findById,
};
