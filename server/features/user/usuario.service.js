const { requestQuery } = require('../../Service/database');
const UsuarioSistema = require('./usuario.model');
const Query = require('../../core/query-constants');

/**
 * This method finds all users
 * @returns Object
 */
async function find() {
    try {
        const query =
            'SELECT US.ID_USUARIO, IC.ID_CLIENTE, IC.NUMERO_DOCUMENTO, IC.NOMBRES, IC.APELLIDOS, US.CORREO, US.TIPO_ESTADO, US.TIPO_USUARIO FROM INFORMACION_CLIENTE IC INNER JOIN USUARIO_SISTEMA US ON IC.ID_CLIENTE = US.CLIENTE';
        const result = await requestQuery(query);

        return result.rows;
    } catch (e) {
        console.error('Find all users fails', e);
        throw new Error(e);
    }
}
/**
 * this method finds an user by id
 * @param {int} id_cliente
 * @returns
 */
async function findById(id_cliente) {
    try {
        let usuarios = await requestQuery(Query.user.findById, [id_cliente]);

        return usuarios.rowCount > 0 ? usuarios.rows[0] : {};
    } catch (e) {
        console.error('Find all users fails', e);
        throw new Error(e);
    }
}

/**
 * This method finds an user by document type and document number
 * @param {string} tipo_documento
 * @param {string} numero_documento
 * @returns Object
 */
async function findByDocument(tipo_documento, numero_documento) {
    try {
        const result = await requestQuery(Query.user.findByDocument, [
            tipo_documento,
            numero_documento,
        ]);
        const results = { result: result ? result.rows : null };

        return results;
    } catch (e) {
        console.error('Find all users fails', e);
        throw new Error(e);
    }
}

/**
 * This method finds an user by email
 * @param {string} correo
 * @returns Object
 */
async function findByEmail(correo) {
    try {
        const result = await requestQuery(Query.user.findByEmail, [correo]);

        return result.rows[0];
    } catch (e) {
        console.error('Find all users fails', e);
        throw new Error(e);
    }
}

/**
 * This method register an user into the database
 * @param {Object} params
 * @returns Object
 */
async function register(params) {
    if (!(params instanceof UsuarioSistema))
        throw new Error('Type of params is not UsuarioSistema');

    try {
        let user = new UsuarioSistema(params);
        user.id_cliente = 'usuario_sistema_id_usuario_seq';

        await requestQuery(Query.user.register, [
            user.id_cliente,
            user.cliente,
            user.correo,
        ]);
        const results = await findByEmail(user.correo);

        return results[0];
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * This method update contrasena, tipo-estado and correo
 * @param {Usuario} Usuario
 * @returns Object
 */
async function update({ id_usuario, correo, tipo_estado, tipo_usuario }) {
    try {
        // validates if user already exists
        const currentUser = await findById(id_usuario);
        if (!_isUserExist(currentUser)) throw Error('User not exist');

        // Defines query string

        // Create patch usert object
        let patchUser = createPatchUser(currentUser, {
            tipo_estado,
            correo,
            tipo_usuario,
        });

        await requestQuery(Query.user.update, [
            patchUser.tipo_estado,
            patchUser.correo,
            patchUser.tipo_usuario,
            id_usuario,
        ]);

        return patchUser;
    } catch (e) {
        throw new Error(e);
    }
}

/**
 * This method updates into the database the tipo_estado of an user
 * @param {string} idUsuario
 * @returns
 */
async function deleteUser(idUsuario) {
    const tipo_estado = 2;

    try {
        const user = await findById(idUsuario);
        const { cliente } = user;
        let result;

        if (cliente) {
            result = await requestQuery(Query.user.delete, [
                tipo_estado,
                cliente,
            ]);
        }

        return result;
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
 *
 *  To do: add tipo usuario field if is required - ask karen
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
