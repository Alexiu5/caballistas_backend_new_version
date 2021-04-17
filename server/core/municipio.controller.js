const pool = require('../Service/database');

async function retrieveMunicipios(req, res) {
	const { tipo_departamento } = req.params;
	const query = `SELECT * FROM TIPO_MUNICIPIO WHERE TIPO_DEPARTAMENTO = $1`;

	try {
		const client = await pool.connect();
		const result = await client.query(query, [tipo_departamento]);
		const results = {result: result ? result.rows: null};

		client.release();
		res.status(200).send(results)
	} catch (e) {
		res.status(500).send(e)
	}
}

module.exports = {
	retrieveMunicipios
}