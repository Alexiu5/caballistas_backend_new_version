const { requestQuery } = require('../../Service/database');

async function findByTipo(req, res) {
	const { tipo_departamento } = req.params;
	const query = `SELECT * FROM TIPO_MUNICIPIO WHERE TIPO_DEPARTAMENTO = $1`;

	try {
		const result = await requestQuery(query, [tipo_departamento]);
		const results = {result: result ? result.rows: null};

		res.status(200).send(results)
	} catch (e) {
		res.status(500).send(e)
	}
}

module.exports = {
	findByTipo
}