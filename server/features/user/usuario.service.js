const { requestQuery } = require('../../Service/database');
const UsuarioSistema = require('./usuario.model');
const InformacionCliente = require('../info_clients/informacion-cliente.service');

async function find() {
    try {
        const query =
            'SELECT IC.ID_CLIENTE, IC.NUMERO_DOCUMENTO, IC.NOMBRES, IC.APELLIDOS, US.CORREO FROM INFORMACION_CLIENTE IC INNER JOIN USUARIO_SISTEMA US ON IC.ID_CLIENTE = US.CLIENTE';
        const result = await requestQuery(query);
        const results = { result: result ? result.rows : null };

        client.release();
        return results;
    } catch (e) {
        console.error('Find all users fails', e);
        throw new Error(e);
    }
}

async function findById(id_cliente) {
    try {
        const query = `SELECT * FROM INFORMACION_CLIENTE WHERE ID_CLIENTE = ${id_cliente}`;
        const result = await requestQuery(query);
        const results = { result: result ? result.rows : null };

        return results;
    } catch (e) {
        console.error('Find all users fails', e);
        throw new Error(e);
    }
}

async function findByDocument(tipo_documento, numero_documento) {
    try {
        const query = `SELECT * FROM INFORMACION_CLIENTE WHERE TIPO_DOCUMENTO = ${tipo_documento} AND NUMERO_DOCUMENTO = ${numero_documento}`;
        const result = await requestQuery(query);
        const results = { result: result ? result.rows : null };

        return results;
    } catch (e) {
        console.error('Find all users fails', e);
        throw new Error(e);
    }
}

async function findByEmail(correo) {
    try {
        const query = `SELECT * FROM USUARIO_SISTEMA WHERE CORREO = $1`;
        const result = await requestQuery(query, [correo]);

        return result.rows;
    } catch (e) {
        console.error('Find all users fails', e);
        throw new Error(e);
    }
}

async function register(params) {
    if (!(params instanceof UsuarioSistema))
        throw new Error('Type of params is not UsuarioSistema');

    try {
        let user = new UsuarioSistema(params);
        const query =
            `INSERT INTO USUARIO_SISTEMA (ID_USUARIO, TIPO_USUARIO, CLIENTE, CORREO, CONTRASENA, TIPO_ESTADO) VALUES (nextval('usuario_sistema_id_usuario_seq'), 1, $1, $2, $3, 1 )`;

        await requestQuery(query, [
            user.cliente,
            user.correo,
            user.contrasena,
        ]);
        const results = await findByEmail(user.correo);

        return results[0];
    } catch (e) {
        throw new Error(e);
    }
}

async function update(params) {
    const { correo, contrasena, tipo_estado } = params.inf;
    const query = `UPDATE USUARIO_SISTEMA SET  CONTRASENA= ${contrasena}, TIPO_ESTADO= ${tipo_estado} WHERE CORREO= ${correo}`;

    try {
        const result = await requestQuery(query);
        const results = { result: result ? result.rows : null };

        return results;
    } catch (e) {
        throw new Error(e);
    }
}

async function deleteUser(id_cliente) {
    const tipo_estado = 2;
    const query = `UPDATE USUARIO_SISTEMA SET TIPO_ESTADO = ${tipo_estado} WHERE CLIENTE = ${id_cliente}`;

    try {
        const result = await requestQuery(query);
        const results = { result: result ? result.rows : null };

        return results;
    } catch (e) {
        throw new Error(e);
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
