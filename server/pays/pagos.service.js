"use strict";
const pool = require('../Service/database');

await function findPagos() {
	let query = 'SELECT PR.ID_PAGO, IC.NUMERO_DOCUMENTO, IC.NOMBRES, IC.APELLIDOS, TPS.NOMBRE_PLAN, PR.VALOR_PAGO, PR.FECHA_PAGO FROM PAGOS_REALIZADOS PR INNER JOIN TIPO_PLAN_SUSCRIPCION TPS ON PR.TIPO_PLAN = TPS.ID_PLAN_SUSCRIPCION INNER JOIN INFORMACION_CLIENTE IC ON PR.CLIENTE = IC.ID_CLIENTE';
	try {
		const client = await pool.connect();
		const result = await client.query(query);
		const results = {result: result ? result.rows: null};

		client.release();
		return results;
	} catch (e) {
		throw new Error(e);
	}

  // return database.query(query)
  //   .then(response => response.rows)
  //   .catch(err => { throw new Error(err) });
}

module.exports = {
	findPagos
}