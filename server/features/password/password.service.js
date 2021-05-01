'use-strict';
const { requestQuery } =  require('../../Service/database');

/**
 * Validar que los datos ingresados existen en la base de datos
 * @param {Object} params 
 */
function cambiarContrasena(params) {
	const query = 'UPDATE USUARIO_SISTEMA SET CONTRASENA = $2 WHERE ID_USUARIO  = $1';
	const { id_usuario, contrasena } = params;
	const values = [id_usuario, contrasena];

	try {
		const result = await requestQuery(query, values);
		const results = {result: result ? result.rows: null};

		return results;
	} catch (e) {
		throw new Error(e);
	}
}

module.exports = {
	cambiarContrasena,
}