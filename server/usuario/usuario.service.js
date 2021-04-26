const pool = require("../Service/database");
const UsuarioSistema = require("./usuario.model");
const InformacionCliente = require("../informacion_cliente/informacion_cliente.service");

async function find() {
    try {
        const client = await pool.connect();
        const query =
            "SELECT IC.ID_CLIENTE, IC.NUMERO_DOCUMENTO, IC.NOMBRES, IC.APELLIDOS, US.CORREO FROM INFORMACION_CLIENTE IC INNER JOIN USUARIO_SISTEMA US ON IC.ID_CLIENTE = US.CLIENTE";
        const result = await client.query(query);
        const results = { result: result ? result.rows : null };

        client.release();
        return results;
    } catch (e) {
        console.error("Find all users fails", e);
        throw new Error(e);
    }
}

async function findById(id_cliente) {
    try {
        const client = await pool.connect();
        const query = `SELECT * FROM INFORMACION_CLIENTE WHERE ID_CLIENTE = ${id_cliente}`;
        const result = await client.query(query);
        const results = { result: result ? result.rows : null };

        client.release();
        return results;
    } catch (e) {
        console.error("Find all users fails", e);
        throw new Error(e);
    }
}

async function findByDocument(tipo_documento, numero_documento) {
    try {
        const client = await pool.connect();
        const query = `SELECT * FROM INFORMACION_CLIENTE WHERE TIPO_DOCUMENTO = ${tipo_documento} AND NUMERO_DOCUMENTO = ${numero_documento}`;
        const result = await client.query(query);
        const results = { result: result ? result.rows : null };

        client.release();
        return results;
    } catch (e) {
        console.error("Find all users fails", e);
        throw new Error(e);
    }
}

async function findByEmail(correo) {
    try {
        const client = await pool.connect();
        const query = `SELECT * FROM USUARIO_SISTEMA WHERE CORREO = ${correo}`;
        const result = await client.query(query);
        const results = { result: result ? result.rows : null };

        client.release();
        return results;
    } catch (e) {
        console.error("Find all users fails", e);
        throw new Error(e);
    }
}

async function register(params) {
    let informacionCliente;
    let usuario;

    try {
        informacionCliente = await InformacionCliente.register(params); //This should be moved to controller logic
        params = { ...params, cliente: informacionCliente };

        usuario = new UsuarioSistema(params).toArray();
        const query = `INSERT INTO USUARIO_SISTEMA (ID_USUARIO, TIPO_USUARIO, CLIENTE, CORREO, CONTRASENA, TIPO_ESTADO)
            VALUES(nextval(usuario_sistema_id_usuario_seq), 2,
                ${informacionCliente.id_cliente},
                ${usuario[3]},
                '',
                3)`;

        const client = await pool.connect();
        const result = await client.query(query);
        const results = { result: result ? result.rows : null };

        client.release();
        return results;
    } catch (e) {
        throw new Error(e);
    }
}

async function update(params) {
    const { correo, contrasena, tipo_estado } = params.inf;
    const query = `UPDATE USUARIO_SISTEMA SET  CONTRASENA= ${contrasena}, TIPO_ESTADO= ${tipo_estado} WHERE CORREO= ${correo}`;

    try {
        const client = await pool.connect();
        const result = await client.query(query);
        const results = { result: result ? result.rows : null };

        client.release();
        return results;
    } catch (e) {
        throw new Error(e);
    }
}

async function deleteUser(id_cliente) {
    const tipo_estado = 2;
    const query = `UPDATE USUARIO_SISTEMA SET TIPO_ESTADO = ${tipo_estado} WHERE CLIENTE = ${id_cliente}`;

    try {
        const client = await pool.connect();
        const result = await client.query(query);
        const results = { result: result ? result.rows : null };

        client.release();
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