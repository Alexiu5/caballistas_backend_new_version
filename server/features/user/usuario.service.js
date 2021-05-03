const { requestQuery } = require('../../Service/database');
const UsuarioSistema = require('./usuario.model');
const InformacionCliente = require('../info_clients/informacion-cliente.service');

async function find() {
    try {
        const query =
            'SELECT US.ID_USUARIO, IC.ID_CLIENTE, IC.NUMERO_DOCUMENTO, IC.NOMBRES, IC.APELLIDOS, US.CORREO, US.TIPO_ESTADO, US.TIPO_USUARIO FROM INFORMACION_CLIENTE IC INNER JOIN USUARIO_SISTEMA US ON IC.ID_CLIENTE = US.CLIENTE';
        const result = await requestQuery(query);
        const results = { result: result ? result.rows : null };

        return result.rows;
    } catch (e) {
        console.error('Find all users fails', e);
        throw new Error(e);
    }
}

async function findById(id_cliente) {
    // 'SELECT US.ID_USUARIO, IC.ID_CLIENTE, IC.NUMERO_DOCUMENTO, IC.NOMBRES, IC.APELLIDOS, US.CORREO, US.TIPO_ESTADO, US.TIPO_USUARIO FROM USUARIO_SISTEMA us inner join informacion_cliente ic on us.cliente = ic.id_cliente where us.id_usuario = $1';
    try {
        const query = 'SELECT * FROM USUARIO_SISTEMA WHERE ID_USUARIO = $1';
        let usuarios = await requestQuery(query, [id_cliente]);

        return usuarios.rowCount > 0 ? usuarios.rows[0] : {};
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

        return result.rows[0];
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
        const query = `INSERT INTO USUARIO_SISTEMA (ID_USUARIO, TIPO_USUARIO, CLIENTE, CORREO, CONTRASENA, TIPO_ESTADO) VALUES (nextval('usuario_sistema_id_usuario_seq'), 2, $1, $2, '', 3 )`;

        await requestQuery(query, [user.cliente, user.correo]);
        const results = await findByEmail(user.correo);

        return results[0];
    } catch (e) {
        throw new Error(e);
    }
}

async function update({ correo, contrasena, tipo_estado, id_usuario }) {
    try {
        // validates if user already exists
        const currentUser = await findById(id_usuario);
        if (!_isUserExist(currentUser)) throw Error('User not exist');

        // Defines query string
        let query = `UPDATE USUARIO_SISTEMA SET CONTRASENA= $1, TIPO_ESTADO= $2, CORREO= $3 WHERE ID_USUARIO= ${id_usuario}`;

        // Create patch usert object
        let patchUser = createPatchUser(currentUser, {
            contrasena,
            tipo_estado,
            correo
        });

        await requestQuery(query, [
            patchUser.contrasena,
            patchUser.tipo_estado,
            patchUser.correo
        ]);
        
        return patchUser;
    } catch (e) {
        throw new Error(e);
    }
}

async function deleteUser(id_cliente) {
    const tipo_estado = 2;
    const query = `UPDATE USUARIO_SISTEMA SET TIPO_ESTADO = ${tipo_estado} WHERE CLIENTE = ${id_cliente}`;

    try {
        const result = await requestQuery(query);

        return result.rows[0];
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * It recieves an user object and transforms it into Usuario sistema class
 * @param {object} userObject
 * @returns boolean
 */
function _isUserExist(userObject) {
    let usuario = new UsuarioSistema(userObject);

    return usuario.isValidUser();
}

/**
 * This method comparates the data from the database against of request data
 * @param {object} currentUser
 * @param {object} requestUser
 * @returns {UsuarioSistema}
 */
function createPatchUser(currentUser, { contrasena, tipo_estado, correo }) {
    let user = new UsuarioSistema(currentUser);

    user = {
        ...user,
        correo: correo !== undefined ? correo : currentUser.correo,
        contrasena:
            contrasena !== undefined ? contrasena : currentUser.contrasena,
        tipo_estado:
            tipo_estado !== undefined ? tipo_estado : currentUser.tipoEstado,
    };

    return user;
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
