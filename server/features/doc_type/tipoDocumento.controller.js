const pool = require("../../Service/database");

async function find(req, res) {
	try {
		const client = await pool.connect();
		const result = await client.query("SELECT * FROM TIPO_DOCUMENTO");
		const results = { results: result ? result.rows : null };

		client.release();
		res.status(200).send(results)
	} catch (err) {
		console.error(err);
		res.status(500).send(err)
	}
}

async function findById(req, res) {
	const { tipo_documento } = req.params;

	try {
		const client = await pool.connect();
		const result = await client.query(`SELECT * FROM tipo_departamento WHERE TIPO_DOCUMENTO = ${tipo_documento}`);
		const results = { results: result ? result.rows : null };
		client.release();
		res.status(200).send(results)
	} catch (err) {
		console.error(err);
		res.status(500).send(err)
	}
}

module.exports = {
	find,
	findById,
};
