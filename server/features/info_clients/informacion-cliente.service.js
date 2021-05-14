const { requestQuery } = require('../../Service/database');
const Cliente = require('./cliente.model');
const Query = require('../../core/query-constants');

async function register(cliente) {
    try {
        let infoCliente;
        let isParamsValid = await validateParams(cliente);

        if (!isParamsValid) {
            throw new Error(`Client already created`);
        } else {
            infoCliente = cliente.toArray();
            infoCliente[0] = 'informacion_cliente_id_cliente_seq';

            await requestQuery(Query.infoClient.register, infoCliente);
        }

        return await findByDocType(
            cliente.tipo_documento,
            cliente.numero_documento
        );
    } catch (e) {
        throw new Error(e.message);
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
    try {
        const result = await requestQuery(
            Query.infoClient.findById,
            id_cliente
        );

        return result.rowCount > 0 ? result.rows : [];
    } catch (error) {
        throw new Error(e);
    }
}

async function findByDocType(tipo, numero) {
    try {
        const result = await requestQuery(Query.infoClient.findByDocType, [
            tipo,
            numero,
        ]);

        return result.rowCount > 0 ? result.rows[0] : [];
    } catch (error) {
        throw Error(error);
    }
}

// validatons

async function validateParams(params) {
    let isParamsValid = params instanceof Cliente;
    let isClientCreated = await isClientAlreadyCreated(params);

    return isParamsValid && !isClientCreated;
}

async function isClientAlreadyCreated({ tipo_documento, numero_documento }) {
    try {
        const result = await requestQuery(
            'SELECT count(*) FROM informacion_cliente WHERE tipo_documento = $1 AND numero_documento = $2',
            [tipo_documento, numero_documento]
        );
        const { count } = result?.rows[0];

        return count && parseInt(count) >= 1 ? true : false;
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {
    register,
    update,
    findById,
    findByDocType,
};
