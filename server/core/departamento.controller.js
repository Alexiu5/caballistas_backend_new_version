const pool = require("../Service/database");

async function find(req, res) {
	try {
		const client = await pool.connect();
		const result = await client.query("SELECT * FROM tipo_departamento");
		const results = { results: result ? result.rows : null };
		client.release();
		res.send(results);
	} catch (err) {
		console.error(err);
		res.send("Error", err);
	}
}

function findById(req, res) {}

module.exports = {
	find,
	findById,
};
